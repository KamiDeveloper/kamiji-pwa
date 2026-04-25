// app/(app)/dictionary/page.tsx — Dictionary (tab: Diccionario)
export default function DictionaryPage() {
  return (
    <div
      id="dictionary-page"
      style={{ padding: "1.5rem" }}
    >
      <h1 style={{ fontFamily: "var(--font-heading)", color: "var(--color-text)", margin: "0 0 0.5rem" }}>
        Diccionario
      </h1>
      <p style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>
        Búsqueda de kanji — Fase 2 pendiente
      </p>
    </div>
  );
}
