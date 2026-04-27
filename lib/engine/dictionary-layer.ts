// lib/engine/dictionary-layer.ts
// Client-only: uses Dexie.js (IndexedDB).
// Queries the local JMdict dictionary for furigana/reading lookups.

import { db } from '@/lib/db';
import type { FuriganaResult, JLPTLevel } from './types';

/**
 * Look up a kanji character in the local IndexedDB dictionary.
 * Returns a FuriganaResult if found, or null if not present.
 */
export async function lookupKanji(
  kanjiChar: string,
  _level: JLPTLevel
): Promise<FuriganaResult | null> {
  const record = await db.dictionary
    .where('kanji')
    .equals(kanjiChar)
    .first();

  if (!record) return null;

  return {
    kanji: record.kanji,
    reading: record.reading,
    meaningEs: record.meaningEs,
    source: 'dictionary',
  };
}
