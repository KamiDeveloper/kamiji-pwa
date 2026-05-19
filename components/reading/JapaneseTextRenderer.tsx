'use client';

// components/reading/JapaneseTextRenderer.tsx
// Parses story text containing {漢字|かんじ} tokens and renders them as
// RubyKanji components, preserving plain text and paragraph structure.

import { RubyKanji } from './RubyKanji';
import type { JLPTLevel } from '@/lib/engine/types';

interface JapaneseTextRendererProps {
  text: string;
  level: JLPTLevel;
  /** Set of kanji strings the user has already marked as learned */
  learnedKanji: Set<string>;
  /** Set of kanji strings whose furigana is currently visible */
  visibleFurigana: Set<string>;
  /** If true, all furigana is shown regardless of visibleFurigana */
  allFuriganaVisible: boolean;
  /** Fired when the user taps a kanji */
  onKanjiTap?: (kanji: string) => void;
  className?: string;
}

// Token types produced by the parser
type PlainToken = { type: 'plain'; text: string };
type KanjiToken = { type: 'kanji'; kanji: string; reading: string };
type Token = PlainToken | KanjiToken;

/**
 * Parse story text into tokens.
 * Handles the format {漢字|かんじ} for kanji with furigana.
 * If no | separator is found inside braces, treats it as plain text.
 */
function parseText(text: string): Token[] {
  const tokens: Token[] = [];
  // Matches {content} blocks; captures (before-pipe | after-pipe)
  const RE = /\{([^|{}]+)\|([^|{}]+)\}|\{([^{}]+)\}|([^{}]+)/g;
  let match: RegExpExecArray | null;

  while ((match = RE.exec(text)) !== null) {
    if (match[1] !== undefined && match[2] !== undefined) {
      // {kanji|reading} token
      tokens.push({ type: 'kanji', kanji: match[1], reading: match[2] });
    } else if (match[3] !== undefined) {
      // {text} with no pipe — treat as plain text (strip braces)
      tokens.push({ type: 'plain', text: match[3] });
    } else if (match[4] !== undefined) {
      tokens.push({ type: 'plain', text: match[4] });
    }
  }

  return tokens;
}

/**
 * Split an array of tokens by newline characters in plain tokens,
 * returning an array of "line" token arrays suitable for paragraph rendering.
 */
function splitIntoParagraphs(tokens: Token[]): Token[][] {
  const paragraphs: Token[][] = [[]];

  for (const token of tokens) {
    if (token.type === 'plain') {
      const parts = token.text.split('\n');
      parts.forEach((part, idx) => {
        if (idx > 0) {
          paragraphs.push([]);
        }
        if (part.length > 0) {
          paragraphs[paragraphs.length - 1].push({ type: 'plain', text: part });
        }
      });
    } else {
      paragraphs[paragraphs.length - 1].push(token);
    }
  }

  // Remove empty trailing paragraph
  if (paragraphs[paragraphs.length - 1].length === 0) {
    paragraphs.pop();
  }

  return paragraphs;
}

export function JapaneseTextRenderer({
  text,
  learnedKanji,
  visibleFurigana,
  allFuriganaVisible,
  onKanjiTap,
  className,
}: JapaneseTextRendererProps) {
  const tokens = parseText(text);
  const paragraphs = splitIntoParagraphs(tokens);

  return (
    <div className={className}>
      {paragraphs.map((paragraph, pIdx) => (
        <p key={pIdx} className="japanese-paragraph">
          {paragraph.map((token, tIdx) => {
            if (token.type === 'plain') {
              return <span key={tIdx}>{token.text}</span>;
            }

            const { kanji, reading } = token;
            const isLearned = learnedKanji.has(kanji);
            const furiganaVisible = allFuriganaVisible || visibleFurigana.has(kanji);
            const isInteractive = !isLearned;

            return (
              <RubyKanji
                key={`${tIdx}-${kanji}`}
                kanji={kanji}
                reading={reading}
                isLearned={isLearned}
                furiganaVisible={furiganaVisible}
                isInteractive={isInteractive}
                onClick={() => onKanjiTap?.(kanji)}
              />
            );
          })}
        </p>
      ))}
    </div>
  );
}
