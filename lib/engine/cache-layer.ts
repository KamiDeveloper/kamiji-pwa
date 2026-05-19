// lib/engine/cache-layer.ts
// Client-only: uses Dexie.js (IndexedDB).
// 30-day TTL cache for AI translation results.

import { db } from '@/lib/db';
import type { TranslationResult } from './types';

const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

function buildKey(text: string, context: string, level: string): string {
  return JSON.stringify([text, context, level]);
}

/**
 * Retrieve a cached AI translation result.
 * Returns null if not found or if the cache entry is older than 30 days.
 */
export async function getCached(
  text: string,
  context: string,
  level: string
): Promise<TranslationResult | null> {
  const key = buildKey(text, context, level);
  const record = await db.aiCache.get(key);

  if (!record) return null;

  const age = Date.now() - new Date(record.cachedAt).getTime();
  if (age > TTL_MS) {
    // Stale — delete and signal miss
    await db.aiCache.delete(key);
    return null;
  }

  try {
    return JSON.parse(record.response) as TranslationResult;
  } catch {
    // Corrupted entry — delete it
    await db.aiCache.delete(key);
    return null;
  }
}

/**
 * Store an AI translation result in the cache.
 */
export async function setCache(
  text: string,
  context: string,
  level: string,
  result: TranslationResult
): Promise<void> {
  const key = buildKey(text, context, level);
  await db.aiCache.put({
    query: key,
    response: JSON.stringify(result),
    cachedAt: new Date().toISOString(),
  });
}

/**
 * Delete all cache entries older than 30 days.
 * Returns the count of deleted records.
 */
export async function clearExpiredCache(): Promise<number> {
  const cutoff = new Date(Date.now() - TTL_MS).toISOString();
  const stale = await db.aiCache
    .where('cachedAt')
    .below(cutoff)
    .toArray();

  const keys = stale.map((r) => r.query);
  await db.aiCache.bulkDelete(keys);
  return keys.length;
}
