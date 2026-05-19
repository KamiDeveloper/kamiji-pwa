'use client';

// components/reading/KanjiDetail.tsx
// Full-screen expanded kanji view — slides up from the TranslationPanel.
// Uses motion/react for spring animation. z-index: 60 (above TranslationPanel at 50).

import { useRef } from 'react';
import { motion } from 'motion/react';
import type { TranslationResult } from '@/lib/engine/types';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface KanjiDetailProps {
  result: TranslationResult;
  onClose: () => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function KanjiDetail({ result, onClose }: KanjiDetailProps) {
  // Swipe-down to close
  const dragStartY = useRef<number | null>(null);
  const showStrokeOrder = result.entryType !== 'vocabulary' && [...result.kanji].length === 1;

  function handlePointerDown(e: React.PointerEvent) {
    dragStartY.current = e.clientY;
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (dragStartY.current === null) return;
    const dy = e.clientY - dragStartY.current;
    dragStartY.current = null;
    // Swipe down > 80px → close
    if (dy > 80) onClose();
  }

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        background: 'var(--color-bg)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        // Prevent iOS Safari callout
        WebkitTouchCallout: 'none',
      }}
    >
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px 8px',
        flexShrink: 0,
      }}>
        {/* Drag handle (visual hint for swipe-down) */}
        <div style={{ width: 40 }} />
        <div style={{
          width: 40,
          height: 4,
          borderRadius: 2,
          background: 'var(--color-border, rgba(0,0,0,0.2))',
          margin: '0 auto',
        }} />
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Cerrar detalle"
          style={{
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderRadius: 9999,
            color: 'var(--color-text-muted)',
            fontSize: 20,
          }}
        >
          ✕
        </button>
      </header>

      {/* Main content */}
      <div style={{ flex: 1, padding: '8px 28px 40px', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Hero kanji glyph */}
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <span style={{
            fontSize: 96,
            lineHeight: 1.1,
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-text)',
            display: 'block',
          }}>
            {result.kanji}
          </span>
          <p style={{ fontSize: 20, color: 'var(--color-text-muted)', margin: '8px 0 0' }}>
            {result.reading}
          </p>
          {result.partOfSpeech && (
            <span style={{
              display: 'inline-block',
              marginTop: 8,
              fontSize: 12,
              background: 'var(--color-primary-soft)',
              color: 'var(--color-text)',
              padding: '3px 12px',
              borderRadius: 9999,
            }}>
              {result.partOfSpeech}
            </span>
          )}
        </div>

        {/* Spanish meaning */}
        <Section title="Significado">
          <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text)', margin: 0, textAlign: 'center' }}>
            {result.meaningEs}
          </p>
        </Section>

        {/* Readings */}
        {(result.onyomi?.length || result.kunyomi?.length) ? (
          <Section title="Lecturas">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {result.onyomi && result.onyomi.length > 0 && (
                <ReadingRow label="On'yomi" chips={result.onyomi} variant="primary" />
              )}
              {result.kunyomi && result.kunyomi.length > 0 && (
                <ReadingRow label="Kun'yomi" chips={result.kunyomi} variant="accent" />
              )}
            </div>
          </Section>
        ) : null}

        {/* Example sentence */}
        {result.exampleJp && (
          <Section title="Ejemplo">
            <p style={{ fontSize: 18, color: 'var(--color-text)', margin: '0 0 6px', lineHeight: 1.6 }}>
              {result.exampleJp}
            </p>
            {result.exampleEs && (
              <p style={{ fontSize: 15, color: 'var(--color-text-muted)', fontStyle: 'italic', margin: 0 }}>
                {result.exampleEs}
              </p>
            )}
          </Section>
        )}

        {/* Compuestos / additional vocab */}
        {result.additionalVocab && result.additionalVocab.length > 0 && (
          <Section title="Compuestos">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {result.additionalVocab.map((item) => (
                <div
                  key={item.word}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '10px 14px',
                    borderRadius: 12,
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                  }}
                >
                  <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text)', minWidth: 48 }}>
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
          </Section>
        )}

        {/* Stroke order placeholder */}
        {showStrokeOrder && (
          <Section title="Orden de trazos">
            <div style={{
              border: '1px dashed var(--color-border)',
              borderRadius: 12,
              padding: '24px 16px',
              textAlign: 'center',
              color: 'var(--color-text-muted)',
              fontSize: 13,
            }}>
              Orden de trazos próximamente
            </div>
          </Section>
        )}
      </div>
    </motion.div>
  );
}

// ── Shared section layout ─────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 style={{
        fontSize: 11,
        fontWeight: 700,
        color: 'var(--color-text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        margin: '0 0 10px',
      }}>
        {title}
      </h3>
      {children}
    </section>
  );
}

function ReadingRow({
  label,
  chips,
  variant,
}: {
  label: string;
  chips: string[];
  variant: 'primary' | 'accent';
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 12, color: 'var(--color-text-muted)', minWidth: 68 }}>{label}</span>
      {chips.map((c) => (
        <span
          key={c}
          style={{
            fontSize: 15,
            color: 'var(--color-text)',
            background: variant === 'primary' ? 'var(--color-primary-soft)' : 'var(--color-accent-1)',
            padding: '3px 12px',
            borderRadius: 8,
          }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}
