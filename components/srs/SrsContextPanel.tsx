'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrentLevel } from '@/store';
import type { DailyQueue } from '@/lib/srs/types';

interface SrsContextPanelProps {
  surface: 'home' | 'review';
}

interface SrsContextState {
  queue: DailyQueue | null;
  isWelcomeBack: boolean;
  daysSinceLastStudy: number | null;
  isLoading: boolean;
}

export function SrsContextPanel({ surface }: SrsContextPanelProps) {
  const { user } = useAuth();
  const level = useCurrentLevel();
  const [state, setState] = useState<SrsContextState>({
    queue: null,
    isWelcomeBack: false,
    daysSinceLastStudy: null,
    isLoading: true,
  });

  useEffect(() => {
    let mounted = true;

    async function loadSrsContext() {
      setState((current) => ({ ...current, isLoading: true }));
      try {
        const { getDailyQueue, getDaysSinceLastStudy, isWelcomeBackScenario } = await import(
          '@/lib/srs/queue'
        );
        const [queue, daysSinceLastStudy, isWelcomeBack] = await Promise.all([
          getDailyQueue(level),
          getDaysSinceLastStudy(user?.uid),
          isWelcomeBackScenario(user?.uid),
        ]);

        if (!mounted) return;
        setState({
          queue,
          daysSinceLastStudy,
          isWelcomeBack,
          isLoading: false,
        });
      } catch {
        if (!mounted) return;
        setState({
          queue: null,
          daysSinceLastStudy: null,
          isWelcomeBack: false,
          isLoading: false,
        });
      }
    }

    void loadSrsContext();
    return () => {
      mounted = false;
    };
  }, [level, user?.uid]);

  const reviewCount = state.queue?.totalDue ?? 0;
  const newCount = state.queue?.totalNew ?? 0;
  const visibleReviewCount = state.queue?.reviews.length ?? 0;
  const hasReviews = reviewCount > 0;

  const title = state.isWelcomeBack
    ? 'Bienvenido de vuelta'
    : surface === 'review'
      ? 'Repaso de hoy'
      : 'Tu ritmo de hoy';

  const message = state.isLoading
    ? 'Preparando tu cola de estudio.'
    : state.isWelcomeBack
      ? `Han pasado ${state.daysSinceLastStudy ?? 'varios'} días. Hoy te mostramos hasta ${visibleReviewCount || 30} repasos para retomar sin saturarte.`
      : hasReviews
        ? `Tienes ${reviewCount} kanji listos para repasar.`
        : newCount > 0
          ? `No hay repasos vencidos. Puedes aprender hasta ${Math.min(newCount, 5)} kanji nuevos.`
          : 'No hay repasos pendientes por ahora.';

  return (
    <section
      aria-live="polite"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        padding: '16px',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
        background: state.isWelcomeBack
          ? 'color-mix(in srgb, var(--color-primary-soft) 72%, var(--color-surface))'
          : 'var(--color-surface)',
        boxShadow: '0 8px 24px rgba(15, 19, 32, 0.06)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p
          style={{
            margin: 0,
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {level.toUpperCase()}
        </p>
        <h2
          style={{
            margin: 0,
            color: 'var(--color-text)',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            margin: 0,
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            lineHeight: 1.45,
          }}
        >
          {message}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 8,
        }}
      >
        <Metric label="Repasos" value={state.isLoading ? '...' : String(reviewCount)} />
        <Metric label="Nuevos" value={state.isLoading ? '...' : String(newCount)} />
      </div>

      {surface === 'home' && (
        <Link
          href="/review"
          style={{
            alignSelf: 'flex-start',
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Ir a repasar
        </Link>
      )}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        minHeight: 64,
        padding: '10px 12px',
        borderRadius: 8,
        border: '1px solid var(--color-border)',
        background: 'color-mix(in srgb, var(--color-bg) 82%, transparent)',
      }}
    >
      <p
        style={{
          margin: 0,
          color: 'var(--color-text)',
          fontFamily: 'var(--font-heading)',
          fontSize: 24,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      <p
        style={{
          margin: '6px 0 0',
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-body)',
          fontSize: 12,
        }}
      >
        {label}
      </p>
    </div>
  );
}
