'use client';

// hooks/useReadingSession.ts
// Manages all reading session state: learned kanji, furigana visibility,
// translation panel, and SRS integration via ts-fsrs.

import { useState, useEffect, useCallback, useRef } from 'react';
import { db } from '@/lib/db';
import { createKanji, processReview, Rating } from '@/lib/srs/fsrs';
import { furiganaEngine } from '@/lib/engine/furigana-engine';
import { useAuth } from '@/contexts/AuthContext';
import type { JLPTLevel } from '@/lib/db';
import type { TranslationResult, EngineError } from '@/lib/engine/types';

export interface UseReadingSessionProps {
  storyId: string;
  level: JLPTLevel;
  encryptedKey?: string;
}

export interface UseReadingSessionReturn {
  learnedKanji: Set<string>;
  visibleFurigana: Set<string>;
  allFuriganaVisible: boolean;
  activePanelKanji: string | null;
  translationResult?: TranslationResult;
  translationError?: EngineError;
  isTranslationLoading: boolean;
  kanjiDetailOpen: string | null;
  antiSpamMessage: string | null;

  showChuleta: (kanji: string) => void;
  showChuletaGlobal: () => void;
  openRayoX: (kanji: string) => void;
  closePanel: () => void;
  markLearned: (kanji: string) => Promise<void>;
  markToReview: (kanji: string) => Promise<void>;
  openKanjiDetail: (kanji: string) => void;
  closeKanjiDetail: () => void;
}

/** Auto-hide duration for single furigana reveal (ms) */
const CHULETA_TIMEOUT_MS = 5_000;
/** Auto-hide duration for global furigana reveal (ms) */
const CHULETA_GLOBAL_TIMEOUT_MS = 60_000;

