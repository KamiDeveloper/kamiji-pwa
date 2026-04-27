# ROADMAP: KamiJi (神字) — v1.0

**Milestone:** v1.0 — Core Reading Experience
**Goal:** Deliver a fully functional PWA that lets Spanish-speaking adults learn Japanese kanji through immersive, gesture-based reading with FSRS spaced repetition.
**Target:** ~6 phases → Production-ready PWA for N5 level

---

## Phase 1: Foundation, PWA & Theme System

**Goal:** Scaffold the Next.js 16 project with all tooling, configure PWA infrastructure, establish the 5-level CSS theme system, and wire up Firebase Auth (Google Sign-In).

**Delivers:**
- Working Next.js 16 app on Vercel with Tailwind 4, TypeScript, ESLint/Prettier/Biome
- Firebase Google Sign-In working end-to-end
- Serwist service worker registered; app installable; offline fallback page functional
- Dexie.js schema v1 defined (all tables: kanji, dictionary, aiCache, userProgress, storyProgress)
- CSS theme system: `data-level` attribute on `<html>` drives all 5 JLPT visual themes (N5→N1) via CSS custom properties (colors, fonts, border-radius, furigana sizing)
- Japanese fonts loaded and cached: Noto Sans JP (N5/N4), Zen Maru Gothic (N3), EB Garamond (N2), Shippori Mincho (N4/N1)
- Ruby/furigana base CSS: pre-reserved space via `visibility:hidden` + `min-height`, anti-CLS pattern established
- Global layout: root layout, navigation shell, bottom tab bar (Home/Leer/Repaso/Stats/Prefs)
- Zustand store setup: `currentLevel`, `theme`, `user`, `isOffline`
- ThemeProvider client component applies `data-level` to `<html>` based on stored level

**Key pitfalls addressed:**
- P8 (Ruby CLS): Furigana space pre-reserved from day 1 — impossible to retrofit
- P9 (Font loading): next/font/google configured with display:swap and preload
- P1 (Serwist/Turbopack): Serwist configured correctly; SW disabled in dev mode

**Requirements covered:** AUTH-01, AUTH-02, AUTH-05, AUTH-06, PWA-01, PWA-02

**UAT Criteria:**
- [ ] `npm run build && npm start` produces a working app with no TS/lint errors
- [ ] Visiting `/login` shows Google Sign-In button; auth completes and routes to `/`
- [ ] Lighthouse PWA audit passes (installable badge)
- [ ] App shows offline fallback page when network is disconnected
- [ ] `document.documentElement.dataset.level = 'n4'` swaps all colors, fonts, and radii correctly
- [ ] Furigana test: `<ruby>食<rt class="furigana">た</rt></ruby>` — toggling `.visible` class does NOT cause layout shift (Lighthouse CLS = 0)
- [ ] Font loads without FOUT on throttled 3G (test in DevTools)

**Depends on:** Nothing (greenfield start)
**Estimated complexity:** Medium

---

## Phase 2: Data Layer & SRS Engine

**Goal:** Build the offline data foundation — dictionary import, FSRS v4 implementation, kanji state machine, daily review queue, and Firestore sync service.

**Delivers:**
- Dictionary import pipeline: JMdict-ES + KANJIDIC2-ES JSON files (partitioned by JLPT level) → IndexedDB via Dexie.js; loaded on first app launch per level
- `ts-fsrs` integrated as the SRS algorithm: `desiredRetention: 0.90`, learning steps `[1, 10]` minutes
- Kanji state machine: `createKanji()`, `processReview(rating)`, `getKanjiState()` service functions
- Daily review queue computation: filters kanji by `scheduledDate ≤ today (4AM boundary)`, sorts by urgency, caps at 30 + 5 new
- Firestore sync service: writes summary data to Firestore (level, totalLearned, streak, lastSync); reads on login for restoration
- BYOK key encryption: Web Crypto API (`AES-GCM`) to encrypt/decrypt Gemini API key stored in IndexedDB; never in Firestore or localStorage
- `useKanjiStore` Zustand slice: kanjiState, learnKanji, reviewKanji, getDailyQueue
- `useDictionary` hook: query IndexedDB for a kanji's readings + meanings + examples
- Progress computation service: `computeLevelProgress(userId)` → `{ coverage: number, retention: number, canLevelUp: boolean }`
- Welcome-back handling: if user inactive >7 days, show friendly message; spread overdue cards

