'use client';

// components/reading/ReadingHeader.tsx
// Sticky header with back button, story title (truncated), and page counter.

interface ReadingHeaderProps {
  storyTitle: string;
  currentPage: number;
  totalPages: number;
  onBack: () => void;
}

export function ReadingHeader({
  storyTitle,
  currentPage,
  totalPages,
  onBack,
}: ReadingHeaderProps) {
  const displayTitle =
    storyTitle.length > 20 ? storyTitle.slice(0, 20) + '…' : storyTitle;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        height: '56px',
        paddingLeft: '16px',
        paddingRight: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'color-mix(in srgb, var(--color-surface) 90%, transparent)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        borderBottom: '1px solid var(--color-border)',
        flexShrink: 0,
      }}
    >
      {/* Botón volver */}
      <button
        onClick={onBack}
        aria-label="Volver"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: 'var(--color-text)',
          fontSize: '1.25rem',
          borderRadius: 'var(--radius-button)',
          flexShrink: 0,
          padding: 0,
        }}
      >
        ←
      </button>

      {/* Título */}
      <span
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text)',
          fontSize: '1rem',
          fontWeight: 600,
          flex: 1,
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          padding: '0 8px',
        }}
      >
        {displayTitle}
      </span>

      {/* Contador de páginas */}
      <span
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--color-text-muted)',
          fontSize: '0.8125rem',
          flexShrink: 0,
          minWidth: '48px',
          textAlign: 'right',
        }}
      >
        {currentPage + 1} / {totalPages}
      </span>
    </header>
  );
}
