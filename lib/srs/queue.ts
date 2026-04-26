'use client';
// lib/srs/queue.ts
// CLIENT-ONLY — Uses Dexie. Never import in Server Components.

import { State, type Card } from 'ts-fsrs';
import { db } from '@/lib/db';
import type { JLPTLevel } from '@/lib/db';
import type { DailyQueue, KanjiWithFSRS, KanjiStatus } from './types';

const DAILY_REVIEW_CAP = 30;
const DAILY_NEW_CAP = 5;
// Day boundary: 04:00 AM local time
const DAY_BOUNDARY_HOUR = 4;

/** Returns the "today" date boundary (04:00 AM local → next 04:00 AM local) */
function getTodayBoundary(): Date {
  const now = new Date();
  const boundary = new Date(now);
  boundary.setHours(DAY_BOUNDARY_HOUR, 0, 0, 0);
  // If current time is before 04:00 AM, boundary is 04:00 AM yesterday
  if (now < boundary) {
    boundary.setDate(boundary.getDate() - 1);
  }
  return boundary;
}

function cardToStatus(fsrsState: Record<string, unknown>): KanjiStatus {
  const state = (fsrsState as unknown as Card).state ?? State.New;
  switch (state) {
    case State.New:        return 'new';
    case State.Learning:   return 'learning';
    case State.Review:     return 'review';
    case State.Relearning: return 'relearn';
    default:               return 'new';
  }
}

/**
 * Computes the daily review queue for a given level.
 * - Due cards: scheduledDate ≤ today boundary, sorted by urgency (earliest due first)
 * - New cards: up to 5 cards with State.New, never reviewed
 * - Total reviews capped at DAILY_REVIEW_CAP (30)
 *
 * SRS-09: If last study > 7 days ago, spread overdue (return only DAILY_REVIEW_CAP anyway — spread is enforced by cap)
 */
export async function getDailyQueue(
  level: JLPTLevel,
  userId?: string
): Promise<DailyQueue> {
  const boundary = getTodayBoundary().toISOString();

  // Fetch due cards: scheduledDate ≤ now AND not State.New
  const dueRecords = await db.kanji
    .where('level').equals(level)
    .and((r) => {
      if (!r.scheduledDate) return false;
      return r.scheduledDate <= boundary;
    })
    .toArray();

  // Sort by urgency: earliest scheduled date first (most overdue = highest urgency)
  dueRecords.sort((a, b) => {
    const aDate = a.scheduledDate ?? '';
    const bDate = b.scheduledDate ?? '';
    return aDate.localeCompare(bDate);
  });

  // Filter out true New cards from due (they belong in newCards)
  const reviewCards = dueRecords.filter((r) => {
    const card = r.fsrsState as unknown as Card;
    return (card.state ?? State.New) !== State.New;
  });

  // Fetch new cards (State.New, never reviewed)
  const allKanji = await db.kanji.where('level').equals(level).toArray();
  const newKanji = allKanji.filter((r) => {
    const card = r.fsrsState as unknown as Card;
    return (card.state ?? State.New) === State.New;
  });

  // Cap: 30 reviews, 5 new
  const cappedReviews = reviewCards.slice(0, DAILY_REVIEW_CAP);
  const cappedNew = newKanji.slice(0, DAILY_NEW_CAP);

  function toKanjiWithFSRS(r: typeof dueRecords[0]): KanjiWithFSRS {
    return {
      id: r.id,
      kanjiChar: r.kanjiChar,
      level: r.level,
      fsrsState: r.fsrsState,
      scheduledDate: r.scheduledDate,
      addedAt: r.addedAt,
      lastReviewedAt: r.lastReviewedAt,
      status: cardToStatus(r.fsrsState),
    };
  }

  return {
    reviews: cappedReviews.map(toKanjiWithFSRS),
    newCards: cappedNew.map(toKanjiWithFSRS),
    totalDue: reviewCards.length,
    totalNew: newKanji.length,
  };
}

/**
 * SRS-09: Welcome-back check.
 * Returns true if user was inactive for > 7 days.
 */
export async function isWelcomeBackScenario(level: JLPTLevel): Promise<boolean> {
  const progress = await db.userProgress.toArray();
  if (!progress.length) return false;

  const lastStudied = progress[0].lastStudiedAt;
  if (!lastStudied) return false;

  const daysSince = (Date.now() - new Date(lastStudied).getTime()) / (1000 * 60 * 60 * 24);
  return daysSince > 7;
}

/**
 * SRS-07: Anti-spam check.
 * Returns true if user marked > 20 kanji as learned in < 5 minutes.
 */
export function isAntiSpam(recentLearns: { timestamp: number }[]): boolean {
  if (recentLearns.length <= 20) return false;
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
  const recent = recentLearns.filter((l) => l.timestamp > fiveMinutesAgo);
  return recent.length > 20;
}
