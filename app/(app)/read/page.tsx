// app/(app)/read/page.tsx — Lista de historias (tab: Leer)
// Phase 4 introducirá un catálogo real. Por ahora, redirige a la historia demo.
import Link from 'next/link';

export default function ReadPage() {
  return (
    <div
      id="read-page"
      style={{ padding: '1.5rem' }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          color: 'var(--color-text)',
          margin: '0 0 0.5rem',
        }}
      >
        Leer
      </h1>
      <p
        style={{
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-body)',
          marginBottom: '1.5rem',
        }}
      >
        Elige una historia para comenzar a leer
      </p>

      {/* Historia demo — se reemplaza en Fase 4 con catálogo completo */}
      <Link
        href="/read/demo-n5"
        style={{
          display: 'block',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-body)',
          textDecoration: 'none',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <p style={{ margin: 0, fontWeight: 600, fontSize: '1rem' }}>
          はじめての物語
        </p>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
          N5 · Historia de demostración · 3 páginas
        </p>
      </Link>
    </div>
  );
}