export function useReadingSession({
  level,
  encryptedKey,
}: UseReadingSessionProps): UseReadingSessionReturn {
  const { user } = useAuth();
  const [learnedKanji, setLearnedKanji] = useState<Set<string>>(new Set());
  const [visibleFurigana, setVisibleFurigana] = useState<Set<string>>(new Set());
  const [allFuriganaVisible, setAllFuriganaVisible] = useState(false);
  const [activePanelKanji, setActivePanelKanji] = useState<string | null>(null);
  const [translationResult, setTranslationResult] = useState<TranslationResult | undefined>();
  const [translationError, setTranslationError] = useState<EngineError | undefined>();
  const [isTranslationLoading, setIsTranslationLoading] = useState(false);
  const [kanjiDetailOpen, setKanjiDetailOpen] = useState<string | null>(null);
  const [antiSpamMessage, setAntiSpamMessage] = useState<string | null>(null);

  // Per-kanji auto-hide timers for La Chuleta
  const furiganaTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  // Global furigana auto-hide timer
  const globalTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recentLearnEvents = useRef<Array<{ timestamp: number }>>([]);

  // ── Load learned kanji on mount ──────────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    async function loadLearned() {
      try {
        const all = await db.kanji.where('level').equals(level).toArray();
        if (!mounted) return;
        // State.New = 0 in ts-fsrs — anything else means at least one review
        const learned = new Set<string>(
          all
            .filter((k) => {
              const card = k.fsrsState as Record<string, unknown>;
              return typeof card.state === 'number' && card.state !== 0;
            })
            .map((k) => k.kanjiChar)
        );
        setLearnedKanji(learned);
      } catch {
        // IndexedDB unavailable (SSR guard) — start with empty set
      }
    }
    loadLearned();
    return () => {
      mounted = false;
    };
  }, [level]);

  // ── Cleanup timers on unmount ────────────────────────────────────────────
  useEffect(() => {
    const timers = furiganaTimers.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      if (globalTimer.current) clearTimeout(globalTimer.current);
    };
  }, []);

  // ── GESTURE-01: Single kanji furigana reveal (5s auto-hide) ─────────────
  const showChuleta = useCallback((kanji: string) => {
    setVisibleFurigana((prev) => {
      const next = new Set(prev);
      next.add(kanji);
      return next;
    });

    // Reset existing timer for this kanji
    const existing = furiganaTimers.current.get(kanji);
    if (existing) clearTimeout(existing);

    const timer = setTimeout(() => {
      setVisibleFurigana((prev) => {
        const next = new Set(prev);
        next.delete(kanji);
        return next;
      });
      furiganaTimers.current.delete(kanji);
    }, CHULETA_TIMEOUT_MS);

    furiganaTimers.current.set(kanji, timer);
  }, []);

  // ── GESTURE-02: Global furigana reveal (60s auto-hide) ──────────────────
  const showChuletaGlobal = useCallback(() => {
    setAllFuriganaVisible(true);
    if (globalTimer.current) clearTimeout(globalTimer.current);
    globalTimer.current = setTimeout(() => {
      setAllFuriganaVisible(false);
      globalTimer.current = null;
    }, CHULETA_GLOBAL_TIMEOUT_MS);
  }, []);

  // ── GESTURE-03: Long-press → open Translation Panel ──────────────────────
  const openRayoX = useCallback(
    async (kanji: string) => {
      setActivePanelKanji(kanji);
      setIsTranslationLoading(true);
      setTranslationResult(undefined);
      setTranslationError(undefined);

      try {
        const { result, error } = await furiganaEngine.getTranslation(
          kanji,
          '',
          level,
          encryptedKey
        );
        setTranslationResult(result);
        if (error) setTranslationError(error);
      } catch {
        setTranslationError({
          type: 'unknown',
          message: 'Error al obtener la traducción. Inténtalo de nuevo.',
        });
      } finally {
        setIsTranslationLoading(false);
      }
    },
    [level, encryptedKey]
  );

  // ── Close Translation Panel ───────────────────────────────────────────────
  const closePanel = useCallback(() => {
    setActivePanelKanji(null);
    setTranslationResult(undefined);
    setTranslationError(undefined);
    setIsTranslationLoading(false);
    setAntiSpamMessage(null);
  }, []);

  // ── SRS: Mark as learned (Rating.Good) ───────────────────────────────────
  const markLearned = useCallback(
    async (kanji: string) => {
      const { isAntiSpam } = await import('@/lib/srs/queue');
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      const nextLearnEvents = [
        ...recentLearnEvents.current.filter((event) => event.timestamp > fiveMinutesAgo),
        { timestamp: Date.now() },
      ];

      if (isAntiSpam(nextLearnEvents)) {
        recentLearnEvents.current = nextLearnEvents;
        setAntiSpamMessage('Pausa breve: demasiados kanji marcados en pocos minutos. Repasa con calma antes de seguir.');
        return;
      }

      recentLearnEvents.current = nextLearnEvents;
      setAntiSpamMessage(null);

      try {
        const existing = await db.kanji
          .where('[kanjiChar+level]')
          .equals([kanji, level])
          .first();
        let id: number;
        if (existing?.id !== undefined) {
          id = existing.id;
        } else {
          id = await createKanji(kanji, level);
        }
        await processReview(id, Rating.Good);
        if (user) {
          const { recordUserStudyProgress } = await import('@/lib/progress');
          const { scheduleSync } = await import('@/lib/sync/debounce');
          await recordUserStudyProgress(user.uid, level);
          scheduleSync(user.uid, level);
        }
        setLearnedKanji((prev) => {
          const next = new Set(prev);
          next.add(kanji);
          return next;
        });
      } catch {
        // Ignore DB errors silently — UX still feels correct
      }
      closePanel();
    },
    [level, user, closePanel]
  );

  // ── SRS: Mark to review (Rating.Again) ───────────────────────────────────
  const markToReview = useCallback(
    async (kanji: string) => {
      try {
        const existing = await db.kanji
          .where('[kanjiChar+level]')
          .equals([kanji, level])
          .first();
        let id: number;
        if (existing?.id !== undefined) {
          id = existing.id;
        } else {
          id = await createKanji(kanji, level);
        }
        await processReview(id, Rating.Again);
        if (user) {
          const { recordUserStudyProgress } = await import('@/lib/progress');
          const { scheduleSync } = await import('@/lib/sync/debounce');
          await recordUserStudyProgress(user.uid, level);
          scheduleSync(user.uid, level);
        }
      } catch {
        // Ignore DB errors silently
      }
      closePanel();
    },
    [level, user, closePanel]
  );

  // ── KanjiDetail overlay ───────────────────────────────────────────────────
  const openKanjiDetail = useCallback((kanji: string) => {
    setKanjiDetailOpen(kanji);
  }, []);

  const closeKanjiDetail = useCallback(() => {
    setKanjiDetailOpen(null);
  }, []);

  return {
    learnedKanji,
    visibleFurigana,
    allFuriganaVisible,
    activePanelKanji,
    translationResult,
    translationError,
    isTranslationLoading,
    kanjiDetailOpen,
    antiSpamMessage,
    showChuleta,
    showChuletaGlobal,
    openRayoX,
    closePanel,
    markLearned,
    markToReview,
    openKanjiDetail,
    closeKanjiDetail,
  };
}