**Key pitfalls addressed:**
- P2 (IndexedDB hydration): All Dexie usage is client-only with `'use client'` guards
- P11 (BYOK key security): Web Crypto AES-GCM encryption; key never leaves IndexedDB
- P12 (Firestore rules): Rules enforce `auth.uid == resource.data.userId`
- P13 (Firestore cost): FSRS computation is 100% client-side; only summary synced
- P14 (FSRS defaults): ts-fsrs used with correct FSRS weights, not SM-2
- P15 (Overdue pile-up): Queue capped at 30; spread logic for returning users
- P16 (Timezone drift): Day boundary at 04:00 local time

**Requirements covered:** DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06, SRS-01, SRS-02, SRS-03, SRS-04, SRS-07, SRS-08, SRS-09

**UAT Criteria:**
- [ ] `db.dictionary.where('level').equals('n5').count()` returns > 100 entries after first load
- [ ] Creating a new card with `createEmptyCard()` and calling `processReview(Rating.Good)` updates `due` date correctly
- [ ] Daily queue returns ≤ 30 cards, with overdue first and new cards capped at 5
- [ ] Gemini API key encrypted: value stored in IndexedDB is NOT the plaintext key
- [ ] Firestore document at `users/{uid}/progress` reflects correct level and totalLearned after study session
- [ ] `computeLevelProgress` returns correct coverage and retention for a known test state
- [ ] After simulating 10 days offline, `getDailyQueue()` returns ≤ 30 cards (not 500)

**Depends on:** Phase 1
**Estimated complexity:** High

---

## Phase 3: Reading Core, Gesture System & Furigana Engine

**Status:** 🔄 In Progress — Plan 01 ✅ complete (Furigana Engine & Text Renderer)

**Plan Progress:**
| Plan | Title | Status |
|------|-------|--------|
| 03-01 | Furigana Engine & Japanese Text Renderer | ✅ Complete — `b74be59` |
| 03-02 | Gesture System | ⬜ Not started |
| 03-03 | Translation Panel | ⬜ Not started |

**Goal:** Build the heart of KamiJi — the reading view with all 7 gestures, the 3-layer furigana/translation engine, and the Translation Panel. This is the highest-complexity phase.

**Delivers:**
- `JapaneseTextRenderer` component: parses story text into React ruby elements; kanji tagged as `data-kanji`, `data-learned`
- `RubyKanji` component: individual `<ruby>` element with pre-reserved furigana space; interactive via pointer events
- `useGestureSystem` hook: unified Pointer Events handler implementing all 7 gestures with correct priority chain:
  1. **La Chuleta** (tap < 300ms): reveals furigana on tapped kanji for 5s (configurable)
  2. **Chuleta Global** (triple tap < 600ms window): reveals all furigana for 60s (configurable)
  3. **El Rayo X** (long-press ≥ 500ms): opens Translation Panel for tapped kanji
  4. **Subrayado X-Ray** (long-press + horizontal drag): selects range of kanji for group translation
  5. **Scan / Rastrear** (long-press confirmed + drag): each kanji entered reveals furigana + haptic
  6. **Zoom Kanji** (tap on kanji inside Panel): expands full kanji detail view
  7. **Swipe Right / Left** (swipe on Panel): mark learned / mark for review
- Ghost click prevention (50ms filter after long-press)
- iOS safari `-webkit-touch-callout: none` + contextmenu prevention
- Scroll-gesture priority: vertical scroll > 10px cancels all gestures
- `FuriganaEngine` service: 3-layer resolution with caching
  - Layer 1: `DictionaryLayer.lookup(kanji)` → Dexie.js IndexedDB query (< 5ms)
  - Layer 2: `GeminiLayer.query(kanji, context, level, userKey)` → @google/genai API call with retry/backoff
  - Layer 3: Heuristic fallback (romanization)
