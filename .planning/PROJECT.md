# KamiJi (神字) — Caracteres Divinos

## What This Is

KamiJi is a Progressive Web App for **Spanish-speaking adult learners** who want to master reading Japanese kanji. Unlike existing apps that teach kanji in isolation or out of practical order, KamiJi teaches kanji **in context** — through graded stories and texts that evolve in complexity following the 5 JLPT levels (N5→N1). The app's entire interface metamorphoses with each level, reflecting the user's emotional and cognitive journey from kindergarten (N5) to doctorate (N1).

## Core Value

> **A user can tap any kanji in a real Japanese story and instantly get its reading and meaning — then mark it as learned in a single gesture — without ever leaving the reading experience.**

This zero-friction furigana + translation gesture system, backed by FSRS spaced repetition, is the irreducible core. Everything else supports this loop.

## Requirements

### Validated

<!-- None yet — ship to validate -->

(None yet — ship to validate)

### Active

<!-- Onboarding & Auth -->
- [ ] User can authenticate with Google Sign-In (Firebase Auth)
- [ ] User can set a nickname, Gemini API Key, and starting JLPT level on first run
- [ ] Returning user is taken directly to Home, skipping setup

<!-- Reading Core -->
- [ ] User can browse a list of stories for their current JLPT level
- [ ] User can read a paginated Japanese story in the reading view
- [ ] User can tap a kanji (La Chuleta) to reveal its furigana for 5 seconds
- [ ] User can triple-tap anywhere to reveal all furigana in the current text for 60 seconds
- [ ] User can long-press a kanji (El Rayo X) to open the Translation Panel with meaning + breakdown
- [ ] User can long-press and drag (Subrayado X-Ray) to translate a block of text
- [ ] User can tap a kanji inside the Translation Panel (Zoom Kanji) to see full kanji detail
- [ ] User can swipe right on a kanji in the Panel to mark it as "Learned"
- [ ] User can swipe left on a kanji in the Panel to mark it for "Review"
- [ ] Furigana space is pre-reserved so no layout shift occurs when furigana appears

<!-- Furigana & Translation Engine -->
- [ ] App resolves furigana and translation using a 3-layer hybrid engine: JMdict/KANJIDIC offline → Gemini AI (BYOK) → heuristic fallback
- [ ] Dictionary data (JMdict-ES, KANJIDIC2-ES, Jitendex) is bundled per JLPT level in IndexedDB for full offline use
- [ ] Gemini API key is stored encrypted; user brings their own key (BYOK model)
- [ ] AI responses are cached in IndexedDB to prevent redundant API calls
- [ ] App handles all AI error conditions gracefully (rate limits, invalid key, timeout, offline) with user-friendly messages and dictionary fallback

<!-- SRS / FSRS -->
- [ ] App tracks kanji state (New → Learning → Review → Mastered) using FSRS v4 algorithm
- [ ] User can complete a daily SRS review session with Otra vez / Difícil / Bien / Fácil ratings
- [ ] User cannot "game" the system — marking learned only starts the FSRS cycle, not completes it
- [ ] Daily review queue is computed automatically based on scheduledDate and urgency

<!-- Progression & Level System -->
- [ ] Level progress is computed as coverage (kanji marked learned / total for level) × retention (FSRS ≥ 80%)
- [ ] Level-up ceremony triggers when coverage = 100% AND retention ≥ 80%
- [ ] App executes the visual metamorphosis animation sequence on level-up
- [ ] Each JLPT level has a distinct visual theme (N5: kawaii/pastel → N1: wabi-sabi/ink)

<!-- Gamification -->
- [ ] App tracks daily streaks with grace mechanics (streak freeze)
- [ ] App awards badges for reading milestones, kanji milestones, streaks, and level completion
- [ ] App awards XP for study actions (displayed visually, no gameplay gating)
- [ ] Stories are progressively unlocked based on kanji-learned milestones (not time or XP)

<!-- Stats & Progress Screen -->
- [ ] User can view overall level progress (coverage bar + retention bar)
- [ ] User can view weekly activity heatmap and streak
- [ ] User can view badges earned and locked (locked show as "????????")

<!-- Notifications -->
- [ ] App requests push notification permission after 3rd study session
- [ ] App sends daily reminder at user-configured time (if not studied that day)
- [ ] App sends streak-danger alert 2h before midnight if streak ≥ 3 days and not studied
- [ ] Notification tone is user-configurable (Amigable / Directo / Motivacional)

