// lib/dictionary/types.ts
// Raw JSON shape as shipped in public/data/*.json
// Produced by scripts/build-dataset.js (KANJIDIC + JMdict-ES fusion pipeline)

export interface RawJMdictEntry {
  kanji: string;                    // e.g. "食" — the kanji character
  reading: string;                  // primary hiragana reading e.g. "たべる"
  meaningEs: string;                // semicolon-separated Spanish meanings
  onyomi?: string;                  // space-separated on'yomi readings
  kunyomi?: string;                 // space-separated kun'yomi readings
  partOfSpeech?: string;            // e.g. "verb-ichidan", "noun"
  level: string;                    // "n5" | "n4" | "n3" | "n2" | "n1"
  representativeWord?: string;      // common word using this kanji (e.g. "食べる")
  representativeWordReading?: string; // reading of representative word
  entryType?: 'kanji' | 'vocabulary';
  components?: string[];
  additionalVocab?: Array<{         // up to 3 secondary vocab entries
    word: string;
    reading: string;
    meaning: string;
  }>;
  source?: string;                  // "jmdict" | "ai-generated" — provenance tracking
}

export interface DatasetManifestLevel {
  file: string;
  entries: number;
  checksum?: string;
  gaps?: number;
}

export interface DatasetManifest {
  schemaVersion: number;
  generatedAt: string;
  levels: Partial<Record<string, DatasetManifestLevel>>;
}

export interface LoadProgress {
  loaded: number;
  total: number;
  phase: 'fetching' | 'parsing' | 'writing' | 'done';
}

export type LoadProgressCallback = (progress: LoadProgress) => void;
