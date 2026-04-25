// components/SplashScreen.tsx
"use client";
import { useEffect, useState } from "react";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Minimum splash display: 1.5s (AUTH-05 requirement)
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="kamiji-splash"
      role="status"
      aria-label="Cargando KamiJi"
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF4E6", // N5 crema — always N5 on first load
        zIndex: 9999,
        gap: "1.5rem",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease-out",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* 神字 logotype */}
      <div
        aria-hidden="true"
        style={{
          fontFamily:
            "var(--font-cormorant-garamond, 'Cormorant Garamond', serif)",
          fontSize: "5rem",
          color: "#C8382E", // Bermellón Kami
          lineHeight: 1,
          letterSpacing: "-0.02em",
          animation: "splash-fade-in 0.6s ease-out forwards",
        }}
      >
        神字
      </div>

      {/* Brand name */}
      <div
        aria-hidden="true"
        style={{
          fontFamily:
            "var(--font-cormorant-garamond, 'Cormorant Garamond', serif)",
          fontSize: "2rem",
          fontWeight: 600,
          color: "#0F1320",
          letterSpacing: "0.1em",
          textTransform: "uppercase" as const,
          animation: "splash-fade-in 0.6s ease-out 0.2s both",
        }}
      >
        KamiJi
      </div>

      {/* Loading bar */}
      <div
        aria-hidden="true"
        style={{
          width: "40px",
          height: "2px",
          backgroundColor: "#C8382E",
          borderRadius: "2px",
          animation: "splash-bar 1.5s ease-in-out infinite",
          opacity: 0.7,
        }}
      />

      <style>{`
        @keyframes splash-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes splash-bar {
          0%, 100% { transform: scaleX(0.3); opacity: 0.4; }
          50% { transform: scaleX(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
