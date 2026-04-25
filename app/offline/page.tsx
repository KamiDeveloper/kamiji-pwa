// app/offline/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sin conexión — KamiJi",
  description: "Parece que no hay conexión a internet.",
};

export default function OfflinePage() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-bg)",
        padding: "2rem",
        textAlign: "center",
        gap: "1.5rem",
      }}
    >
      {/* Kami-chan confused fox placeholder — replace with branded illustration */}
      <div
        aria-hidden="true"
        style={{ fontSize: "5rem", lineHeight: 1 }}
      >
        🦊
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-heading, serif)",
            fontSize: "1.75rem",
            fontWeight: 700,
            color: "var(--color-text)",
            margin: 0,
          }}
        >
          Sin conexión
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "1rem",
            color: "var(--color-text-muted)",
            maxWidth: "300px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          No hay conexión a internet. Puedes seguir usando el diccionario y
          repasar kanji que ya tienes guardados.
        </p>
      </div>

      <div
        aria-label="Sin WiFi"
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          backgroundColor: "var(--color-primary-soft)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
        }}
      >
        📵
      </div>

      <p
        style={{
          fontFamily: "var(--font-body, sans-serif)",
          fontSize: "0.85rem",
          color: "var(--color-text-muted)",
        }}
      >
        Revisa tu conexión y vuelve a intentarlo
      </p>
    </main>
  );
}
