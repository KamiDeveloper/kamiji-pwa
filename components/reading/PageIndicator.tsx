'use client';

// components/reading/PageIndicator.tsx
// Dot row (≤10 pages) or text counter (>10 pages) centered below reading area.

interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
}

export function PageIndicator({ currentPage, totalPages }: PageIndicatorProps) {
  if (totalPages <= 10) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 0',
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <span
            key={i}
            aria-label={i === currentPage ? `Página ${i + 1} (actual)` : `Página ${i + 1}`}
            style={{
              display: 'inline-block',
              width: i === currentPage ? '8px' : '6px',
              height: i === currentPage ? '8px' : '6px',
              borderRadius: '50%',
              background:
                i === currentPage
                  ? 'var(--color-primary)'
                  : 'var(--color-border, rgba(0,0,0,0.2))',
              transition: 'all 200ms ease',
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '8px 0',
        fontFamily: 'var(--font-body)',
        fontSize: '0.8125rem',
        color: 'var(--color-text-muted)',
      }}
    >
      {currentPage + 1} / {totalPages}
    </div>
  );
}
