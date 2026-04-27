# STATE: KamiJi (神字)

**Status:** Phase 3 In Progress
**Current milestone:** v1.0 — Core Reading Experience
**Last updated:** 2026-04-27 — Phase 3 Plan 01 complete (Furigana Engine & Text Renderer)

---

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-04-24)

**Core value:** A user can tap any kanji in a real Japanese story and instantly get its reading and meaning — then mark it as learned in a single gesture — without ever leaving the reading experience.

**Current focus:** Phase 3 — Reading Core, Gestures & Furigana Engine (Plan 01 ✅)

---

## Phase Progress

| Phase | Name | Status | Artifacts |
|-------|------|--------|-----------|
| **1** | Foundation, PWA & Theme System | ✅ Complete (6/6) | RESEARCH, CONTEXT, VALIDATION, 6×PLAN, 6×SUMMARY |
| **2** | Data Layer & SRS Engine | ✅ Executed | CONTEXT, ASSETS, UI-SPEC, 3xPLAN, 3xSUMMARY |
| **3** | Reading Core, Gestures & Furigana Engine | 🔄 In Progress (1/? plans) | CONTEXT, 03-01-PLAN, 03-01-SUMMARY |
| **4** | Home, Stories & Progression | ⬜ Not Started | — |
| **5** | Onboarding, Review, Settings & Notifications | ⬜ Not Started | — |
| **6** | Polish, Performance & Launch Prep | ⬜ Not Started | — |

---

## Initialization Log

- `2026-04-24` — Project initialized from `docs/KamiJi-PRD_Full.md` (4,107 lines, 257KB)
- `2026-04-24` — Git repository initialized
- `2026-04-24` — `.planning/config.json` created (mode: yolo, granularity: standard)
- `2026-04-24` — `.planning/PROJECT.md` created (scope, decisions, constraints)
- `2026-04-24` — Research artifacts created:
  - `research/STACK.md` — tech stack validation, package versions, gotchas
  - `research/FEATURES.md` — competitive analysis, table stakes, differentiators
  - `research/ARCHITECTURE.md` — IndexedDB schema, gesture system, ruby pattern, build order
  - `research/PITFALLS.md` — 16 pitfalls with prevention strategies and phase assignments
- `2026-04-24` — `.planning/REQUIREMENTS.md` created (79 v1 requirements, fully traced)
- `2026-04-24` — `.planning/ROADMAP.md` created (6 phases, all 79 requirements mapped)

---

## Key Findings from Research

### Critical Pre-Start Decisions (Locked)

1. **Serwist** (not next-pwa) for PWA — `@serwist/next@9.x`; disable in dev to avoid cache conflicts
2. **@google/genai** (not @google/generative-ai) — new SDK with different API surface
3. **ts-fsrs** for FSRS v4 — production-ready; use `generatorParameters({ request_retention: 0.9 })`
4. **`visibility: hidden`** (not `display: none`) for furigana — must be established in Phase 1
5. **BYOK key → Web Crypto AES-GCM → IndexedDB** — never localStorage, never Firestore
6. **Day boundary = 04:00 local time** (not UTC midnight) for SRS queue

### Highest-Risk Phases

- **Phase 3** (Reading Core + Gestures): Most complex; ~7 gesture types with strict priority ordering; furigana engine with 3 fallback layers; anti-CLS measures
- **Phase 2** (Data Layer): FSRS correctness critical; BYOK security must be airtight

---

## Decisions

- `2026-04-27` — `JLPTLevel` re-exported from `lib/db.ts` in engine `types.ts` (single source of truth)
- `2026-04-27` — Gemini `encryptedKey` is a JSON bundle `{encrypted,salt,iv,pin}` for inline BYOK decryption
- `2026-04-27` — Model `gemini-3-flash-preview` (new API; `gemini-2.5-*` deprecated)
- `2026-04-27` — CSS dot indicator uses `var(--color-primary)` (no `--color-accent` in theme)

## Next Action

Continue Phase 3 — next plan to execute: **03-02** (Gesture System or Translation Panel).

```
/gsd-execute-phase 3 02
```

---
*State initialized: 2026-04-24 | Last updated: 2026-04-27*