- `CacheLayer`: Dexie.js `aiCache` table keyed by `${text}:${context}:${level}`; TTL 30 days
- `TranslationPanel` component: fixed bottom sheet overlay (never pushes content), animated with Motion, backdrop blur
- `KanjiDetail` view inside panel: character, furigana, meanings (ES), onyomi/kunyomi, example sentence with translation
- All 7 error states for AI failures (rate limit, invalid key, broken response, offline) with dictionary fallback
- `ReadingView` screen: header, paginated text area, page dots, footer (kanji summary)
- Swipe horizontal for page navigation (debounced, distinct from gesture system)

**Key pitfalls addressed:**
- P5 (iOS ghost clicks): 50ms post-longpress filter + `-webkit-touch-callout: none`
- P6 (Scroll vs gesture): scroll priority enforcement at gesture handler level
- P8 (Ruby CLS): `visibility: hidden` (never `display: none`) on `<rt>` elements throughout

**Requirements covered:** READ-04, READ-05, READ-06, READ-07, READ-08, READ-09, GESTURE-01–11, ENGINE-01–06, PERF-01, PERF-02, PERF-05, PERF-06

**UAT Criteria:**
- [ ] Tapping a kanji reveals its furigana; exactly 1 kanji is targeted (not neighbors); furigana auto-hides after 5s
- [ ] Triple-tap reveals ALL furigana in the current page; auto-hides after 60s
- [ ] Long-press (500ms hold) opens Translation Panel with correct Spanish meaning for tapped kanji
- [ ] Long-press + horizontal drag selects a range of kanji; panel shows group translation
- [ ] Swipe right on panel marks kanji as learned (FSRS state changes from NEW to LEARNING)
- [ ] Vertical scroll works normally without triggering gestures
- [ ] Tapping a kanji in the panel opens Zoom Kanji detail view
- [ ] With no Gemini key, all interactions fall back to dictionary and display gracefully (no broken UI)
- [ ] With invalid Gemini key, user sees "Tu clave de Gemini parece no funcionar 🔑" message
- [ ] Lighthouse: CLS < 0.05, INP < 100ms after gesture interaction
- [ ] FPS stays ≥ 58 during furigana reveal animation (Chrome Performance panel)
- [ ] Zero reflows per gesture interaction (no layout-triggering CSS properties animated)

**Depends on:** Phase 1, Phase 2
**Estimated complexity:** Very High

---

## Phase 4: Home Screen, Story System & Progression

**Goal:** Build the complete story discovery system, Home screen with adaptive content, level progression logic, metamorphosis ceremony, gamification, and Stats screen.

**Delivers:**
- Story data model (Firestore collection): `{ id, level, title, titleEs, difficulty, pages: [], requiredKanji, unlockAt, emoji }`
- N5 story content: minimum 5 stories (hand-authored with Gemini assistance) covering all core N5 kanji themes
- Story unlock system: first 3 always unlocked; subsequent unlock at kanji-learned milestones
- `StoryList` screen (📖 Leer tab): filterable list (All/In Progress/New/Completed) with story cards
- `HomeScreen` (🏠 Home tab): adaptive layout with contextual greeting, "Continuar Leyendo" card, review card, available stories, recent achievements
- Adaptive Home behavior: review card pulses and moves first if pending; streak-danger banner; API key missing banner
- Level progress computation: uses `computeLevelProgress()` from Phase 2; exposed in global progress bar
- Level-up trigger: detects when coverage = 100% AND retention ≥ 80%; triggers ceremony
- Level-up ceremony screen: stats summary (kanji, stories, time, streak), new level preview, metamorphosis animation (GSAP timeline driving CSS variable transitions), then theme swap
- Streak system: `checkDailyActivity()` marks a day active; streak tracked in IndexedDB + Firestore; `checkStreakFreeze()` auto-applies freeze when needed
- Badge/achievement system: `checkBadges(event)` triggered after any study action; unlocks badges, triggers micro-animations
- XP system: award XP per action table (PRD §15.4); displayed in stats
- Kami-chan mascot integration: appears on badge unlocks, streak milestones, welcome-back
- `ProgressScreen` (📊 Stats tab): level bars, weekly heatmap, overall stats, streak, badge grid (locked show as "????")
- `useDailyProgress` hook: manages study activity tracking for streak purposes

**Requirements covered:** READ-01, READ-02, READ-03, LEVEL-01–07, GAME-01–07, STATS-01–04, AUTH-03 (partial — level selection routed here)

