'use client';
// lib/sync/firestore.ts
// Service to sync IndexedDB progress (UserProgress, Kanji, Stories) to Firestore.

import { db as dexieDb } from '@/lib/db';
import { db as firestoreDb } from '@/lib/firebase';
import { doc, setDoc, getDoc, collection, writeBatch, serverTimestamp } from 'firebase/firestore';
import type { JLPTLevel } from '@/lib/db';

export interface SyncStats {
  lastSyncAt: string;
  kanjiSynced: number;
}

/**
 * Pushes local progress to Firestore.
 * - Updates the master `users/{uid}` document.
 * - Updates the `users/{uid}/kanji/{kanjiId}` subcollection in batches.
 */
export async function pushProgressToFirestore(uid: string, level: JLPTLevel): Promise<SyncStats> {
  const userProgress = await dexieDb.userProgress.get(uid);
  if (!userProgress) throw new Error('No local progress found to sync');

  // 1. Update user master doc
  const userRef = doc(firestoreDb, 'users', uid);
  await setDoc(userRef, {
    level: userProgress.level,
    totalLearned: userProgress.totalLearned,
    streak: userProgress.streak,
    lastStudiedAt: userProgress.lastStudiedAt || null,
    updatedAt: serverTimestamp(),
  }, { merge: true });

  // 2. Sync Kanji progress (cards not in 'New' state)
  const allKanji = await dexieDb.kanji.where('level').equals(level).toArray();
  const learnedKanji = allKanji.filter(k => {
    // Only sync if it has been reviewed or scheduled
    const state = k.fsrsState as any;
    return state.state !== 0; // State.New is 0
  });

  const batch = writeBatch(firestoreDb);
  const kanjiCollection = collection(firestoreDb, 'users', uid, 'kanji');
  
  // Note: Firestore batch limit is 500. Since this is an MVP we assume user won't
  // sync > 500 new updates at once, but in production we'd chunk the batch array.
  const chunks = [];
  for (let i = 0; i < learnedKanji.length; i += 500) {
    chunks.push(learnedKanji.slice(i, i + 500));
  }

  for (const chunk of chunks) {
    const b = writeBatch(firestoreDb);
    for (const kanji of chunk) {
      const kRef = doc(kanjiCollection, kanji.kanjiChar);
      b.set(kRef, {
        level: kanji.level,
        fsrsState: kanji.fsrsState,
        scheduledDate: kanji.scheduledDate || null,
        addedAt: kanji.addedAt,
        lastReviewedAt: kanji.lastReviewedAt || null,
      }, { merge: true });
    }
    await b.commit();
  }

  const now = new Date().toISOString();
  await dexieDb.userProgress.update(uid, { lastSyncAt: now });

  return {
    lastSyncAt: now,
    kanjiSynced: learnedKanji.length,
  };
}

/**
 * Syncs the encrypted Gemini BYOK key to Firestore.
 */
export async function syncEncryptedKey(
  uid: string,
  encryptedKeyData: { encrypted: string; salt: string; iv: string }
): Promise<void> {
  const userRef = doc(firestoreDb, 'users', uid);
  await setDoc(userRef, {
    geminiKey: encryptedKeyData,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

/**
 * Fetches the encrypted Gemini BYOK key from Firestore.
 */
export async function getEncryptedKey(
  uid: string
): Promise<{ encrypted: string; salt: string; iv: string } | null> {
  const userRef = doc(firestoreDb, 'users', uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    const data = snap.data();
    return data.geminiKey || null;
  }
  return null;
}
