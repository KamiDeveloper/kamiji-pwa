'use client';
// lib/dictionary/loader.ts
// CLIENT-ONLY - uses Dexie (IndexedDB). Never import in Server Components.

import { db, type DictionaryRecord } from '@/lib/db';
import type { JLPTLevel } from '@/lib/db';
import type {
  DatasetManifest,
  DatasetManifestLevel,
  RawJMdictEntry,
  LoadProgressCallback,
} from './types';

const DATA_PATHS: Record<JLPTLevel, string> = {
  n5: '/data/n5-jmdict.json',
  n4: '/data/n4-jmdict.json',
  n3: '/data/n3-jmdict.json',
  n2: '/data/n2-jmdict.json',
  n1: '/data/n1-jmdict.json',
};

const MANIFEST_PATH = '/data/manifest.json';

interface LevelManifest extends DatasetManifestLevel {
  schemaVersion: number;
}

function cleanString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeAdditionalVocab(
  value: RawJMdictEntry['additionalVocab']
): DictionaryRecord['additionalVocab'] {
  if (!Array.isArray(value)) return undefined;

  const normalized = value
    .map((item) => ({
      word: cleanString(item?.word),
      reading: cleanString(item?.reading),
      meaning: cleanString(item?.meaning),
    }))
    .filter((item) => item.word && (item.reading || item.meaning));

  return normalized.length > 0 ? normalized : undefined;
}

function normalizeComponents(value: RawJMdictEntry['components']): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const normalized = value
    .map(cleanString)
    .filter(Boolean);

  return normalized.length > 0 ? normalized : undefined;
}

function normalizeEntry(entry: RawJMdictEntry, fallbackLevel: JLPTLevel): DictionaryRecord | null {
  const kanji = cleanString(entry.kanji);
  if (!kanji) return null;

  const reading = cleanString(entry.reading)
    || cleanString(entry.representativeWordReading)
    || kanji;

  const meaningEs = cleanString(entry.meaningEs) || '(sin traduccion)';
  return {
    kanji,
    reading,
    meaningEs,
    level: fallbackLevel,
    onyomi: cleanString(entry.onyomi) || undefined,
    kunyomi: cleanString(entry.kunyomi) || undefined,
    partOfSpeech: cleanString(entry.partOfSpeech) || undefined,
    representativeWord: cleanString(entry.representativeWord) || undefined,
    representativeWordReading: cleanString(entry.representativeWordReading) || undefined,
    entryType: entry.entryType === 'vocabulary' ? 'vocabulary' : 'kanji',
    components: normalizeComponents(entry.components),
    additionalVocab: normalizeAdditionalVocab(entry.additionalVocab),
    source: cleanString(entry.source) || undefined,
  };
}

async function fetchManifest(): Promise<DatasetManifest | null> {
  try {
    const response = await fetch(MANIFEST_PATH, { cache: 'no-store' });
    if (!response.ok) return null;
    const manifest = await response.json() as DatasetManifest;
    if (!manifest || typeof manifest.schemaVersion !== 'number' || !manifest.levels) {
      return null;
    }
    return manifest;
  } catch {
    return null;
  }
}

async function getLevelManifest(level: JLPTLevel): Promise<LevelManifest | null> {
  const manifest = await fetchManifest();
  const levelManifest = manifest?.levels?.[level];
  if (!manifest || !levelManifest || typeof levelManifest.entries !== 'number') {
    return null;
  }

  return {
    ...levelManifest,
    schemaVersion: manifest.schemaVersion,
  };
}

async function fetchDataset(level: JLPTLevel): Promise<DictionaryRecord[]> {
  const path = DATA_PATHS[level];
  const response = await fetch(path, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to fetch dictionary: ${response.status} ${response.statusText}`);
  }

  const rawEntries = await response.json() as RawJMdictEntry[];
  if (!Array.isArray(rawEntries)) {
    throw new Error(`Dictionary data is not an array for level: ${level}`);
  }

  const normalized = rawEntries
    .map((entry) => normalizeEntry(entry, level))
    .filter((entry): entry is DictionaryRecord => entry !== null);

  if (normalized.length === 0) {
    throw new Error(`Dictionary data has no usable entries for level: ${level}`);
  }

  return normalized;
}

/** Returns true if the dictionary for a level is already loaded and current. */
export async function isDictionaryLoaded(level: JLPTLevel): Promise<boolean> {
  const count = await db.dictionary.where('level').equals(level).count();
  if (count === 0) return false;

  const levelManifest = await getLevelManifest(level);
  if (!levelManifest) {
    return true;
  }

  const meta = await db.dictionaryMeta.get(level);
  return Boolean(
    meta
    && meta.schemaVersion === levelManifest.schemaVersion
    && meta.entryCount === levelManifest.entries
    && count === levelManifest.entries
    && (!levelManifest.checksum || meta.checksum === levelManifest.checksum)
  );
}

/**
 * Loads the dictionary for a given level into IndexedDB.
 * Idempotent and version-aware: stale/partial local datasets are replaced.
 */
export async function loadDictionary(
  level: JLPTLevel,
  onProgress?: LoadProgressCallback
): Promise<void> {
  if (await isDictionaryLoaded(level)) {
    onProgress?.({ loaded: 1, total: 1, phase: 'done' });
    return;
  }

  const levelManifest = await getLevelManifest(level);

  onProgress?.({ loaded: 0, total: 1, phase: 'fetching' });
  const entries = await fetchDataset(level);

  if (levelManifest && entries.length !== levelManifest.entries) {
    throw new Error(
      `Dictionary count mismatch for ${level}: expected ${levelManifest.entries}, got ${entries.length}`
    );
  }

  const schemaVersion = levelManifest?.schemaVersion ?? 0;
  const checksum = levelManifest?.checksum;

  const BATCH_SIZE = 500;
  let written = 0;

  onProgress?.({ loaded: 0, total: entries.length, phase: 'writing' });

  await db.transaction('rw', db.dictionary, db.dictionaryMeta, async () => {
    await db.dictionary.where('level').equals(level).delete();

    for (let i = 0; i < entries.length; i += BATCH_SIZE) {
      const batch = entries.slice(i, i + BATCH_SIZE);
      await db.dictionary.bulkAdd(batch);
      written += batch.length;
      onProgress?.({ loaded: written, total: entries.length, phase: 'writing' });
    }

    await db.dictionaryMeta.put({
      level,
      schemaVersion,
      entryCount: entries.length,
      checksum,
      loadedAt: new Date().toISOString(),
    });
  });

  onProgress?.({ loaded: entries.length, total: entries.length, phase: 'done' });
}
