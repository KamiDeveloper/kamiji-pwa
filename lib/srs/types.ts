// lib/srs/types.ts
import type { Rating, State } from 'ts-fsrs';
export type { Rating, State };

export type KanjiStatus = 'new' | 'learning' | 'review' | 'relearn' | 'mastered';

export interface KanjiWithFSRS {
  // Mirrors KanjiRecord fields needed by the state machine
  id?: number;
  kanjiChar: string;
  level: string;
  fsrsState: Record<string, unknown>;
  scheduledDate?: string;
  addedAt: string;
  lastReviewedAt?: string;
  // Derived
  status: KanjiStatus;
}

export interface ReviewResult {
  updatedFsrsState: Record<string, unknown>;
  scheduledDate: string;  // ISO string
  status: KanjiStatus;
}

export interface DailyQueue {
  reviews: KanjiWithFSRS[];      // Due cards (up to 30)
  newCards: KanjiWithFSRS[];     // Up to 5 new cards
  totalDue: number;
  totalNew: number;
}
