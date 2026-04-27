---
phase: 3
plan: "03"
slug: reading-view-page-navigation
subsystem: reading-core
tags: [reading-view, page-navigation, reading-session, srs, fsrs, gestures, translation-panel, kanji-detail, hooks]
dependency_graph:
  requires:
    - hooks/useGestureSystem.ts (GestureCallbacks, useGestureSystem)
    - components/reading/JapaneseTextRenderer.tsx (JapaneseTextRenderer)
    - components/reading/TranslationPanel.tsx (TranslationPanel)
    - components/reading/KanjiDetail.tsx (KanjiDetail)
    - lib/db.ts (KamiJiDatabase, db singleton, KanjiRecord)
    - lib/srs/fsrs.ts (createKanji, processReview, Rating)
    - lib/engine/furigana-engine.ts (furiganaEngine singleton)
    - lib/engine/types.ts (TranslationResult, EngineError, JLPTLevel)
  provides:
    - hooks/usePageNavigation.ts (usePageNavigation)
    - hooks/useReadingSession.ts (useReadingSession)
    - components/reading/ReadingHeader.tsx (ReadingHeader)
    - components/reading/KanjiSummaryFooter.tsx (KanjiSummaryFooter)
    - components/reading/PageIndicator.tsx (PageIndicator)
    - components/reading/ReadingView.tsx (ReadingView, Story)
    - components/reading/ReadingViewClient.tsx (ReadingViewClient)
    - app/(app)/read/[storyId]/page.tsx (ReadingPage — Server Component)
    - app/(app)/read/page.tsx (story list with demo link)
    - components/reading/index.ts (updated barrel export)
  affects:
    - app/(app)/read/page.tsx (updated from placeholder to story list)
tech_stack:
  added: []
  patterns:
    - "Horizontal swipe pagination: 100px threshold, <30° angle, 300ms debounce"
    - "useRef debounce flag (not setTimeout-based) to prevent multi-page jumps"
    - "Per-kanji auto-hide furigana timer (5s) via Map<string, ReturnType<typeof setTimeout>>"
    - "Global furigana auto-hide (60s) via single ref timer"
    - "SRS get-or-create pattern: lookup by kanjiChar then createKanji if missing"
    - "State.New = 0 filter to derive learnedKanji Set from IndexedDB on mount"
    - "AnimatePresence from motion/react (not framer-motion) — consistent with Wave 2"
    - "Ref callback pattern (ref={(el) => { containerRef.current = el; }}) to satisfy useGestureSystem RefObject<HTMLElement | null>"
    - "countKnownKanji/countNewKanji inline regex helpers for per-page summary"
    - "Next.js 16: async params (Promise<{storyId}>) in Server Component"
key_files:
  created:
    - hooks/usePageNavigation.ts
    - hooks/useReadingSession.ts
    - components/reading/ReadingHeader.tsx
    - components/reading/KanjiSummaryFooter.tsx
    - components/reading/PageIndicator.tsx
    - components/reading/ReadingView.tsx
    - components/reading/ReadingViewClient.tsx
    - app/(app)/read/[storyId]/page.tsx
  modified:
    - app/(app)/read/page.tsx
    - components/reading/index.ts
decisions:
  - "Used furiganaEngine.getTranslation() (not resolve()) for openRayoX — richer TranslationResult shape needed by TranslationPanel"
  - "Rating.Good (3) for markLearned, Rating.Again (1) for markToReview — matches ts-fsrs v5 enum values"
  - "State.New === 0 check on fsrsState.state field to identify unlearned kanji in IndexedDB"
  - "Demo story id is 'demo-n5' with 3 N5 pages in {漢字|かんじ} format"
  - "onSubrayado (not onSubrayadoX) — matched actual GestureCallbacks interface from Wave 2"
  - "TranslationPanel prop is 'translation' (not 'result') — matched actual prop from Wave 2"
  - "containerRef typed as RefObject<HTMLElement | null> using ref callback to avoid HTMLDivElement/HTMLElement mismatch"
  - "touchAction: pan-y on text container — browser handles vertical scroll, pointer-up catches horizontal swipes"
  - "Story list page shows Link card to demo-n5 (not redirect) — cleaner UX for Phase 4 catalog expansion"
metrics:
  duration: "~35 minutes"
  completed: "2026-04-27"
  tasks: 8
  files_created: 8
  files_modified: 2
---

# Phase 3 Plan 03: Reading View & Page Navigation — Summary

**One-liner:** Full reading experience: `usePageNavigation` (swipe pagination, 100px/30°/300ms) + `useReadingSession` (furigana timers, FSRS SRS) + 4 UI components (Header, Footer, Indicator, ReadingView) + dynamic `/read/[storyId]` route with N5 demo story.

---

## What Was Built

### Hooks

