/// <reference lib="webworker" />

import { Serwist } from "serwist";
import { CacheFirst, NetworkFirst, ExpirationPlugin } from "serwist";
import type { PrecacheEntry } from "serwist";

declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: (PrecacheEntry | string)[];
};

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  precacheOptions: {
    navigateFallback: "/offline",
    navigateFallbackDenylist: [
      /^\/api\//,
      /^\/_next\//,
      /\.[^/?]+$/,
    ],
  },
  runtimeCaching: [
    {
      matcher: /\/_next\/static\/media\/.+\.woff2$/,
      handler: new CacheFirst({
        cacheName: "kamiji-fonts",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 20,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          }),
        ],
      }),
    },
    {
      matcher: /\/_next\/static\/.+/,
      handler: new CacheFirst({
        cacheName: "kamiji-static",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 60,
            maxAgeSeconds: 60 * 60 * 24 * 30,
          }),
        ],
      }),
    },
    {
      matcher: () => true,
      handler: new NetworkFirst(),
    },
  ],
});

serwist.addEventListeners();
