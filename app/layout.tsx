// app/layout.tsx
import type { Metadata, Viewport } from "next";
import {
  Noto_Sans_JP,
  Zen_Maru_Gothic,
  EB_Garamond,
  Shippori_Mincho,
  Cormorant_Garamond,
  Nunito,
  Outfit,
  Noto_Serif_JP,
} from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NetworkWatcher } from "@/components/NetworkWatcher";
import "./globals.css";

// ── Font definitions ──────────────────────────────────────
// All 8 fonts loaded via next/font for self-hosting and offline caching.
// Each gets a CSS variable name applied to <html> className.
// Theme system in globals.css switches --font-heading/--font-body per level.

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  preload: true,
});

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-zen-maru-gothic",
  display: "swap",
  preload: true, // N5 heading font
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-eb-garamond",
  display: "swap",
  preload: false,
});

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-shippori-mincho",
  display: "swap",
  preload: false,
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant-garamond",
  display: "swap",
  preload: true, // Used for logo/splash and N1 heading
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
  preload: true, // N5 body font
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
  preload: true, // N4/N3/N2 heading font
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif-jp",
  display: "swap",
  preload: false, // N1 body font — lazy load
});

// ── Metadata ──────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "KamiJi — Aprende Kanji",
    template: "%s — KamiJi",
  },
  description:
    "Aprende kanji japonés leyendo historias reales. La aplicación de JLPT que crece contigo.",
  keywords: ["kanji", "japonés", "JLPT", "aprender", "lectura", "español"],
  authors: [{ name: "KamiJi" }],
  robots: "index, follow",
  openGraph: {
    title: "KamiJi — Aprende Kanji",
    description: "La aplicación de kanji que crece contigo: de N5 a N1.",
    type: "website",
    locale: "es_ES",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#C8382E",
};

// ── Root Layout ───────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontClassNames = [
    notoSansJP.variable,
    zenMaruGothic.variable,
    ebGaramond.variable,
    shipporiMincho.variable,
    cormorantGaramond.variable,
    nunito.variable,
    outfit.variable,
    notoSerifJP.variable,
  ].join(" ");

  return (
    <html lang="es" data-level="n5" className={fontClassNames}>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <NetworkWatcher />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
