'use client';

// components/reading/ReadingViewClient.tsx
// Client wrapper that resolves storyId to a story and renders ReadingView.
// Demo story is used until Phase 4 introduces a real story catalogue.

import { useRouter } from 'next/navigation';
import { ReadingView } from './ReadingView';
import type { Story } from './ReadingView';
import type { JLPTLevel } from '@/lib/engine/types';

// ── Historia de demostración (N5) ─────────────────────────────────────────────

const DEMO_STORY: Story = {
  id: 'demo-n5',
  title: 'はじめての物語',
  level: 'n5' as JLPTLevel,
  pages: [
    '{私|わたし}は{学生|がくせい}です。{今日|きょう}は{学校|がっこう}に{行|い}きます。',
    '{先生|せんせい}は{優|やさ}しいです。{授業|じゅぎょう}は{楽|たの}しいです。',
    '{友達|ともだち}と{一緒|いっしょ}に{昼食|ちゅうしょく}を{食|た}べます。',
  ],
};

/** Lookup map for future Phase 4 stories */
function resolveStory(storyId: string): Story {
  if (storyId === 'demo-n5' || storyId === 'demo') {
    return DEMO_STORY;
  }
  // Fallback: use demo story until real catalogue is implemented
  return { ...DEMO_STORY, id: storyId };
}

// ── Component ─────────────────────────────────────────────────────────────────

interface ReadingViewClientProps {
  storyId: string;
}

export function ReadingViewClient({ storyId }: ReadingViewClientProps) {
  const router = useRouter();
  const story = resolveStory(storyId);

  return (
    <ReadingView
      story={story}
      onBack={() => router.back()}
    />
  );
}
