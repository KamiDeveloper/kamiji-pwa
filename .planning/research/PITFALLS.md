# KamiJi Project: Common Pitfalls & Prevention Strategy

*Research completed: 2026-04-24*

This document outlines critical technical and UX pitfalls identified during research for the KamiJi Next.js 16 PWA project.

---

## 1. PWA / Service Worker Pitfalls

### P1: Next.js 16 + Turbopack + Serwist Integration

- **Warning Signs**: Service worker fails to compile or register during development; "module not found" errors related to `@serwist/next`
- **Prevention Strategy**:
  - Serwist may have limited Turbopack support in Next.js 16. Use `next dev --webpack` if compilation issues occur in dev
  - Ensure `@serwist/next` is configured correctly in `next.config.js` with the correct `swSrc` and `swDest` paths
  - Test SW registration early in Phase 1 before adding complexity
- **Phase**: Phase 1 (Foundation & PWA Setup)

### P2: IndexedDB / Dexie.js Hydration Mismatch

- **Warning Signs**: "Hydration failed" errors in console; UI flickering between default and stored user data on load
- **Prevention Strategy**:
  - Always use `'use client'` for all components that interact with IndexedDB
  - Initialize Dexie inside `useEffect` or guard with `typeof window !== 'undefined'`
  - Use skeleton screens until client-side IndexedDB data is ready — never use server-rendered state that conflicts with local data
- **Phase**: Phase 2 (Core Data Layer)

### P3: Background Sync Reliability (Offline Progress → Firestore)

- **Warning Signs**: Changes made offline don't sync when app is closed and reopened (only syncs when app stays open)
- **Prevention Strategy**:
  - Firestore SDK uses WebSockets/gRPC which may bypass Serwist's BackgroundSyncPlugin
  - Use Firestore's built-in `enableIndexedDbPersistence` for basic offline support
  - For critical mutations (SRS state updates), use Firestore REST API via a Service Worker background sync queue as fallback
  - Store all SRS mutations locally first; sync to Firestore is best-effort
- **Phase**: Phase 2 (Data Sync Architecture)

### P4: IndexedDB Data Loss Scenarios

- **Warning Signs**: Users report losing progress after clearing browser storage; private/incognito mode shows empty state
- **Prevention Strategy**:
  - Firestore is the source of truth; IndexedDB is a local cache/queue
  - On app open, always sync from Firestore if local data is empty or stale
  - Display a warning if storage quota is low (`navigator.storage.estimate()`)
  - Explicitly tell users that incognito mode = no persistent storage
- **Phase**: Phase 2 (Data Layer)

---

## 2. Touch Gesture Pitfalls

### P5: iOS Safari Ghost Clicks & Native Context Menus

- **Warning Signs**: Unintentional taps after long-press; native iOS "Copy/Share/Define" menu appearing over custom kanji interactions
- **Prevention Strategy**:
  - Apply `-webkit-touch-callout: none; -webkit-user-select: none; user-select: none;` to all interactive kanji elements
  - Use `e.preventDefault()` on `contextmenu` and `touchstart` events for custom gesture handlers
  - Use `touch-action: pan-y` on scroll containers to allow vertical scroll but prevent other default touch behaviors on kanji
  - Add a 50ms "ghost click filter" after long-press ends (ignore click events within 50ms of pointerup after long-press)
- **Phase**: Phase 3 (Gesture System)

### P6: Scroll vs. Custom Gesture Conflict

- **Warning Signs**: Users accidentally trigger long-press when trying to scroll; tap gesture fires after scroll starts
- **Prevention Strategy**:
  - Cancel long-press detection if pointer moves > 10px vertically before 500ms threshold
  - Use `pointermove` to track movement and cancel accordingly
  - Priority order (from workflow): scroll > triple-tap > long-press+drag > long-press > single tap
  - Implement a dead zone: movements < 5px don't count as "movement"
- **Phase**: Phase 3 (Gesture System)

### P7: 300ms Tap Delay (Legacy)

- **Warning Signs**: Sluggish tap response on older Android devices or non-standard mobile browsers
- **Prevention Strategy**:
  - Ensure viewport meta includes `width=device-width` (eliminates 300ms delay in modern browsers)
  - Use `pointer` events rather than `touch` events where possible (already abstracted by Motion/React)
  - Modern browsers (2023+) have eliminated 300ms delay for pages with proper viewport meta — not a major concern but worth confirming in testing
- **Phase**: Phase 3 (Gesture System)

---

## 3. Japanese Text Rendering Pitfalls

### P8: Ruby/Furigana Layout Shift (CLS)

- **Warning Signs**: Text jumps vertically when furigana is toggled; high CLS score in Lighthouse (target: < 0.05)
- **Prevention Strategy**:
  - **Pre-reserve furigana space**: Use `visibility: hidden` (NOT `display: none`) on `<rt>` elements when hidden. This keeps the space allocated
  - Set `line-height: 2.8` (N5) down to `2.2` (N1) on reading containers — this is the primary CLS prevention
  - Use `min-height: calc(1em + var(--furigana-height))` on ruby elements
  - Use CSS variable `--furigana-height` per level (14px for N5 → 10px for N1)
  - Target CLS < 0.05 per PRD spec; test with Lighthouse regularly
- **Phase**: Phase 3 (Reading View & Furigana System)

### P9: Japanese Font Loading Performance (Noto Sans JP / Noto Serif JP)

