'use client';

// components/reading/KanjiSummaryFooter.tsx
// Fixed overlay above bottom nav showing known vs. new kanji counts for the current page.

interface KanjiSummaryFooterProps {
  totalKanji: number;
  knownKanji: number;
  newKanji: number;
}

export function KanjiSummaryFooter({
  knownKanji,
  newKanji,
}: KanjiSummaryFooterProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'var(--bottom-nav-offset)',
        left: 0,
        right: 0,
        zIndex: 30,
        padding: '4px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'color-mix(in srgb, var(--color-surface) 80%, transparent)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        fontFamily: 'var(--font-body)',
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {/* Conocidos */}
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span
          style={{
            display: 'inline-block',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#57844E',
            flexShrink: 0,
          }}
        />
        Conocidos: {knownKanji}
      </span>

      <span style={{ color: 'var(--color-border)', userSelect: 'none' }}>·</span>

      {/* Nuevos */}
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span
          style={{
            display: 'inline-block',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: 'var(--color-primary)',
            flexShrink: 0,
          }}
        />
        Nuevos: {newKanji}
      </span>
    </div>
  );
}
