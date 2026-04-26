// lib/db.ts
// IMPORTANT: This module is CLIENT-ONLY.
// Never import this in Server Components or server-side code.
// Only use in 'use client' components, route handlers, or with dynamic import.

import Dexie, { type EntityTable } from "dexie";

// ── Type definitions ──────────────────────────────────────

export type JLPTLevel = "n5" | "n4" | "n3" | "n2" | "n1";

export interface KanjiRecord {
  id?: number;
  kanjiChar: string;
  level: JLPTLevel;
  // FSRS Card state (JSON from ts-fsrs — populated in Phase 2)
  fsrsState: Record<string, unknown>;
  // ISO date string for scheduled review date
  scheduledDate?: string;
  addedAt: string;
  lastReviewedAt?: string;
}

export interface DictionaryRecord {
  id?: number;
  kanji: string;
  reading: string; // hiragana/katakana reading
  meaningEs: string; // Spanish meaning
  level: JLPTLevel;
  onyomi?: string;
  kunyomi?: string;
  partOfSpeech?: string;        // e.g. "noun", "verb-ichidan"
  representativeWord?: string;  // common word using this kanji (e.g. "食べる")
  representativeWordReading?: string; // reading of representative word
}

export interface AiCacheRecord {
  // Primary key: composite "text:context:level" string
  query: string;
  response: string;
  // Timestamp for TTL (30-day expiry in Phase 3)
  cachedAt: string;
}

export interface UserProgressRecord {
  // Primary key: Firebase UID
  uid: string;
  level: JLPTLevel;
  totalLearned: number;
  streak: number;
  lastStudiedAt?: string;
  lastSyncAt?: string;
}

export interface StoryProgressRecord {
  id?: number;
  storyId: string;
  uid: string;
  currentPage: number;
  startedAt: string;
  completedAt?: string;
}

// ── Database class ────────────────────────────────────────

class KamiJiDatabase extends Dexie {
  kanji!: EntityTable<KanjiRecord, "id">;
  dictionary!: EntityTable<DictionaryRecord, "id">;
  aiCache!: EntityTable<AiCacheRecord, "query">;
  userProgress!: EntityTable<UserProgressRecord, "uid">;
  storyProgress!: EntityTable<StoryProgressRecord, "id">;

  constructor() {
    super("KamiJiDB");

    this.version(1).stores({
      // auto-increment id, indexed by char and level for queries
      kanji: "++id, kanjiChar, level, scheduledDate",
      // auto-increment id, indexed by kanji string and level
      dictionary: "++id, kanji, level",
      // query string is the primary key (composite key)
      aiCache: "query, cachedAt",
      // Firebase UID is primary key
      userProgress: "uid, level",
      // compound index [storyId+uid] for efficient per-user story lookup
      storyProgress: "++id, [storyId+uid], uid, storyId",
    });

    this.version(2).stores({
      kanji: "++id, kanjiChar, level, scheduledDate",
      dictionary: "++id, kanji, level",
      aiCache: "query, cachedAt",
      userProgress: "uid, level",
      storyProgress: "++id, [storyId+uid], uid, storyId",
    }).upgrade(() => {
      // No destructive changes — new optional fields default to undefined
    });
  }
}

// ── Singleton export ──────────────────────────────────────
export const db = new KamiJiDatabase();
