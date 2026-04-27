// lib/engine/furigana-engine.ts
// Client-only: orchestrates Dictionary → AI → Heuristic fallback.
// Use the exported singleton `furiganaEngine` throughout the app.

import { lookupKanji } from './dictionary-layer';
import { getCached, setCache } from './cache-layer';
import { queryGemini } from './gemini-layer';
import type { FuriganaResult, TranslationResult, EngineError, JLPTLevel } from './types';

export class FuriganaEngine {
  /**
   * Resolve a kanji to its basic reading and meaning.
   * Resolution order: Cache → Dictionary → AI → Heuristic.
   *
   * @param kanjiChar - Single kanji or word to resolve
   * @param context - Surrounding sentence text (used as cache key and AI context)
   * @param level - JLPT level
   * @param encryptedKey - Optional BYOK JSON bundle; if omitted, AI layer is skipped
   */
  async resolve(
    kanjiChar: string,
    context: string,
    level: JLPTLevel,
    encryptedKey?: string
  ): Promise<{ result: FuriganaResult; error?: EngineError }> {
    // Step 1: Check cache (full AI result satisfies FuriganaResult shape)
    const cached = await getCached(kanjiChar, context, level);
    if (cached) {
      return { result: cached };
    }

    // Step 2: Dictionary lookup
    const dictResult = await lookupKanji(kanjiChar, level);
    if (dictResult) {
      if (!encryptedKey) {
        // No AI key — cache the dictionary hit to avoid repeated DB lookups
        await setCache(kanjiChar, context, level, { ...dictResult });
        return { result: dictResult };
      }
      // Dictionary hit available but continue to AI for richer data if key provided
    }

    // Step 3: AI lookup (only when an encrypted key is provided)
    if (encryptedKey) {
      try {
        const aiResult = await queryGemini(kanjiChar, context, level, encryptedKey);
        await setCache(kanjiChar, context, level, aiResult);
        return { result: aiResult };
      } catch (error: unknown) {
        const engineError = error as EngineError;

        // If dictionary had a result, return it silently on AI failure
        if (dictResult) {
          return { result: dictResult, error: engineError };
        }

        // Dictionary miss + AI failure → heuristic fallback
        const heuristic: FuriganaResult = {
          kanji: kanjiChar,
          reading: kanjiChar,
          meaningEs: '(sin traducción)',
          source: 'heuristic',
        };
        return { result: heuristic, error: engineError };
      }
    }

    // Step 4: Heuristic fallback (no AI key, no dictionary match)
    if (dictResult) {
      return { result: dictResult };
    }

    return {
      result: {
        kanji: kanjiChar,
        reading: kanjiChar,
        meaningEs: '(sin traducción)',
        source: 'heuristic',
      },
    };
  }

  /**
   * Resolve a kanji to its full TranslationResult (richer AI data).
   * Falls back to FuriganaResult cast to TranslationResult if AI is unavailable.
   */
  async getTranslation(
    kanjiChar: string,
    context: string,
    level: JLPTLevel,
    encryptedKey?: string
  ): Promise<{ result: TranslationResult; error?: EngineError }> {
    // Check cache for a full translation (may already have AI-enriched data)
    const cached = await getCached(kanjiChar, context, level);
    if (cached) {
      return { result: cached };
    }

    // Step 2: Try dictionary first for partial result
    const dictResult = await lookupKanji(kanjiChar, level);

    // Step 3: Try AI if key is available
    if (encryptedKey) {
      try {
        const aiResult = await queryGemini(kanjiChar, context, level, encryptedKey);
        await setCache(kanjiChar, context, level, aiResult);
        return { result: aiResult };
      } catch (error: unknown) {
        const engineError = error as EngineError;

        if (dictResult) {
          // Enrich dictionary result into a TranslationResult shape
          const enriched: TranslationResult = {
            ...dictResult,
            onyomi: dictResult ? undefined : undefined,
            kunyomi: dictResult ? undefined : undefined,
          };
          return { result: enriched, error: engineError };
        }

        // Full fallback
        const heuristic: TranslationResult = {
          kanji: kanjiChar,
          reading: kanjiChar,
          meaningEs: '(sin traducción)',
          source: 'heuristic',
        };
        return { result: heuristic, error: engineError };
      }
    }

    // No AI key — return dictionary or heuristic
    if (dictResult) {
      const translation: TranslationResult = { ...dictResult };
      return { result: translation };
    }

    return {
      result: {
        kanji: kanjiChar,
        reading: kanjiChar,
        meaningEs: '(sin traducción)',
        source: 'heuristic',
      },
    };
  }
}

export const furiganaEngine = new FuriganaEngine();
