'use client';

// components/reading/TranslationPanel.tsx
// Fixed-position glassmorphism bottom sheet with tab navigation and swipe actions.
// Uses motion/react (motion v12) for spring animations.

import { useState, useRef } from 'react';
import type { SVGProps } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import type { TranslationResult, EngineError } from '@/lib/engine/types';
import {
  TabSignificadoIcon,
  TabLecturaIcon,
  TabCompuestosIcon,
} from '@/app/assets/icons/TranslationPanelTabsIcons';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TranslationPanelProps {
  /** null = panel closed */
  kanji: string | null;
  translation?: TranslationResult;
  error?: EngineError;
  isLoading?: boolean;
  onClose: () => void;
  /** Swipe right → mark as learned */
  onSwipeRight: (kanji: string) => void;
  /** Swipe left → mark as to-review */
  onSwipeLeft: (kanji: string) => void;
  /** Tap kanji glyph → open KanjiDetail */
  onKanjiTap: (kanji: string) => void;
}

type Tab = 'significado' | 'lectura' | 'compuestos';

type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

const TABS: Array<{ id: Tab; label: string; Icon: IconComponent }> = [
  { id: 'significado', label: 'Significado', Icon: TabSignificadoIcon },
  { id: 'lectura',     label: 'Lectura',     Icon: TabLecturaIcon },
  { id: 'compuestos',  label: 'Compuestos',  Icon: TabCompuestosIcon },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function TranslationPanel({
  kanji,
  translation,
  error,
  isLoading = false,
  onClose,
  onSwipeRight,
  onSwipeLeft,
  onKanjiTap,
}: TranslationPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('significado');
  const [swipeFlash, setSwipeFlash] = useState<'right' | 'left' | null>(null);

  // Swipe gesture tracking on the panel
  const swipeStartX = useRef<number | null>(null);
  const swipeStartY = useRef<number | null>(null);

  const isOpen = kanji !== null;

  function handlePointerDown(e: React.PointerEvent) {
    swipeStartX.current = e.clientX;
    swipeStartY.current = e.clientY;
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (swipeStartX.current === null || swipeStartY.current === null) return;
    const dx = e.clientX - swipeStartX.current;
    const dy = e.clientY - swipeStartY.current;
    swipeStartX.current = null;
    swipeStartY.current = null;

    // Require horizontal-dominant swipe > 80px
    if (Math.abs(dx) <= 80 || Math.abs(dx) <= Math.abs(dy)) return;
    if (!kanji) return;

    if (dx > 0) {
      setSwipeFlash('right');
      setTimeout(() => {
        setSwipeFlash(null);
        onSwipeRight(kanji);
      }, 350);
    } else {
      setSwipeFlash('left');
      setTimeout(() => {
        setSwipeFlash(null);
        onSwipeLeft(kanji);
      }, 350);
    }
  }

  // Derive panel background based on swipe feedback
  const panelBg = swipeFlash === 'right'
    ? 'rgba(87, 132, 78, 0.18)'
    : swipeFlash === 'left'
    ? 'rgba(230, 100, 0, 0.18)'
    : undefined; // use CSS class default

  return (
    <>
      {/* Shimmer keyframes injected once */}
      <style>{`
        @keyframes kamiji-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* ── Backdrop ────────────────────────────────────────────── */}
            <motion.div
              key="tp-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={onClose}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 49,
                background: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            />

            {/* ── Panel ───────────────────────────────────────────────── */}
            <motion.div
              key="tp-panel"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                maxHeight: '60vh',
                zIndex: 50,
                background: panelBg ?? 'color-mix(in srgb, var(--color-surface) 95%, transparent)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderRadius: '24px 24px 0 0',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'background 0.3s ease',
                // Prevent iOS Safari text selection / callout on swipe
                WebkitTouchCallout: 'none',
                userSelect: 'none',
              }}
            >
              {/* Drag handle */}
              <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 6px', flexShrink: 0 }}>
                <div style={{
                  width: 40,
                  height: 4,
                  borderRadius: 2,
                  background: 'var(--color-border, rgba(0,0,0,0.2))',
                }} />
              </div>

              {/* Tab bar */}
              <div style={{
                display: 'flex',
                borderBottom: '1px solid var(--color-border)',
                flexShrink: 0,
              }}>
                {TABS.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 3,
                      padding: '8px 4px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      borderBottom: activeTab === id
                        ? '2px solid var(--color-primary)'
                        : '2px solid transparent',
                      color: activeTab === id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      fontSize: 11,
                      lineHeight: 1.2,
                      transition: 'color 0.15s, border-color 0.15s',
                    }}
                  >
                    <Icon />
                    {label}
                  </button>
                ))}
              </div>

              {/* Scrollable content */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 24px' }}>
                {isLoading && <ShimmerSkeleton />}
                {!isLoading && error && <ErrorState error={error} />}
                {!isLoading && !error && translation && (
                  <>
                    {activeTab === 'significado' && (
                      <SignificadoTab
                        result={translation}
                        onKanjiTap={onKanjiTap}
                      />
                    )}
                    {activeTab === 'lectura' && (
                      <LecturaTab result={translation} />
                    )}
                    {activeTab === 'compuestos' && (
                      <CompuestosTab result={translation} />
                    )}
                  </>
                )}
                {!isLoading && !error && !translation && (
                  <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', fontSize: 14, paddingTop: 24 }}>
                    Buscando…
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Tab content ───────────────────────────────────────────────────────────────

function SignificadoTab({
  result,
  onKanjiTap,
}: {
  result: TranslationResult;
  onKanjiTap: (k: string) => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      {/* Large kanji glyph — tap to open KanjiDetail */}
      <button
        onClick={() => onKanjiTap(result.kanji)}
        aria-label={`Ver detalle de ${result.kanji}`}
        style={{
          fontSize: 48,
          lineHeight: 1.1,
          fontFamily: 'var(--font-heading)',
          color: 'var(--color-text)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: 8,
          transition: 'opacity 0.15s',
        }}
      >
        {result.kanji}
      </button>

      {/* Reading (furigana) */}
      <p style={{ fontSize: 18, color: 'var(--color-text-muted)', margin: 0 }}>
        {result.reading}
      </p>

      {/* Part of speech badge */}
      {result.partOfSpeech && (
        <span style={{
          fontSize: 12,
          background: 'var(--color-primary-soft)',
          color: 'var(--color-text)',
          padding: '2px 10px',
          borderRadius: 9999,
        }}>
          {result.partOfSpeech}
        </span>
      )}

      {/* Spanish meaning */}
      <p style={{
        fontSize: 22,
        fontWeight: 700,
        color: 'var(--color-text)',
        textAlign: 'center',
        margin: '4px 0 0',
      }}>
        {result.meaningEs}
      </p>
    </div>
  );
}

function LecturaTab({ result }: { result: TranslationResult }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {result.onyomi && result.onyomi.length > 0 && (
        <section>
          <h3 style={labelStyle}>On&apos;yomi</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {result.onyomi.map((r) => (
              <ReadingChip key={r} text={r} variant="primary" />
            ))}
          </div>
        </section>
      )}
      {result.kunyomi && result.kunyomi.length > 0 && (
        <section>
          <h3 style={labelStyle}>Kun&apos;yomi</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {result.kunyomi.map((r) => (
              <ReadingChip key={r} text={r} variant="accent" />
            ))}
          </div>
        </section>
      )}
      {result.exampleJp && (
        <section>
          <h3 style={labelStyle}>Ejemplo</h3>
          <p style={{ fontSize: 16, color: 'var(--color-text)', margin: '0 0 4px' }}>
            {result.exampleJp}
          </p>
          {result.exampleEs && (
            <p style={{ fontSize: 14, color: 'var(--color-text-muted)', fontStyle: 'italic', margin: 0 }}>
              {result.exampleEs}
            </p>
          )}
        </section>
      )}
      {!result.onyomi?.length && !result.kunyomi?.length && !result.exampleJp && (
        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', fontSize: 14, paddingTop: 16 }}>
          No hay lecturas disponibles.
        </p>
      )}
    </div>
  );
}

function CompuestosTab({ result }: { result: TranslationResult }) {
  if (!result.additionalVocab || result.additionalVocab.length === 0) {
    return (
      <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', fontSize: 14, paddingTop: 24 }}>
        No hay compuestos disponibles.
      </p>
    );
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {result.additionalVocab.map((item) => (
        <div
          key={item.word}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 14px',
            borderRadius: 12,
            border: '1px solid var(--color-border)',
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text)', minWidth: 44 }}>
            {item.word}
          </span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)', margin: '0 0 2px' }}>
              {item.reading}
            </p>
            <p style={{ fontSize: 15, color: 'var(--color-text)', margin: 0 }}>
              {item.meaning}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Loading skeleton ──────────────────────────────────────────────────────────

function ShimmerSkeleton() {
  const shimmer: React.CSSProperties = {
    borderRadius: 8,
    background: 'linear-gradient(90deg, var(--color-border) 25%, color-mix(in srgb, var(--color-surface) 80%, transparent) 50%, var(--color-border) 75%)',
    backgroundSize: '200% 100%',
    animation: 'kamiji-shimmer 1.4s infinite',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{ ...shimmer, width: 64, height: 64, borderRadius: 12 }} />
      <div style={{ ...shimmer, width: 100, height: 18 }} />
      <div style={{ ...shimmer, width: 180, height: 26 }} />
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────

const ERROR_MESSAGES: Record<EngineError['type'], (retryMs?: number) => string> = {
  'rate-limit-short': (ms) =>
    `Kami-chan está descansando. Reintenta en ${ms ? Math.ceil(ms / 1000) : 30}s`,
  'rate-limit-daily': () => 'Límite diario alcanzado. Disponible mañana.',
  'invalid-key':      () => 'Clave de API inválida. Configúrala en Preferencias.',
  'broken-response':  () => 'Algo salió mal, pero aquí tienes el diccionario.',
  'offline':          () => 'IA no disponible sin conexión.',
  'unknown':          () => 'Algo salió mal, pero aquí tienes el diccionario.',
};

function ErrorState({ error }: { error: EngineError }) {
  const msgFn = ERROR_MESSAGES[error.type] ?? ERROR_MESSAGES['unknown'];
  const msg = msgFn(error.retryAfterMs);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, paddingTop: 8 }}>
      <Image
        src="/images/kami-chan-error.png"
        alt="Kami-chan error"
        width={80}
        height={80}
        style={{ objectFit: 'contain' }}
      />
      <p style={{
        fontSize: 14,
        color: 'var(--color-text-muted)',
        textAlign: 'center',
        maxWidth: 240,
        margin: 0,
      }}>
        {msg}
      </p>
    </div>
  );
}

// ── Shared micro-components ───────────────────────────────────────────────────

function ReadingChip({ text, variant }: { text: string; variant: 'primary' | 'accent' }) {
  return (
    <span style={{
      fontSize: 15,
      color: 'var(--color-text)',
      background: variant === 'primary' ? 'var(--color-primary-soft)' : 'var(--color-accent-1)',
      padding: '4px 14px',
      borderRadius: 8,
    }}>
      {text}
    </span>
  );
}

// ── Shared styles ─────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  color: 'var(--color-text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  fontWeight: 600,
  margin: '0 0 6px',
};
