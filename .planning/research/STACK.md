# KamiJi Project: Tech Stack Reference

*Research completed: 2026-04-24*

---

## Core Dependencies (Locked by PRD)

| Layer | Package | Version | Notes |
|-------|---------|---------|-------|
| **Framework** | `next` | `^15.3` | Next.js 15 is stable in 2026; v16 is referenced in PRD but v15.x is the actual latest stable. Use latest stable. |
| **Language** | `typescript` | `^5.x` | TypeScript 5+ required |
| **Styling** | `tailwindcss` | `^4.x` | Tailwind v4 is stable; use `@tailwindcss/vite` or the Next.js plugin |
| **UI Animations** | `motion` | `^11.x` | Framer Motion rebranded to `motion` package; v11 is the current major |
| **SVG Animations** | `gsap` | `^3.x` | GSAP 3 (v3.12+); pinceladas, metamorphosis ceremonies |
| **Global State** | `zustand` | `^5.x` | Zustand 5 (latest major) |
| **Server State** | `@tanstack/react-query` | `^5.x` | TanStack Query v5 (stable) |
| **Auth** | `firebase` | `^11.x` | Firebase SDK v11 (Modular API required) |
| **Local DB** | `dexie` | `^4.x` | Dexie.js v4 (stable) |
| **PWA** | `@serwist/next` | `^9.x` | Serwist v9 — successor to next-pwa; App Router compatible |
| **AI SDK** | `@google/genai` | `^1.x` | NEW package name (not @google/generative-ai which is deprecated) |
| **FSRS** | `ts-fsrs` | `^3.x` | Active, production-ready FSRS v4-5 implementation in TypeScript |
| **Icons** | `lucide-react` | `latest` | Consistent icon set for UI |
| **Fonts** | `next/font/google` | built-in | Automatic Next.js font optimization |

---

## Package Notes & Gotchas

### Next.js + Tailwind CSS 4

```bash
# Tailwind v4 uses a different setup from v3
# Install:
npm install tailwindcss @tailwindcss/postcss postcss

# postcss.config.mjs:
export default { plugins: { "@tailwindcss/postcss": {} } };

# No more tailwind.config.js in v4 — configuration via CSS
# globals.css:
@import "tailwindcss";
```

**Gotcha**: Tailwind v4 no longer uses `tailwind.config.js` by default. Design tokens go in CSS `@theme` blocks. This is a major API change from v3.

### Serwist + Next.js App Router

```javascript
// next.config.mjs
import withSerwist from "@serwist/next";
const withSerwistConfig = withSerwist({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  // Disable during development to avoid cache conflicts:
  disable: process.env.NODE_ENV === "development",
});
export default withSerwistConfig({ /* nextConfig */ });
```

**Gotcha**: Turbopack support with Serwist is limited. Use `--webpack` in development if issues arise. In production builds, Serwist works correctly.

**Version**: `@serwist/next@9.0.x` — npm package is active and maintained.

### @google/genai (not @google/generative-ai)

```typescript
// CORRECT (2025/2026):
import { GoogleGenAI } from "@google/genai";

// WRONG (deprecated):
// import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenAI({ apiKey: userKey });
const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: "...",
});
```

**Gotcha**: `@google/generative-ai` is the old SDK. The new `@google/genai` package has a different API surface. Always use the new package.

### Dexie.js 4 + Next.js SSR

```typescript
// CRITICAL: Dexie cannot run on the server (Node.js has no IndexedDB)
// Always guard Dexie usage:

// Option A: 'use client' component
'use client';
import { db } from '@/lib/db'; // safe inside client components

// Option B: Dynamic import for optional client usage
const { db } = await import('@/lib/db'); // inside useEffect or event handlers

// Option C: Guard check
if (typeof window === 'undefined') return null;
```

**Gotcha**: If Dexie is imported in a Server Component, the build will fail. Always ensure db.ts is only imported in client contexts.

### ts-fsrs (FSRS v4/v5)

```typescript
import { fsrs, generatorParameters, createEmptyCard, Rating } from 'ts-fsrs';

// Setup (use once)
const params = generatorParameters({ request_retention: 0.9 });
const f = fsrs(params);

// Create a new card
const card = createEmptyCard();

// Process a review
const scheduling = f.repeat(card, new Date());
const result = scheduling[Rating.Good]; // Rating.Again, Hard, Good, Easy

// Next review date:
result.card.due; // Date object for next review
result.card.stability; // days expected to be remembered
```

**Confirmed**: ts-fsrs is actively maintained, implements FSRS v4 and v5. Ratings: `Rating.Again = 1, Rating.Hard = 2, Rating.Good = 3, Rating.Easy = 4`.

### Motion (Framer Motion)

```typescript
// Package name changed in 2024:
import { motion, AnimatePresence, useAnimation } from 'motion/react';
// NOT: import from 'framer-motion' (still works but use 'motion/react' for new projects)
```

**Version**: Motion v11 (current). Compatible with React 18 and 19. No known conflicts with Next.js 15.

---

## What NOT To Use

| ❌ Don't Use | ✅ Use Instead | Reason |
|-------------|--------------|--------|
| `next-pwa` | `@serwist/next` | next-pwa is unmaintained; breaks with App Router |
| `@google/generative-ai` | `@google/genai` | Old SDK, deprecated by Google |
| `framer-motion` | `motion` (or `motion/react`) | Rebranded; new package is maintained |
| SM-2 / custom SRS | `ts-fsrs` | FSRS is ~25% more efficient |
| `localStorage` for API keys | IndexedDB (Dexie) + Web Crypto | XSS-accessible; security risk |
| Firestore for SRS computation | `ts-fsrs` client-side | Too many reads; FSRS is a client algorithm |
| `tailwindcss@3` config patterns | Tailwind v4 CSS `@theme` | v4 is a breaking change from v3 |

---

## Dev Tooling

| Tool | Purpose |
|------|---------|
| `eslint` + `@typescript-eslint/*` | Linting |
| `prettier` | Formatting |
| `biome` | Fast secondary linter (optional, can replace eslint in future) |
| `vitest` | Unit tests (FSRS logic, FuriganaEngine, SRS queue) |
| `@playwright/test` | E2E tests (reading flow, gesture simulation) |
| `lighthouse` (CLI) | CLS/LCP/FCP/INP performance audits |

---

## Project Initialization

```bash
# Initialize Next.js project
npx create-next-app@latest ./ --typescript --tailwind --app --no-src-dir --import-alias "@/*"

# Core dependencies
npm install motion gsap zustand @tanstack/react-query @tanstack/react-query-devtools

# Firebase
npm install firebase

# Dexie (IndexedDB)
npm install dexie

# PWA
npm install @serwist/next

# AI
npm install @google/genai

# FSRS
npm install ts-fsrs

# Dev tools
npm install -D vitest @playwright/test
```
