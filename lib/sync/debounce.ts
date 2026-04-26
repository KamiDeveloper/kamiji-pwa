'use client';
// lib/sync/debounce.ts
import { pushProgressToFirestore } from './firestore';
import type { JLPTLevel } from '@/lib/db';

let syncTimeout: NodeJS.Timeout | null = null;
const SYNC_DELAY_MS = 10000; // 10 seconds

/**
 * Debounces the sync to Firestore.
 * Call this every time the user completes a review or learns a new kanji.
 */
export function scheduleSync(uid: string, level: JLPTLevel) {
  if (syncTimeout) {
    clearTimeout(syncTimeout);
  }

  syncTimeout = setTimeout(() => {
    pushProgressToFirestore(uid, level).catch((err) => {
      console.error('Background sync failed:', err);
    });
    syncTimeout = null;
  }, SYNC_DELAY_MS);
}
