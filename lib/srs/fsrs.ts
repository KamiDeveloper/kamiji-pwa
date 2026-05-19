'use client';
// lib/srs/fsrs.ts
// CLIENT-ONLY — Uses ts-fsrs and Dexie. Never import in Server Components.

import {
  fsrs as createFsrs,
  createEmptyCard,
  generatorParameters,
  Rating,
  State,
  type Card,
  type Grade,
  type RecordLog,
} from 'ts-fsrs';
import { db } from '@/lib/db';
import type { JLPTLevel } from '@/lib/db';
import type { KanjiStatus, KanjiWithFSRS, ReviewResult } from './types';

// ── FSRS v4 configuration ──────────────────────────────────
// desiredRetention: 0.90 (90% target recall)
// learning steps: [1, 10] minutes (standard FSRS defaults)
const FSRS_PARAMS = generatorParameters({
  request_retention: 0.90,
  maximum_interval: 36500, // 100 years ceiling
});
const f = createFsrs(FSRS_PARAMS);

// ── State mapping ──────────────────────────────────────────
function fsrsStateToStatus(state: State): KanjiStatus {
  switch (state) {
    case State.New:      return 'new';
    case State.Learning: return 'learning';
    case State.Review:   return 'review';
    case State.Relearning: return 'relearn';
    default:             return 'new';
  }
}

function isReviewGrade(rating: Rating): rating is Grade {
  return rating !== Rating.Manual;
}

// ── Create a new kanji card ────────────────────────────────
export async function createKanji(
  kanjiChar: string,
  level: JLPTLevel
): Promise<number> {
  const existing = await db.kanji
    .where('[kanjiChar+level]')
    .equals([kanjiChar, level])
    .first();

  if (existing?.id !== undefined) {
    return existing.id;
  }

  const card = createEmptyCard();
  const now = new Date().toISOString();

  const id = await db.kanji.add({
    kanjiChar,
    level,
    fsrsState: card as unknown as Record<string, unknown>,
    scheduledDate: card.due.toISOString(),
    addedAt: now,
  });

  return id as number;
}

// ── Process a review rating ────────────────────────────────
export async function processReview(
  kanjiId: number,
  rating: Rating
): Promise<ReviewResult> {
  const record = await db.kanji.get(kanjiId);
  if (!record) throw new Error(`Kanji not found: ${kanjiId}`);

  const card = record.fsrsState as unknown as Card;
  const now = new Date();

  if (!isReviewGrade(rating)) {
    throw new Error('Manual rating is not supported for SRS reviews');
  }

  // ts-fsrs repeat() returns scheduling options for all ratings
  const schedulingCards: RecordLog = f.repeat(card, now);
  const result = schedulingCards[rating];

  const updatedCard = result.card;
  const scheduledDate = updatedCard.due.toISOString();
  const status = fsrsStateToStatus(updatedCard.state);

  await db.kanji.update(kanjiId, {
    fsrsState: updatedCard as unknown as Record<string, unknown>,
    scheduledDate,
    lastReviewedAt: now.toISOString(),
  });

  return {
    updatedFsrsState: updatedCard as unknown as Record<string, unknown>,
    scheduledDate,
    status,
  };
}

// ── Get kanji state ────────────────────────────────────────
export async function getKanjiState(kanjiId: number): Promise<KanjiWithFSRS | null> {
  const record = await db.kanji.get(kanjiId);
  if (!record) return null;

  const card = record.fsrsState as unknown as Card;
  return {
    id: record.id,
    kanjiChar: record.kanjiChar,
    level: record.level,
    fsrsState: record.fsrsState,
    scheduledDate: record.scheduledDate,
    addedAt: record.addedAt,
    lastReviewedAt: record.lastReviewedAt,
    status: fsrsStateToStatus(card.state ?? State.New),
  };
}

// Export Rating for convenience
export { Rating };