**`hooks/usePageNavigation.ts`**
- Props: `pages`, `initialPage`, `onPageChange`, `isPanelOpen`
- Swipe detection: pointer events, >100px horizontal, angle <30°, 300ms debounce via `useRef`
- Returns `bindSwipe` (React pointer handlers) for spreading onto the text container
- `goNext/goPrev/goTo` bounded at `[0, pages.length-1]`

**`hooks/useReadingSession.ts`**
- Loads `learnedKanji` from IndexedDB on mount (filters `fsrsState.state !== 0`)
- `showChuleta(kanji)`: adds to `visibleFurigana`, auto-hides after 5s via per-kanji timer Map
- `showChuletaGlobal()`: sets `allFuriganaVisible = true`, auto-hides after 60s
- `openRayoX(kanji)`: calls `furiganaEngine.getTranslation()`, sets loading/result/error state
- `markLearned/markToReview`: get-or-create kanji record in DB, call `processReview(id, Rating.Good|Again)`, update `learnedKanji` set
- `openKanjiDetail/closeKanjiDetail`: controls `kanjiDetailOpen` state

### Components

**`ReadingHeader`** — Sticky (z:40), 56px, blur backdrop, back button + title (≤20 chars) + page counter  
**`KanjiSummaryFooter`** — Fixed above BottomNav (bottom:64px, z:30), known (green dot) / new (primary dot) counts  
**`PageIndicator`** — Dot row (≤10 pages) or `{n}/{total}` text indicator  
**`ReadingView`** — Full integration: session + navigation + gesture system + JapaneseTextRenderer + AnimatePresence for TranslationPanel and KanjiDetail overlays

### Routes

- `app/(app)/read/[storyId]/page.tsx` — Async Server Component, awaits `params`
- `app/(app)/read/page.tsx` — Story list with link card to `demo-n5`
- `components/reading/ReadingViewClient.tsx` — Client wrapper with `resolveStory()` and `useRouter().back()`

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Correction] Callback name onSubrayado (not onSubrayadoX)**
- **Found during:** Task 6 — ReadingView implementation
- **Issue:** Plan referenced `onSubrayadoX` but actual `GestureCallbacks` interface (from Wave 2) uses `onSubrayado`
- **Fix:** Used correct name `onSubrayado` in `ReadingView.tsx`
- **Files modified:** `components/reading/ReadingView.tsx`

**2. [Rule 1 - Correction] TranslationPanel prop 'translation' (not 'result')**
- **Found during:** Task 6 — ReadingView implementation
- **Issue:** Plan used `result={session.translationResult}` but actual prop is `translation`
- **Fix:** Used `translation={session.translationResult}`
- **Files modified:** `components/reading/ReadingView.tsx`

**3. [Rule 2 - Enhancement] countKnownKanji added as 3rd helper**
- **Found during:** Task 6 — `KanjiSummaryFooter` requires `knownKanji` count
- **Issue:** Plan only specified `countKanjiInText` and `countNewKanji`; `knownKanji` was computed inline (confusingly)
- **Fix:** Added explicit `countKnownKanji(text, learned)` helper for clarity
- **Files modified:** `components/reading/ReadingView.tsx`

**4. [Rule 1 - Correction] containerRef typed as HTMLElement via ref callback**
- **Found during:** Task 6 — `useGestureSystem` expects `RefObject<HTMLElement | null>`
- **Issue:** `useRef<HTMLDivElement | null>(null)` type conflicts with `RefObject<HTMLElement | null>` parameter
- **Fix:** Used ref callback `ref={(el) => { containerRef.current = el; }}` with `useRef<HTMLElement | null>(null)`
- **Files modified:** `components/reading/ReadingView.tsx`

---

## Known Stubs

| Stub | File | Reason |
|------|------|--------|
| `resolveStory()` returns demo story for all unknown IDs | `ReadingViewClient.tsx` | Phase 4 will introduce Firestore story catalogue |
| Demo story has 3 hardcoded N5 pages | `ReadingViewClient.tsx` | Phase 4 will load real story content |

---

## TypeScript Result

```
npx tsc --noEmit — 0 errors, 0 warnings
```

---

## Self-Check

### Files created:
- [x] `hooks/usePageNavigation.ts`
- [x] `hooks/useReadingSession.ts`
- [x] `components/reading/ReadingHeader.tsx`
- [x] `components/reading/KanjiSummaryFooter.tsx`
- [x] `components/reading/PageIndicator.tsx`
- [x] `components/reading/ReadingView.tsx`
- [x] `components/reading/ReadingViewClient.tsx`
- [x] `app/(app)/read/[storyId]/page.tsx`

### Commits:
- `746ceaf` — feat(03-03): usePageNavigation hook
- `07d6a1a` — feat(03-03): useReadingSession hook
- `b135785` — feat(03-03): ReadingHeader component
- `c1c1b69` — feat(03-03): KanjiSummaryFooter
- `96d77f7` — feat(03-03): PageIndicator
- `66451bf` — feat(03-03): ReadingView
- `99bbf85` — feat(03-03): reading page route
- `a55d7f0` — feat(03-03): update reading components index

## Self-Check: PASSED
