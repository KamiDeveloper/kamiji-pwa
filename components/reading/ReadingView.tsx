'use client';

// components/reading/ReadingView.tsx
// Full reading experience container: text renderer + gesture system +
// page navigation + translation panel + kanji detail overlay.

import { useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { JapaneseTextRenderer } from './JapaneseTextRenderer';
import { TranslationPanel } from './TranslationPanel';
import { KanjiDetail } from './KanjiDetail';
import { ReadingHeader } from './ReadingHeader';
import { KanjiSummaryFooter } from './KanjiSummaryFooter';
import { PageIndicator } from './PageIndicator';
import { useReadingSession } from '@/hooks/useReadingSession';
import { usePageNavigation } from '@/hooks/usePageNavigation';
import { useGestureSystem } from '@/hooks/useGestureSystem';
import type { JLPTLevel } from '@/lib/engine/types';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Story {
  id: string;
  title: string;
  /** Each element is one page of story text with {漢字|かんじ} markup */
  pages: string[];
  level: JLPTLevel;
}

export interface ReadingViewProps {
  story: Story;
  onBack: () => void;
  encryptedKey?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Count distinct {kanji|reading} tokens in a page of text */
function countKanjiInText(text: string): number {
  return text.match(/\{[^|{}]+\|[^|{}]+\}/g)?.length ?? 0;
}

/** Count {kanji|reading} tokens whose kanji is NOT in the learned set */
function countNewKanji(text: string, learned: Set<string>): number {
  const RE = /\{([^|{}]+)\|[^|{}]+\}/g;
  let count = 0;
  let match: RegExpExecArray | null;
  while ((match = RE.exec(text)) !== null) {
    if (!learned.has(match[1])) count++;
  }
  return count;
}

/** Count {kanji|reading} tokens whose kanji IS in the learned set */
function countKnownKanji(text: string, learned: Set<string>): number {
  const RE = /\{([^|{}]+)\|[^|{}]+\}/g;
  let count = 0;
  let match: RegExpExecArray | null;
  while ((match = RE.exec(text)) !== null) {
    if (learned.has(match[1])) count++;
  }
  return count;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ReadingView({ story, onBack, encryptedKey }: ReadingViewProps) {
  const session = useReadingSession({
    storyId: story.id,
    level: story.level,
    encryptedKey,
  });

  const nav = usePageNavigation({
    pages: story.pages,
    isPanelOpen: !!session.activePanelKanji,
  });

  // Ref for the text container — passed to the gesture system
  const containerRef = useRef<HTMLElement | null>(null);

  useGestureSystem(containerRef, {
    onChuleta: session.showChuleta,
    onChuletaGlobal: session.showChuletaGlobal,
    onRayoX: (kanji: string, _el: HTMLElement) => {
      void session.openRayoX(kanji);
    },
    onSubrayado: (kanjiRange: string[]) => {
      // GESTURE-04: scan mostra furigana para todo el rango seleccionado
      kanjiRange.forEach((k) => session.showChuleta(k));
    },
    onScan: session.showChuleta,
  });

  const pageText = nav.pageContent;
  const totalInPage = countKanjiInText(pageText);
  const knownInPage = countKnownKanji(pageText, session.learnedKanji);
  const newInPage = countNewKanji(pageText, session.learnedKanji);

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg)',
      }}
    >
      {/* Cabecera fija */}
      <ReadingHeader
        storyTitle={story.title}
        currentPage={nav.currentPage}
        totalPages={nav.totalPages}
        onBack={onBack}
      />

      {/* Área de texto con eventos de deslizamiento de página */}
      <div
        ref={(el) => {
          containerRef.current = el;
        }}
        {...nav.bindSwipe}
        style={{
          padding: '24px 24px 80px',
          overflowY: 'auto',
          flex: 1,
          // touchAction pan-y lets the browser handle vertical scrolling
          // while our pointer-up handler catches horizontal swipes
          touchAction: 'pan-y',
          // iOS: prevent native callout on long-press over kanji elements
          WebkitTouchCallout: 'none',
        }}
      >
        <JapaneseTextRenderer
          text={pageText}
          level={story.level}
          learnedKanji={session.learnedKanji}
          visibleFurigana={session.visibleFurigana}
          allFuriganaVisible={session.allFuriganaVisible}
        />
      </div>

      {/* Indicador de página */}
      <PageIndicator
        currentPage={nav.currentPage}
        totalPages={nav.totalPages}
      />

      {/* Resumen de kanji (por encima del BottomNav) */}
      <KanjiSummaryFooter
        totalKanji={totalInPage}
        knownKanji={knownInPage}
        newKanji={newInPage}
      />

      {/* Panel de traducción (desliza desde abajo) */}
      <AnimatePresence>
        {session.activePanelKanji && (
          <TranslationPanel
            key="translation-panel"
            kanji={session.activePanelKanji}
            translation={session.translationResult}
            error={session.translationError}
            isLoading={session.isTranslationLoading}
            onClose={session.closePanel}
            onSwipeRight={(kanji) => void session.markLearned(kanji)}
            onSwipeLeft={(kanji) => void session.markToReview(kanji)}
            onKanjiTap={session.openKanjiDetail}
          />
        )}
      </AnimatePresence>

      {/* Vista detallada del kanji (capa completa) */}
      <AnimatePresence>
        {session.kanjiDetailOpen && session.translationResult && (
          <KanjiDetail
            key="kanji-detail"
            result={session.translationResult}
            onClose={session.closeKanjiDetail}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
