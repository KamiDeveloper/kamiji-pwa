// app/sw.ts
/// <reference types="@serwist/next/typings" />
import { defaultCache } from "@serwist/next/worker";
import { installSerwist } from "@serwist/sw";

// self.__SW_MANIFEST is injected by Serwist at build time
installSerwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  // Serve offline fallback for all navigation requests when network fails
  navigationFallback: "/offline",
  runtimeCaching: [
    // Cache next/font self-hosted woff2 files (font switching for metamorphosis)
    {
      matcher: /\/_next\/static\/media\/.+\.woff2$/,
      handler: "CacheFirst",
      options: {
        cacheName: "kamiji-fonts",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
    // Cache Next.js static assets
    {
      matcher: /\/_next\/static\/.+/,
      handler: "CacheFirst",
      options: {
        cacheName: "kamiji-static",
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    // Default: network-first for all other requests
    ...defaultCache,
  ],
});