- **Warning Signs**: Flash of Unstyled Text (FOUT) where kanji appear as tofu boxes before font loads; large initial paint time
- **Prevention Strategy**:
  - Use `next/font/google` for automatic optimization and `font-display: swap`
  - Subset fonts by JLPT level if possible (only load N5 kanji glyphs initially, load more on level-up)
  - Preload the current level's font in the HTML `<head>`
  - Cache fonts aggressively via Service Worker (they never change)
  - Test with throttled 3G network — Japanese fonts are 500KB+ even subset
- **Phase**: Phase 1 (Foundation — set up font loading correctly from day 1)

### P10: Line Breaking in Mixed Japanese/Ruby Text

- **Warning Signs**: Ruby text wrapping incorrectly across lines; kanji splitting from its furigana across line breaks
- **Prevention Strategy**:
  - Use `word-break: keep-all` on Japanese text containers — this prevents breaking at the wrong character boundaries
  - Test with multiple browser/OS combinations (Chrome, Safari, Firefox on iOS and Android)
  - Use `overflow-wrap: anywhere` as a safety fallback for very long words
- **Phase**: Phase 3 (Reading View)

---

## 4. Firebase / Security Pitfalls

### P11: BYOK API Key Exposure

- **Warning Signs**: Gemini API keys appearing in browser network logs; XSS attack surface allows key extraction
- **Prevention Strategy**:
  - Store user keys ONLY in IndexedDB (encrypted with Web Crypto API) — never in localStorage (XSS-accessible)
  - Never log API keys to console or send to any server
  - Implement strict Content Security Policy (CSP) to prevent XSS
  - Use Next.js middleware to enforce CSP headers
  - Display a security notice in UI: "Tu clave se guarda cifrada localmente"
  - Consider proxying Gemini calls through a Next.js API route (user POSTs their key + prompt; route makes the Gemini call server-side, key never logged)
- **Phase**: Phase 2 (Auth & Setup) + Phase 4 (AI Integration)

### P12: Firestore Security Rules for BYOK

- **Warning Signs**: Users can read/write other users' data; Firestore rules overly permissive
- **Prevention Strategy**:
  - Rule: `allow read, write: if request.auth.uid == resource.data.userId`
  - Never store API keys in Firestore — keep them client-side only
  - Index Firestore on `userId` for efficient per-user queries
- **Phase**: Phase 2 (Data Layer)

### P13: Firestore Read Cost Trap

- **Warning Signs**: Firestore reads accumulating rapidly for SRS computations done server-side
- **Prevention Strategy**:
  - Compute SRS schedule locally (IndexedDB + ts-fsrs) — never server-side
  - Only sync summary data to Firestore (total learned, level, streak, last sync timestamp)
  - Full SRS state lives in IndexedDB; Firestore is for backup/multi-device sync of the summary
- **Phase**: Phase 2 (Architecture Decision)

---

## 5. FSRS Implementation Pitfalls

### P14: Using SM-2 Defaults with FSRS

- **Warning Signs**: Reviews feel too frequent or too sparse; retention rates inconsistent
- **Prevention Strategy**:
  - FSRS requires its own 17 default weights (from ts-fsrs README) — do NOT use SM-2 intervals
  - Set `desiredRetention: 0.90` (as specified in PRD)
  - Use `learningSteps: [1, 10]` minutes for new cards
  - Read ts-fsrs documentation carefully before implementing
- **Phase**: Phase 2 (SRS Engine)

### P15: Overdue Card Pile-Up After User Inactivity

- **Warning Signs**: User returns after 2-week break to 200+ overdue cards → instant churn
- **Prevention Strategy**:
  - Cap daily review queue at `MAX_REVIEWS_PER_SESSION = 30` regardless of overdue count
  - Sort by urgency (lowest retrievability first) but still cap
  - Show friendly message: "Bienvenido de vuelta. Tenemos {X} kanji esperando — empecemos de a poco 🦊"
  - Do NOT punish users who were away — reduce overdue cards by spreading over multiple sessions
- **Phase**: Phase 2 (SRS Engine) + Phase 5 (UX Polish)

### P16: Timezone Drift for Daily Review Queue

- **Warning Signs**: Review cards appear at inconsistent times; users in UTC-6 get "tomorrow's" cards today
- **Prevention Strategy**:
  - Define "day boundary" as 04:00 AM local time (not UTC 00:00)
  - Store `scheduledDate` as a UTC timestamp but compare against user's local 4AM boundary
  - Always use `new Date()` from the client (not server) for scheduling decisions
- **Phase**: Phase 2 (SRS Engine)

---

## Summary: Priority Matrix

| Priority | Pitfall | Phase |
|----------|---------|-------|
| 🔴 CRITICAL | P8: Ruby CLS (hard to retrofit) | Phase 1+3 |
| 🔴 CRITICAL | P9: Font loading (affects FCP/LCP) | Phase 1 |
| 🔴 CRITICAL | P2: IndexedDB hydration mismatch | Phase 2 |
| 🔴 CRITICAL | P11: BYOK key security | Phase 2+4 |
| 🟡 HIGH | P5: iOS ghost clicks | Phase 3 |
| 🟡 HIGH | P6: Scroll/gesture conflict | Phase 3 |
| 🟡 HIGH | P14: FSRS wrong defaults | Phase 2 |
| 🟡 HIGH | P15: Overdue card pile-up | Phase 2 |
| 🟢 MEDIUM | P1: Serwist/Turbopack | Phase 1 |
| 🟢 MEDIUM | P3: Background sync | Phase 2 |
| 🟢 MEDIUM | P13: Firestore cost | Phase 2 |
| 🟢 MEDIUM | P16: Timezone drift | Phase 2 |