**UAT Criteria:**
- [ ] Home screen shows correct greeting based on time of day
- [ ] Story list correctly filters to "In Progress" stories for the current user
- [ ] Story 4 is locked; shows "Desbloquea con 50 kanji" message with correct remaining count
- [ ] Completing a story page awards correct XP and updates progress bar
- [ ] Streak increments correctly; studying > 1 day in a row shows streak counter
- [ ] Streak freeze auto-applies on inactive day if freeze is available; notification appears next login
- [ ] Completing all N5 kanji with ≥80% retention shows level-up ceremony (can be triggered manually for testing)
- [ ] Level-up metamorphosis animation plays, then app reloads with N4 theme applied globally
- [ ] "Primer Trazo" badge unlocks after marking first kanji as learned; animation plays
- [ ] Stats screen shows correct coverage bar %, retention bar %, and weekly heatmap
- [ ] Locked badges show "????" with correct category icon

**Depends on:** Phase 2, Phase 3
**Estimated complexity:** High

---

## Phase 5: Onboarding, Review Session, Settings & Notifications

**Goal:** Complete the full user lifecycle — first-run onboarding flow, SRS review session UI, comprehensive Settings screen, and Web Push notification system.

**Delivers:**
- **Welcome carousel** (3 slides, first-run only): swipeable, skip button, "Comenzar" on last slide; Kami-chan illustrations
- **Setup wizard** (3 steps): Step 1: Nickname input + kana verification; Step 2: Gemini API key input (+ inline tutorial collapsable, link to AI Studio, "Skip" option); Step 3: JLPT level selection (5 visual cards with descriptions)
- **Donation ask screen** (single occurrence after setup): Kami-chan with coffee cup, soft CTA, no pressure
- **Review Session screen** (🔄 Repaso tab): flashcard UI with context sentence, "Mostrar respuesta" toggle, 4 rating buttons (Otra vez/Difícil/Bien/Fácil), progress bar, session completion summary
- **Settings screen** (⚙ Prefs tab): all 12 settings (SETTINGS-01 to SETTINGS-12):
  - Profile (nickname edit)
  - API key (update, status display, link to AI Studio)
  - Appearance (unlocked N3+)
  - Reading defaults (furigana mode, text size, auto-hide timers)
  - Kami-chan visibility
  - Sound & haptics
  - Notifications (enable, time, frequency, tone)
  - Data (export JSON, reset level, full reset)
  - Support (donation link)
  - About (version, credits including JMdict/KANJIDIC2/Jitendex attribution, privacy, terms, sign out)
- **Push notifications** (Web Push API + Service Worker):
  - Permission request after 3rd study session
  - Daily reminder (configurable time, 3 tone variants)
  - Streak-danger alert (2h before midnight)
  - Milestone celebration (only when app is not open)
  - Weekly summary (opt-in)
  - Anti-spam rules: max 1/day, cooldown, escalating inactivity logic
- **All error/empty/offline states**:
  - Offline screen (shows available offline features)
  - Generic error screen (with error code + retry)
  - Empty states (no stories, no review cards, no badges yet, no weekly activity)
  - API key missing / rate limit / invalid key / broken response states
- **Level-up screen states**: "Coverage 100% but retention < 80%" message with progress breakdown

**Requirements covered:** AUTH-03, AUTH-04, AUTH-05, AUTH-06, NOTIF-01–07, SETTINGS-01–12, SRS-05, SRS-06, PWA-03, PWA-04, PWA-05

**UAT Criteria:**
- [ ] Welcome carousel shows only on first login; Skip button works; swiping between slides works
- [ ] Setup wizard completes all 3 steps; API key is stored encrypted; level is set correctly
- [ ] Donation screen appears once after setup; never shows again
- [ ] Review session shows 1 kanji at a time; "Mostrar respuesta" reveals answer; rating updates FSRS state
- [ ] "Otra vez" rating on a card brings it back in the same session
- [ ] Session completion summary shows breakdown by rating type and retention %
- [ ] Settings: nickname update persists after app reload
- [ ] Settings: API key change persists and new key is used on next Gemini call
- [ ] Settings: furigana mode "Always visible" causes furigana to show on all kanji without tapping
- [ ] Push notification permission prompt appears on 3rd study session (not 1st or 2nd)
- [ ] Notification received at correct configured time on a day with no study
- [ ] Offline screen shown when airplane mode enabled; dictionary Chuleta still works offline

