// store/kanjiStore.ts
// Zustand slice for FSRS kanji state management.
// This file exports a standalone hook — it is NOT merged into useKamijiStore
// to keep the auth/theme store lean and avoid persisting large kanji state.

import { create } from 'zustand';
import type { JLPTLevel } from '@/lib/db';
import type { DailyQueue, KanjiWithFSRS } from '@/lib/srs/types';
import { Rating } from 'ts-fsrs';

interface KanjiStoreState {
  // Daily session queue (computed once per session)
  dailyQueue: DailyQueue | null;
  // Currently active kanji in the review session
  activeKanji: KanjiWithFSRS | null;
  // Loading states
  isLoadingQueue: boolean;
  isProcessingReview: boolean;
  // Error
  error: string | null;

  // Actions
  loadDailyQueue: (level: JLPTLevel) => Promise<void>;
  learnKanji: (kanjiChar: string, level: JLPTLevel) => Promise<number>;
  reviewKanji: (kanjiId: number, rating: Rating) => Promise<void>;
  setActiveKanji: (kanji: KanjiWithFSRS | null) => void;
  clearError: () => void;
}

export const useKanjiStore = create<KanjiStoreState>()((set, get) => ({
  dailyQueue: null,
  activeKanji: null,
  isLoadingQueue: false,
  isProcessingReview: false,
  error: null,

  loadDailyQueue: async (level: JLPTLevel) => {
    set({ isLoadingQueue: true, error: null });
    try {
      // Lazy import to keep client-only code out of server bundle
      const { getDailyQueue } = await import('@/lib/srs/queue');
      const queue = await getDailyQueue(level);
      set({ dailyQueue: queue, isLoadingQueue: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Error cargando cola de repaso',
        isLoadingQueue: false,
      });
    }
  },

  learnKanji: async (kanjiChar: string, level: JLPTLevel): Promise<number> => {
    const { createKanji } = await import('@/lib/srs/fsrs');
    const id = await createKanji(kanjiChar, level);
    // Refresh queue
    await get().loadDailyQueue(level);
    return id;
  },

  reviewKanji: async (kanjiId: number, rating: Rating): Promise<void> => {
    set({ isProcessingReview: true, error: null });
    try {
      const { processReview } = await import('@/lib/srs/fsrs');
      await processReview(kanjiId, rating);
      set({ isProcessingReview: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Error procesando repaso',
        isProcessingReview: false,
      });
    }
  },

  setActiveKanji: (kanji) => set({ activeKanji: kanji }),
  clearError: () => set({ error: null }),
}));

// Selector hooks
export const useDailyQueue = () => useKanjiStore((s) => s.dailyQueue);
export const useIsLoadingQueue = () => useKanjiStore((s) => s.isLoadingQueue);
export const useKanjiError = () => useKanjiStore((s) => s.error);
