'use client';

import { useCallback, useState } from 'react';
import { db, type DictionaryRecord, type JLPTLevel } from '@/lib/db';

export interface DictionarySearchResult {
  exact: DictionaryRecord | null;
  results: DictionaryRecord[];
}

function normalizeTerm(term: string): string {
  return term.trim();
}

function includesIgnoreCase(value: string | undefined, query: string): boolean {
  return Boolean(value?.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
}

function preferLevel(
  records: DictionaryRecord[],
  level?: JLPTLevel
): DictionaryRecord[] {
  if (!level) return records;

  const exactLevel = records.filter((record) => record.level === level);
  return exactLevel.length > 0 ? exactLevel : records;
}

export function useDictionary() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookup = useCallback(
    async (term: string, level?: JLPTLevel): Promise<DictionaryRecord | null> => {
      const normalized = normalizeTerm(term);
      if (!normalized) return null;

      setIsLoading(true);
      setError(null);

      try {
        const sameLevel = level
          ? await db.dictionary.where('[kanji+level]').equals([normalized, level]).toArray()
          : [];

        const fallback = sameLevel.length > 0
          ? sameLevel
          : await db.dictionary.where('kanji').equals(normalized).toArray();

        const preferred = preferLevel(fallback, level);
        return preferred[0] ?? null;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error consultando el diccionario');
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const lookupMany = useCallback(
    async (terms: string[], level?: JLPTLevel): Promise<Map<string, DictionaryRecord>> => {
      const normalized = Array.from(new Set(terms.map(normalizeTerm).filter(Boolean)));
      if (normalized.length === 0) {
        return new Map();
      }

      setIsLoading(true);
      setError(null);

      try {
        const records = await db.dictionary.where('kanji').anyOf(normalized).toArray();
        const byKanji = new Map<string, DictionaryRecord>();

        for (const term of normalized) {
          const candidates = preferLevel(
            records.filter((record) => record.kanji === term),
            level
          );

          if (candidates[0]) {
            byKanji.set(term, candidates[0]);
          }
        }

        return byKanji;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error consultando varias entradas');
        return new Map();
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const search = useCallback(
    async (term: string, level?: JLPTLevel): Promise<DictionarySearchResult> => {
      const normalized = normalizeTerm(term);
      if (!normalized) {
        return { exact: null, results: [] };
      }

      setIsLoading(true);
      setError(null);

      try {
        const exact = await lookup(normalized, level);
        const pool = level
          ? await db.dictionary.where('level').equals(level).toArray()
          : await db.dictionary.toArray();

        const results = pool.filter((record) =>
          record.kanji === normalized
          || includesIgnoreCase(record.reading, normalized)
          || includesIgnoreCase(record.meaningEs, normalized)
          || includesIgnoreCase(record.representativeWord, normalized)
          || record.additionalVocab?.some((vocab) =>
            includesIgnoreCase(vocab.word, normalized)
            || includesIgnoreCase(vocab.reading, normalized)
            || includesIgnoreCase(vocab.meaning, normalized)
          ) === true
        );

        return {
          exact,
          results: preferLevel(results, level),
        };
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error buscando en el diccionario');
        return { exact: null, results: [] };
      } finally {
        setIsLoading(false);
      }
    },
    [lookup]
  );

  return {
    lookup,
    lookupMany,
    search,
    isLoading,
    error,
  };
}
