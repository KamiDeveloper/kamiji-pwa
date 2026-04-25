// components/OfflineBanner.tsx
"use client";
import { useIsOffline } from "@/store";

export function OfflineBanner() {
  const isOffline = useIsOffline();

  if (!isOffline) return null;

  return (
    <div
      id="offline-banner"
      role="alert"
      aria-live="polite"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0.5rem 1rem",
        backgroundColor: "#F59E0B",
        color: "#0F1320",
        textAlign: "center",
        fontSize: "0.875rem",
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
      }}
    >
      <span aria-hidden="true">📵</span>
      Sin conexión — El diccionario y tus kanji guardados siguen disponibles
    </div>
  );
}
