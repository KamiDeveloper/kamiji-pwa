'use client';

import { State, type Card } from 'ts-fsrs';
import { db } from '@/lib/db';
import type { JLPTLevel, KanjiRecord, UserProgressRecord } from '@/lib/db';

export interface LevelProgress {
  level: string | null;
  coverage: number;
  retention: number;
  canLevelUp: boolean;
  totalKanji: number;
  learnedKanji: number;
}

const MIN_RETENTION_FOR_LEVEL_UP = 0.8;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

function getUniqueDictionaryKanji(records: Array<{ kanji: string }>): number {
  return new Set(records.map((record) => record.kanji)).size;
}

function getRetrievability(card: Card, lastReviewedAt?: string): number {
  const stability = typeof card.stability === 'number' && card.stability > 0
    ? card.stability
    : 0;

  if (!stability || !lastReviewedAt) return 0;

  const elapsedDays = Math.max(0, (Date.now() - new Date(lastReviewedAt).getTime()) / MS_PER_DAY);
  return Math.pow(1 + elapsedDays / (9 * stability), -1);
}

function isLearnedRecord(record: KanjiRecord): boolean {
  const card = record.fsrsState as unknown as Card;
  return (card.state ?? State.New) !== State.New;
}

function localDateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function localMidnight(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function nextStreak(previous?: UserProgressRecord, now = new Date()): number {
  if (!previous?.lastStudiedAt) return 1;

  const lastStudied = new Date(previous.lastStudiedAt);
  if (localDateKey(lastStudied) === localDateKey(now)) {
    return Math.max(previous.streak, 1);
  }

  const daysSinceLastStudy = Math.round(
    (localMidnight(now).getTime() - localMidnight(lastStudied).getTime()) / MS_PER_DAY
  );

  return daysSinceLastStudy === 1 ? previous.streak + 1 : 1;
}

export async function countLearnedKanji(level: JLPTLevel): Promise<number> {
  const kanjiRecords = await db.kanji.where('level').equals(level).toArray();
  return kanjiRecords.filter(isLearnedRecord).length;
}

export async function recordUserStudyProgress(
  uid: string,
  level: JLPTLevel
): Promise<UserProgressRecord> {
  const [previous, totalLearned] = await Promise.all([
    db.userProgress.get(uid),
    countLearnedKanji(level),
  ]);
  const now = new Date().toISOString();

  const progress: UserProgressRecord = {
    ...previous,
    uid,
    level,
    totalLearned,
    streak: nextStreak(previous),
    lastStudiedAt: now,
  };

  await db.userProgress.put(progress);
  return progress;
}

export async function computeLevelProgress(userId: string): Promise<LevelProgress> {
  const userProgress = await db.userProgress.get(userId);
  const level = userProgress?.level ?? null;

  if (!level) {
    return {
      level: null,
      coverage: 0,
      retention: 0,
      canLevelUp: false,
      totalKanji: 0,
      learnedKanji: 0,
    };
  }

  const [dictionaryEntries, kanjiRecords] = await Promise.all([
    db.dictionary.where('level').equals(level).toArray(),
    db.kanji.where('level').equals(level).toArray(),
  ]);

  const totalKanji = getUniqueDictionaryKanji(dictionaryEntries);
  const learnedCards = kanjiRecords.filter((record) => {
    const card = record.fsrsState as unknown as Card;
    return (card.state ?? State.New) !== State.New;
  });

  const learnedKanji = learnedCards.length;
  const coverage = totalKanji > 0 ? learnedKanji / totalKanji : 0;

  const reviewCards = learnedCards.filter((record) => {
    const card = record.fsrsState as unknown as Card;
    return card.state === State.Review;
  });

  let retention = 0;
  if (reviewCards.length > 0) {
    const totalRetrievability = reviewCards.reduce((sum, record) => {
      const card = record.fsrsState as unknown as Card;
      return sum + getRetrievability(card, record.lastReviewedAt);
    }, 0);
    retention = totalRetrievability / reviewCards.length;
  } else if (learnedCards.length > 0) {
    retention = 0.5;
  }

  return {
    level,
    coverage,
    retention,
    canLevelUp: coverage >= 1 && retention >= MIN_RETENTION_FOR_LEVEL_UP,
    totalKanji,
    learnedKanji,
  };
}
