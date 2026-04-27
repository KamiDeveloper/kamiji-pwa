// app/(app)/read/[storyId]/page.tsx
// Server Component — resolves storyId param and delegates to client wrapper.
// Next.js 16: params is a Promise — must be awaited.

import { ReadingViewClient } from '@/components/reading/ReadingViewClient';

interface ReadingPageProps {
  params: Promise<{ storyId: string }>;
}

export default async function ReadingPage({ params }: ReadingPageProps) {
  const { storyId } = await params;
  return <ReadingViewClient storyId={storyId} />;
}

export async function generateMetadata({
  params,
}: ReadingPageProps) {
  const { storyId } = await params;
  return {
    title: `Leer — ${storyId} | KamiJi`,
  };
}
