// lib/engine/types.ts
// Client-only: used from client components and engine service modules.
// Re-exports JLPTLevel from lib/db to avoid duplication.

export type { JLPTLevel } from '@/lib/db';

export interface FuriganaResult {
  kanji: string;
  reading: string;           // hiragana reading
  meaningEs: string;         // Spanish meaning (single line)
  source: 'dictionary' | 'ai' | 'heuristic';
}

export interface TranslationResult extends FuriganaResult {
  partOfSpeech?: string;
  onyomi?: string[];         // array of on'yomi readings
  kunyomi?: string[];        // array of kun'yomi readings
  exampleJp?: string;        // example sentence in Japanese
  exampleEs?: string;        // Spanish translation of example
  contextTranslation?: string;    // Spanish translation of example (alias for compatibility)
  additionalVocab?: Array<{ word: string; reading: string; meaning: string }>;
  representativeWord?: string;
  representativeWordReading?: string;
  entryType?: 'kanji' | 'vocabulary';
  components?: string[];
}

export interface EngineError {
  type:
    | 'rate-limit-short'
    | 'rate-limit-daily'
    | 'invalid-key'
    | 'broken-response'
    | 'offline'
    | 'unknown';
  message: string;           // Spanish-language user-facing message
  retryAfterMs?: number;
}
