// components/ThemeProvider.tsx
"use client";
import { useEffect } from "react";
import { useKamijiStore } from "@/store";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const currentLevel = useKamijiStore((state) => state.currentLevel);

  useEffect(() => {
    // Sync JLPT level to html[data-level] — drives CSS metamorphosis system
    document.documentElement.setAttribute("data-level", currentLevel);
  }, [currentLevel]);

  return <>{children}</>;
}
