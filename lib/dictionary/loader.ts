'use client';
// lib/dictionary/loader.ts
// CLIENT-ONLY — uses Dexie (IndexedDB). Never import in Server Components.

import { db } from '@/lib/db';
import type { JLPTLevel } from '@/lib/db';
import type { RawJMdictEntry, LoadProgressCallback } from './types';

const DATA_PATHS: Record<JLPTLevel, string> = {
  n5: '/data/n5-jmdict.json',
  n4: '/data/n4-jmdict.json',
  n3: '/data/n3-jmdict.json',
  n2: '/data/n2-jmdict.json',
  n1: '/data/n1-jmdict.json',
};

/** Returns true if the dictionary for a level is already loaded. */
export async function isDictionaryLoaded(level: JLPTLevel): Promise<boolean> {
  const count = await db.dictionary.where('level').equals(level).count();
  return count > 0;
}

/**
 * Loads the dictionary for a given level into IndexedDB.
 * Idempotent — safe to call multiple times (checks isDictionaryLoaded first).
 * Reports progress via optional callback for UI display.
 */
export async function loadDictionary(
  level: JLPTLevel,
  onProgress?: LoadProgressCallback
): Promise<void> {
  // Already loaded — skip
  if (await isDictionaryLoaded(level)) {
    onProgress?.({ loaded: 1, total: 1, phase: 'done' });
    return;
  }

  const path = DATA_PATHS[level];
  if (!path) throw new Error(`No dictionary data path for level: ${level}`);

  // Phase: fetching
  onProgress?.({ loaded: 0, total: 1, phase: 'fetching' });

  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch dictionary: ${response.status} ${response.statusText}`);
  }

  // Phase: parsing
  onProgress?.({ loaded: 0, total: 1, phase: 'parsing' });
  const entries: RawJMdictEntry[] = await response.json();

  // Phase: writing — bulk insert in batches of 500 to avoid IDB transaction timeout
  const BATCH_SIZE = 500;
  let written = 0;

  onProgress?.({ loaded: 0, total: entries.length, phase: 'writing' });

  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE).map((entry) => ({
      kanji: entry.kanji,
      reading: entry.reading,
      meaningEs: entry.meaningEs,
      level: entry.level as JLPTLevel,
      onyomi: entry.onyomi,
      kunyomi: entry.kunyomi,
      partOfSpeech: entry.partOfSpeech,
      representativeWord: entry.representativeWord,
      representativeWordReading: entry.representativeWordReading,
    }));

    await db.dictionary.bulkAdd(batch);
    written += batch.length;
    onProgress?.({ loaded: written, total: entries.length, phase: 'writing' });
  }

  onProgress?.({ loaded: entries.length, total: entries.length, phase: 'done' });
}
