'use client';
// lib/sync/firestore.ts
// Service to sync IndexedDB progress (UserProgress, Kanji, Stories) to Firestore.

import { db as dexieDb } from '@/lib/db';
import { db as firestoreDb } from '@/lib/firebase';
import { countLearnedKanji } from '@/lib/progress';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import type { Timestamp } from 'firebase/firestore';
import type { JLPTLevel, KanjiRecord, UserProgressRecord } from '@/lib/db';

export interface SyncStats {
  lastSyncAt: string;
  kanjiSynced: number;
}

export interface RestoreStats {
  lastSyncAt: string;
  kanjiRestored: number;
  restored: boolean;
}

interface RemoteUserProgress {
  level?: JLPTLevel;
  totalLearned?: number;
  streak?: number;
  lastStudiedAt?: string | null;
  updatedAt?: Timestamp;
}

interface RemoteKanjiProgress {
  level?: JLPTLevel;
  fsrsState?: Record<string, unknown>;
  scheduledDate?: string | null;
  addedAt?: string;
  lastReviewedAt?: string | null;
}

function latestIso(a?: string | null, b?: string | null): string | undefined {
  if (!a) return b ?? undefined;
  if (!b) return a;
  return new Date(a).getTime() >= new Date(b).getTime() ? a : b;
}

function isRemoteKanjiProgress(data: RemoteKanjiProgress): data is Required<Pick<
  RemoteKanjiProgress,
  'level' | 'fsrsState' | 'addedAt'
>> & RemoteKanjiProgress {
  return !!data.level && !!data.fsrsState && typeof data.addedAt === 'string';
}

function shouldReplaceLocalKanji(local: KanjiRecord, remote: RemoteKanjiProgress): boolean {
  const localUpdatedAt = local.lastReviewedAt ?? local.addedAt;
  const remoteUpdatedAt = remote.lastReviewedAt ?? remote.addedAt;
  return new Date(remoteUpdatedAt ?? 0).getTime() >= new Date(localUpdatedAt).getTime();
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
    const state = k.fsrsState as Record<string, unknown>;
    return typeof state.state === 'number' && state.state !== 0; // State.New is 0
  });

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
 * Restores Firestore progress into IndexedDB after login.
 * Local and remote data are merged conservatively: latest kanji card wins,
 * streak keeps the larger value, and lastStudiedAt keeps the newest timestamp.
 */
export async function restoreProgressFromFirestore(uid: string): Promise<RestoreStats> {
  const userRef = doc(firestoreDb, 'users', uid);
  const userSnap = await getDoc(userRef);
  const now = new Date().toISOString();

  if (!userSnap.exists()) {
    return {
      lastSyncAt: now,
      kanjiRestored: 0,
      restored: false,
    };
  }

  const remoteProgress = userSnap.data() as RemoteUserProgress;
  const localProgress = await dexieDb.userProgress.get(uid);
  const level = remoteProgress.level ?? localProgress?.level;

  if (level) {
    const mergedProgress: UserProgressRecord = {
      uid,
      level,
      totalLearned: Math.max(localProgress?.totalLearned ?? 0, remoteProgress.totalLearned ?? 0),
      streak: Math.max(localProgress?.streak ?? 0, remoteProgress.streak ?? 0),
      lastStudiedAt: latestIso(localProgress?.lastStudiedAt, remoteProgress.lastStudiedAt),
      lastSyncAt: now,
    };
    await dexieDb.userProgress.put(mergedProgress);
  }

  const kanjiSnap = await getDocs(collection(firestoreDb, 'users', uid, 'kanji'));
  let kanjiRestored = 0;

  for (const kanjiDoc of kanjiSnap.docs) {
    const remoteKanji = kanjiDoc.data() as RemoteKanjiProgress;
    if (!isRemoteKanjiProgress(remoteKanji)) continue;

    const existing = await dexieDb.kanji
      .where('[kanjiChar+level]')
      .equals([kanjiDoc.id, remoteKanji.level])
      .first();

    const kanjiRecord: KanjiRecord = {
      kanjiChar: kanjiDoc.id,
      level: remoteKanji.level,
      fsrsState: remoteKanji.fsrsState,
      scheduledDate: remoteKanji.scheduledDate ?? undefined,
      addedAt: remoteKanji.addedAt,
      lastReviewedAt: remoteKanji.lastReviewedAt ?? undefined,
    };

    if (existing?.id !== undefined) {
      if (!shouldReplaceLocalKanji(existing, remoteKanji)) continue;
      await dexieDb.kanji.put({ ...kanjiRecord, id: existing.id });
    } else {
      await dexieDb.kanji.add(kanjiRecord);
    }
    kanjiRestored += 1;
  }

  if (level) {
    await dexieDb.userProgress.update(uid, {
      totalLearned: await countLearnedKanji(level),
      lastSyncAt: now,
    });
  } else {
    await dexieDb.userProgress.update(uid, { lastSyncAt: now });
  }

  return {
    lastSyncAt: now,
    kanjiRestored,
    restored: true,
  };
}

/**
 * Syncs the encrypted Gemini BYOK key bundle to Firestore.
 * Only encrypted material is persisted; plaintext must never leave the device.
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