**Depends on:** Phase 3, Phase 4
**Estimated complexity:** High

---

## Phase 6: Polish, Performance Audit & Launch Prep

**Goal:** Close all performance gaps, harden security and reliability, run the full test suite, and prepare for production launch.

**Delivers:**
- **Lighthouse performance audit** meeting all PERF requirements:
  - CLS < 0.05 (furigana + translation panel transitions)
  - INP < 100ms (gesture response times)
  - FCP < 1.5s (skeleton screens, font preload)
  - LCP < 2.5s (critical path optimization)
- **Animation audit**: Chrome Performance panel confirms ≥ 58fps for all animations; remove any `width/height/top/left` transitions
- **Security audit**:
  - Content Security Policy (CSP) headers via Next.js middleware
  - API key never appears in network logs, console, or Firestore
  - BYOK: prompt injection review (sanitize user-selected text before AI)
  - Firestore security rules review
- **Test suite**:
  - Vitest unit tests: FSRS state machine, FuriganaEngine (all 3 layers), gesture detection logic, daily queue computation, streak tracking, badge triggers
  - Playwright E2E: full reading flow (login → select story → tap kanji → long-press → swipe to learn → complete page), full review session, level-up ceremony trigger
- **Accessibility audit**:
  - All interactive elements have ARIA labels
  - Keyboard navigation works for desktop users (gestures have button alternatives)
  - `prefers-reduced-motion` disables all non-essential animations
- **Dictionary credits**: JMdict, KANJIDIC2, Jitendex attribution verified in About screen per license terms
- **PWA install prompt** optimization: beforeinstallprompt handled gracefully; install banner shown at right moment (not immediately)
- **Vercel production deployment**: environment variables configured, preview deploys working, Analytics enabled
- **Mobile device testing**: tested on iOS Safari 17+, Chrome Android, Samsung Internet
- **Final content QA**: all 5 N5 stories reviewed for accuracy, kanji tagging verified

**Requirements covered:** PERF-01–06, all UAT criteria from previous phases re-verified, PWA-01, DATA-06

**UAT Criteria:**
- [ ] Lighthouse audit (mobile, production build): CLS < 0.05, FCP < 1.5s, LCP < 2.5s, PWA badge ✓
- [ ] Chrome Performance panel: furigana reveal animation shows 0 layout operations, ≥ 58fps
- [ ] Playwright E2E: full reading flow passes without flakiness on 3 consecutive runs
- [ ] Vitest: all unit tests pass (FSRS, engine, gestures, SRS queue, streaks)
- [ ] Network tab (DevTools): no Gemini API key appears in any request URL or header
- [ ] `prefers-reduced-motion: reduce` disables all particle/transition animations
- [ ] App is installable via Chrome "Add to Home Screen" on Android and iOS
- [ ] All 5 N5 stories load correctly; all kanji are tagged and interactive
- [ ] Vercel production URL is live; no console errors in production

**Depends on:** Phase 5
**Estimated complexity:** Medium-High

---

## Milestone Summary

| Phase | Focus | Requirements | Complexity |
|-------|-------|-------------|------------|
| **1** | Foundation, PWA, Themes, Auth | AUTH-01/02/05/06, PWA-01/02 | Medium |
| **2** | Data Layer, FSRS, Sync, BYOK | DATA-01–06, SRS-01–04/07–09 | High |
| **3** | Reading View, Gestures, Engine | READ-04–09, GESTURE-01–11, ENGINE-01–06 | Very High |
| **4** | Stories, Home, Progression, Gamification | READ-01–03, LEVEL-01–07, GAME-01–07, STATS-01–04 | High |
| **5** | Onboarding, Review, Settings, Notifications | AUTH-03/04, SRS-05/06, SETTINGS-01–12, NOTIF-01–07 | High |
| **6** | Polish, Performance, Tests, Launch | PERF-01–06, all phases re-verified | Medium-High |

**Total v1 requirements: 79 | Mapped to phases: 79 | Unmapped: 0 ✓**

---
*Roadmap created: 2026-04-24*
*Milestone: v1.0 Core Reading Experience*
*Next action: `/gsd-plan-phase 1`*
