'use client';

// components/reading/RubyKanji.tsx
// Interactive ruby element with anti-CLS furigana reveal.
// Uses CSS visibility:hidden → visible + opacity transition (zero layout shift).

interface RubyKanjiProps {
  kanji: string;
  reading: string;
  /** True if the user has already learned this kanji */
  isLearned: boolean;
  /** Controlled externally — true to show furigana above the kanji */
  furiganaVisible: boolean;
  /** False if the kanji is already learned (no interaction indicators) */
  isInteractive: boolean;
  /** Callback for tap interaction */
  onClick?: () => void;
  className?: string;
}

export function RubyKanji({
  kanji,
  reading,
  isLearned,
  furiganaVisible,
  isInteractive,
  onClick,
  className,
}: RubyKanjiProps) {
  const showDot = isInteractive && !isLearned;

  return (
    <ruby
      data-kanji={kanji}
      data-interactive={showDot ? 'true' : 'false'}
      data-learned={isLearned ? 'true' : 'false'}
      // Prevent iOS Safari magnifier and context menus from overriding gestures
      style={{ WebkitTouchCallout: 'none' }}
      className={className}
      onClick={onClick}
    >
      {kanji}
      <rt
        className={`furigana${furiganaVisible ? ' visible' : ''}`}
        style={{
          color: 'var(--color-text-muted)',
          opacity: furiganaVisible ? 1 : 0,
        }}
      >
        {reading}
      </rt>
    </ruby>
  );
}
