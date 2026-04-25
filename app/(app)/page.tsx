// app/(app)/page.tsx — Home (tab: Inicio)
export default function HomePage() {
  return (
    <div
      id="home-page"
      style={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.75rem",
          fontWeight: 700,
          color: "var(--color-text)",
          margin: 0,
        }}
      >
        神字 KamiJi
      </h1>
      <p style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>
        Inicio — Fase 4 pendiente
      </p>
    </div>
  );
}
