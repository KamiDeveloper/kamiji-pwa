'use client';
// components/DictionaryLoader.tsx
// Blocking "Preparando tu camino" dictionary loading screen.
// Shown on first launch when IndexedDB dictionary is empty.
// Design reference: docs/branding/brand visual concept/Preparando Diccionario.png
// Color tokens: --color-bg (#FFF4E6), --color-brand-gold (#C89D4A), --color-text (#0F1320)

import { useEffect, useState, useCallback } from 'react';
import { loadDictionary, isDictionaryLoaded } from '@/lib/dictionary/loader';
import type { LoadProgress } from '@/lib/dictionary/types';
import type { JLPTLevel } from '@/lib/db';

interface DictionaryLoaderProps {
  level: JLPTLevel;
  children: React.ReactNode;
}

export default function DictionaryLoader({ level, children }: DictionaryLoaderProps) {
  const [isLoading, setIsLoading] = useState<boolean | null>(null); // null = checking
  const [progress, setProgress] = useState<LoadProgress>({ loaded: 0, total: 1, phase: 'fetching' });
  const [error, setError] = useState<string | null>(null);

  const handleProgress = useCallback((p: LoadProgress) => {
    setProgress(p);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const loaded = await isDictionaryLoaded(level);
        if (cancelled) return;

        if (loaded) {
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        await loadDictionary(level, handleProgress);
        if (!cancelled) setIsLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error cargando diccionario');
        }
      }
    }

    check();
    return () => { cancelled = true; };
  }, [level, handleProgress]);

  // Still checking
  if (isLoading === null) return null;

  // Dictionary ready
  if (!isLoading && !error) return <>{children}</>;

  // Error state
  if (error) {
    return (
      <div className="dictionary-loader-screen" role="alert">
        <div className="dictionary-loader-content">
          <p className="dictionary-loader-error">⚠ {error}</p>
          <button
            className="dictionary-loader-retry"
            onClick={() => { setError(null); setIsLoading(null); }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Loading screen — "Preparando tu camino"
  const percentage = progress.total > 0
    ? Math.round((progress.loaded / progress.total) * 100)
    : 0;

  const phaseLabel: Record<LoadProgress['phase'], string> = {
    fetching: 'Descargando diccionario...',
    parsing: 'Procesando datos...',
    writing: 'Organizando tu biblioteca...',
    done: '¡Listo!',
  };

  return (
    <div className="dictionary-loader-screen" aria-live="polite" aria-label="Cargando diccionario">
      {/* Kami-chan illustration placeholder — replace with actual PNG asset */}
      <div className="dictionary-loader-illustration" aria-hidden="true">
        <img
          src="/images/kami-chan-reading.png"
          alt=""
          className="dictionary-loader-fox"
          width={220}
          height={220}
        />
      </div>

      <div className="dictionary-loader-content">
        <h1 className="dictionary-loader-heading">Preparando tu camino</h1>
        <p className="dictionary-loader-body">
          Kami-chan está organizando todo para ti.<br />
          Cargando diccionarios, ejemplos y sabiduría japonesa ✨
        </p>

        {/* Gold progress bar */}
        <div className="dictionary-loader-bar-track" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="dictionary-loader-bar-fill"
            style={{ width: `${percentage}%` }}
          />
          <span className="dictionary-loader-percentage">{percentage}%</span>
        </div>

        {/* Phase label */}
        <div className="dictionary-loader-info">
          <span className="dictionary-loader-icon" aria-hidden="true">📚</span>
          <p className="dictionary-loader-phase">{phaseLabel[progress.phase]}</p>
        </div>

        {/* Brand footer */}
        <p className="dictionary-loader-footer">
          Cada palabra te acerca a tu mejor versión.
        </p>
      </div>
    </div>
  );
}
