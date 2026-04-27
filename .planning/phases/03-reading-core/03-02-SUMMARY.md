---
phase: 3
plan: "02"
slug: gesture-system-translation-panel
subsystem: reading-core
tags: [gestures, pointer-events, bottom-sheet, glassmorphism, motion, translation-panel, kanji-detail]
dependency_graph:
  requires:
    - hooks/useGestureSystem.ts (produced here)
    - lib/engine/types.ts (TranslationResult, EngineError)
    - components/reading/RubyKanji.tsx (data-kanji attribute consumer)
    - app/assets/icons/TranslationPanelTabsIcons.tsx (TabSignificadoIcon, TabLecturaIcon, TabCompuestosIcon)
    - public/images/kami-chan-error.png (error illustration)
  provides:
    - hooks/useGestureSystem.ts (useGestureSystem, GestureCallbacks)
    - components/reading/TranslationPanel.tsx (TranslationPanel, TranslationPanelProps)
    - components/reading/KanjiDetail.tsx (KanjiDetail, KanjiDetailProps)
    - components/reading/index.ts (barrel export)
  affects:
    - Any reading view that integrates the gesture system and translation panel
tech_stack:
  added:
    - "motion v12.38.0 (already in package.json) — imported from motion/react"
  patterns:
    - "Pointer Events API (not TouchEvents) for cross-platform gesture detection"
    - "Triple-tap detection with 600ms reset timer"
    - "Long-press 500ms + scroll-cancellation at 10px/100ms"
    - "Ghost-click guard 50ms after long-press end"
    - "Spring animation: damping 25, stiffness 200 (per 03-CONTEXT.md)"
    - "Glassmorphism: backdrop-filter blur(8px) + color-mix(surface 95%, transparent)"
    - "Horizontal swipe > 80px on panel → learned / review"
    - "KanjiDetail slides up from panel (y:100% → 0) at z-index 60"
key_files:
  created:
    - hooks/useGestureSystem.ts
    - components/reading/TranslationPanel.tsx
    - components/reading/KanjiDetail.tsx
    - components/reading/index.ts
decisions:
  - "Imported from motion/react (not framer-motion) — package.json has motion v12, not framer-motion"
  - "Used ReactElement (from react) instead of JSX.Element — React 19 TS compat (no JSX namespace)"
  - "GestureCallbacks.onRayoX includes HTMLElement ref for future anchor/positioning of panel"
  - "TranslationPanel onSwipeRight/onSwipeLeft receive kanji string for direct state updates"
  - "color-mix(in srgb, var(--color-surface) 95%, transparent) used for panel glass background"
  - "shimmer @keyframes injected inline via <style> tag in TranslationPanel — avoids globals.css pollution"
  - "KanjiDetail supports swipe-down-to-close (dy > 80px) as primary close gesture"
  - "iOS contextmenu suppression: e.preventDefault() when target.closest('[data-kanji]')"
  - "Ghost click guard uses capture-phase click listener for reliable interception"
metrics:
  duration: "~30 minutes"
  completed: "2026-04-27"
  tasks: 4
  files_created: 4
  files_modified: 0
---

# Phase 3 Plan 02: Gesture System & Translation Panel — Summary

**One-liner:** 7-gesture PointerEvents hook (scroll priority, ghost-click guard, iOS callout suppression) + glassmorphism bottom-sheet TranslationPanel (motion/react spring) + KanjiDetail full-screen overlay.

---

## Files Created

| File | Description |
|------|-------------|
| `hooks/useGestureSystem.ts` | `useGestureSystem` hook — GESTURE-01→05, GESTURE-09→11. Single tap, triple tap, long-press, scan drag, scroll cancel, ghost-click guard, contextmenu prevention. |
| `components/reading/TranslationPanel.tsx` | Fixed bottom sheet. `AnimatePresence` + spring slide-up. 3 tabs (Significado/Lectura/Compuestos), loading shimmer, per-type error states with Kami-chan illustration, horizontal swipe >80px → mark learned/review. |
| `components/reading/KanjiDetail.tsx` | Full-screen overlay at z-60. 96px kanji glyph, onyomi/kunyomi chips, example sentence, compuestos list, stroke-order placeholder. Swipe-down-to-close. |
| `components/reading/index.ts` | Barrel re-export of all 4 reading components + prop types. |

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] JSX.Element namespace not available in React 19 TypeScript**
- **Found during:** TypeScript check after all tasks
- **Issue:** `type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element` → `Cannot find namespace 'JSX'`
- **Fix:** Changed to `ReactElement` imported from `react`
- **Files modified:** `components/reading/TranslationPanel.tsx`
- **Commit:** `d89e612`

### Intentional Adjustments

- **GestureCallbacks interface:** Added `el: HTMLElement` param to `onRayoX` (vs. prompt spec) — enables future panel positioning anchored to the tapped kanji element. Aligns with the full plan spec which also includes it.
- **TranslationPanel prop name:** Used `translation` instead of `result` for clarity (the prop represents the full translation result, not a generic result). The plan spec used both names; `translation` is more expressive.

---

## TypeScript Result

`npx tsc --noEmit` — **0 errors** ✅

---

## Self-Check

- [x] `hooks/useGestureSystem.ts` — FOUND
- [x] `components/reading/TranslationPanel.tsx` — FOUND
- [x] `components/reading/KanjiDetail.tsx` — FOUND
- [x] `components/reading/index.ts` — FOUND
- [x] Commits `a842332`, `225b353`, `dba23e6`, `ded3d51`, `d89e612` — all in `git log`

## Self-Check: PASSED
