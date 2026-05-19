// lib/engine/dictionary-layer.ts
// Client-only: uses Dexie.js (IndexedDB).
// Queries the local JMdict dictionary for reading and translation lookups.

import { db, type DictionaryRecord } from '@/lib/db';
import type { JLPTLevel, TranslationResult } from './types';

function splitReadings(value?: string): string[] | undefined {
  if (!value) return undefined;
  const readings = value
    .split(/[\s、,]+/)
    .map((reading) => reading.trim())
    .filter(Boolean);

  return readings.length > 0 ? readings : undefined;
}

function recordToTranslation(record: DictionaryRecord): TranslationResult {
  return {
    kanji: record.kanji,
    reading: record.reading,
    meaningEs: record.meaningEs,
    source: 'dictionary',
    partOfSpeech: record.partOfSpeech,
    onyomi: splitReadings(record.onyomi),
    kunyomi: splitReadings(record.kunyomi),
    additionalVocab: record.additionalVocab,
    representativeWord: record.representativeWord,
    representativeWordReading: record.representativeWordReading,
    entryType: record.entryType,
    components: record.components,
  };
}

function isSingleKanji(value: string): boolean {
  return /^[\u4E00-\u9FFF\u3400-\u4DBF]$/.test(value);
}

function pickBestRecord(records: DictionaryRecord[], query: string): DictionaryRecord | null {
  if (records.length === 0) return null;

  const preferredType = isSingleKanji(query) ? 'kanji' : 'vocabulary';
  return records.find((record) => record.entryType === preferredType)
    ?? records.find((record) => record.entryType === 'vocabulary')
    ?? records[0];
}

/**
 * Look up a kanji character in the local IndexedDB dictionary.
 * Prefer the requested JLPT level, then fall back to any loaded level.
 */
export async function lookupKanji(
  kanjiChar: string,
  level: JLPTLevel
): Promise<TranslationResult | null> {
  const normalized = kanjiChar.trim();
  if (!normalized) return null;

  const sameLevel = await db.dictionary
    .where('[kanji+level]')
    .equals([normalized, level])
    .toArray();

  const fallback = sameLevel.length > 0 ? [] : await db.dictionary
    .where('kanji')
    .equals(normalized)
    .toArray();

  const record = pickBestRecord(sameLevel, normalized) ?? pickBestRecord(fallback, normalized);

  return record ? recordToTranslation(record) : null;
}