<!-- Settings & PWA -->
- [ ] User can update nickname, API key, appearance, furigana defaults, mascot visibility, sound/haptics, and notification settings
- [ ] User can export progress as JSON
- [ ] App works fully offline for dictionary-based features (reading + SRS)
- [ ] App is installable as a PWA (manifest, service worker, icons)
- [ ] App displays credits for JMdict/KANJIDIC2/Jitendex in the About section

### Out of Scope

- **Kanji handwriting / stroke order teaching** — KamiJi is reading-focused; calligraphy is a V2+ feature
- **Teaching hiragana/katakana** — prerequisite knowledge; users who don't know kana are redirected to external resources
- **Public leaderboards / social comparison** — deliberately excluded to prevent anxiety and toxic comparison
- **In-app monetization / paywalls** — V1 is BYOK + voluntary donations; no premium tiers
- **Audio pronunciation playback** — sound effects exist but TTS/audio lessons are out of scope for V1
- **Kanji writing tests** — recognition-only; production/writing tests deferred to V2
- **Native mobile apps (iOS/Android)** — PWA with installability covers mobile; native apps are post-V1
- **Multi-language support beyond Spanish** — app is designed specifically for Spanish speakers

## Context

- **Target users**: Spanish-speaking adults (18-45) who know hiragana/katakana and have hit the "kanji wall"
- **Primary personas**: Sofía (autodidact, 27, Mexico City), Carlos (professional, 34, Madrid), Luna (university student, 21, Buenos Aires)
- **Business model**: BYOK (Bring Your Own Gemini Key) + voluntary donations. Zero cost to user in V1.
- **Competitive landscape**: WaniKani (EN only, no context reading), Anki (config-heavy, SM-2), Duolingo (superficial), Satori Reader (EN only, no gesture UX) — none combine immersive reading + gesture UX + Spanish + evolving UI + FSRS
- **Dictionary licensing**: JMdict, KANJIDIC2, Jitendex — all CC BY-SA 4.0 / public domain; must display credits

## Constraints

- **Tech stack (locked)**: Next.js 16 (App Router) + TypeScript 5 + Tailwind CSS 4 + Firebase Auth/Firestore + Dexie.js (IndexedDB) + Serwist (PWA) + Motion/GSAP (animations) + TanStack Query + Zustand + Vercel deploy
- **AI**: Google Gemini API only (gemini-2.5-flash for N5-N3, gemini-2.5-pro for N2-N1); BYOK model; ThinkingLevel parameter must be tuned per level complexity
- **Offline-first**: All reading and SRS must function without internet; only AI features require connectivity
- **Performance targets**: CLS < 0.05, INP < 100ms, FCP < 1.5s, LCP < 2.5s, animations ≥ 58fps, 0 reflows per gesture
- **No layout shift from furigana**: Space must be pre-reserved via CSS ruby/min-height before furigana appears
- **FSRS v4**: Must use FSRS (not SM-2) for spaced repetition; desire retention = 90%
- **Spanish-first**: All UI text, translations, and copy are in Spanish (neutral/pan-Latin)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| BYOK model (user brings own Gemini key) | Zero infrastructure cost in V1; enables free app while funding usage through user's own quota | — Pending |
| FSRS v4 over SM-2 | ~25% fewer reviews for equal retention; more modern and proven | — Pending |
| PWA over native app | Cross-platform from day 1; installable on mobile; no app store friction | — Pending |
| Firebase Auth (Google-only in V1) | Lowest friction auth for target audience; Google accounts are universal | — Pending |
| Firestore for user data + IndexedDB for local | Firestore for sync/backup; IndexedDB (Dexie) for offline dict, SRS state, and AI cache | — Pending |
| Serwist for PWA (not next-pwa) | Modern successor to next-pwa; App Router compatible; maintained | — Pending |
| Motion + GSAP for animations | Motion for declarative UI/layout animations; GSAP for complex SVG timelines (pinceladas, metamorfosis) | — Pending |
| Gesture system (tap/triple-tap/long-press/scan/swipe) over buttons | Zero-instruction design philosophy; gestures feel native on mobile; buttons available as accessibility fallback | — Pending |
| Stories unlock via kanji milestones (not time) | Prevents skip-ahead behavior; creates anticipation without frustration | — Pending |
| Visual metamorphosis tied to JLPT level | Core UVP differentiator — the app that grows with you; psychological reinforcement of progress | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-24 after initialization*
