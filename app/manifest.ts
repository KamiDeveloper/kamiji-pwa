// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KamiJi — Aprende Kanji",
    short_name: "KamiJi",
    description:
      "Aprende kanji japonés leyendo historias reales. La aplicación que crece contigo.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    // N5 crema cálido (matches default theme background)
    background_color: "#FFF4E6",
    // Bermellón Kami (brand vermilion)
    theme_color: "#C8382E",
    lang: "es",
    categories: ["education", "utilities"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    prefer_related_applications: false,
  };
}
