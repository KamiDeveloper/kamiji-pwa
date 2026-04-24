# Requirements: KamiJi (神字)

**Defined:** 2026-04-24
**Core Value:** A user can tap any kanji in a real Japanese story and instantly get its reading and meaning — then mark it as learned in a single gesture — without ever leaving the reading experience.

---

## v1 Requirements

### Authentication & Onboarding (AUTH)

- [ ] **AUTH-01**: User can sign in with Google (Firebase Auth OAuth popup/redirect)
- [ ] **AUTH-02**: Returning user is detected by Firebase session and routed directly to Home (no repeated setup)
- [ ] **AUTH-03**: First-time user completes a 3-step setup wizard: nickname → Gemini API Key → starting JLPT level
- [ ] **AUTH-04**: User can skip API Key setup and configure it later from Settings
- [ ] **AUTH-05**: Splash screen (1.5-2s) shows KamiJi logo with brush-stroke animation before any app content
- [ ] **AUTH-06**: Welcome carousel (3 slides) is shown only on first launch, skip button available

### Progressive Web App (PWA)

- [ ] **PWA-01**: App is installable on mobile and desktop (manifest.json, service worker, icons 192px/512px/maskable)
- [ ] **PWA-02**: App shows an offline fallback page (not a browser error) when fully offline
- [ ] **PWA-03**: Dictionary-based reading and SRS review function fully offline (no network required)
- [ ] **PWA-04**: Background Sync queues SRS progress mutations and syncs to Firestore when reconnected
- [ ] **PWA-05**: App handles returning from offline gracefully (syncs local changes, shows reconnection banner)

### Data Layer & Sync (DATA)

- [ ] **DATA-01**: IndexedDB (Dexie.js) stores: kanji SRS state, dictionary entries per level, AI cache, user progress, story progress
- [ ] **DATA-02**: JMdict-ES and KANJIDIC2-ES dictionaries are pre-partitioned by JLPT level and loadable into IndexedDB on first use
- [ ] **DATA-03**: User's kanji SRS state is synced to Firestore as backup and multi-device source of truth
- [ ] **DATA-04**: User can export their full progress as a JSON file from Settings
- [ ] **DATA-05**: User can reset progress for current level (with double confirmation) or full reset (triple confirmation + 5s countdown)
- [ ] **DATA-06**: Jitendex/JMdict/KANJIDIC2 attribution is displayed in the About section per license terms (CC BY-SA 4.0)

### Furigana & Translation Engine (ENGINE)

- [ ] **ENGINE-01**: Furigana resolution uses a 3-layer approach: JMdict/KANJIDIC2 offline → Gemini AI (if key configured) → heuristic/romanization fallback
- [ ] **ENGINE-02**: AI responses (furigana, translation, breakdown) are cached in IndexedDB with the query as key (no duplicate API calls)
- [ ] **ENGINE-03**: Gemini API key is stored encrypted using Web Crypto API in IndexedDB — never in localStorage, never in Firestore
- [ ] **ENGINE-04**: App handles all AI failure modes gracefully:
  - Rate limit (short): countdown timer + fallback to dictionary
  - Rate limit (daily): disable AI, enable dictionary-only mode
  - Invalid key: prompt user to update in Settings
  - Broken response: silent fallback to dictionary, log for debugging
  - Offline: dictionary fallback, show "IA no disponible sin conexión"
- [ ] **ENGINE-05**: Translation Panel shows: kanji character, furigana (onyomi + kunyomi), meanings in Spanish, usage example from story, and decomposition by radical/component
- [ ] **ENGINE-06**: Gemini AI Thinking Level is tuned per JLPT level (lower for N5 = faster/cheaper, higher for N2/N1 = more accurate)

### Reading Core (READ)

- [ ] **READ-01**: User can browse a filtered list of stories for their current JLPT level (filter: All / In Progress / New / Completed)
- [ ] **READ-02**: Story list shows per story: title, difficulty ★☆☆, estimated reading time, number of new kanji, and progress state (NEW / progress bar / ✓)
- [ ] **READ-03**: Stories are progressively unlocked: first 3 always available, remaining unlock at kanji-learned milestones
- [ ] **READ-04**: Reading view displays paginated Japanese text with kanji marked as interactive (subtle dot indicator)
- [ ] **READ-05**: Furigana space is pre-reserved via CSS ruby/min-height pattern — zero layout shift (CLS < 0.05) when furigana appears
- [ ] **READ-06**: Reading view shows current page / total pages indicator and kanji summary footer (known X / new Y)
- [ ] **READ-07**: User can navigate between pages via Prev/Next buttons or horizontal swipe
- [ ] **READ-08**: Kanji learned in previous sessions appear without the interactive dot — naturally integrated into text
- [ ] **READ-09**: Skeleton screen (shimmer animation) is shown while story content loads — never a spinner

### Gesture System (GESTURE)

- [ ] **GESTURE-01**: **La Chuleta** — Single tap on a kanji reveals its furigana for 5 seconds (configurable: 3s/5s/10s), then auto-hides. No layout shift.
- [ ] **GESTURE-02**: **Chuleta Global** — Triple tap anywhere on the reading area reveals ALL furigana for 60 seconds (configurable), then auto-hides
- [ ] **GESTURE-03**: **El Rayo X** — Long-press (500ms) on a kanji opens the Translation Panel as a fixed bottom sheet overlay
- [ ] **GESTURE-04**: **Subrayado X-Ray** — Long-press + drag horizontally selects multiple kanji; releasing triggers group translation
- [ ] **GESTURE-05**: **Scan (Rastrear)** — After long-press is confirmed, drag to scan over multiple kanji; each kanji hit reveals its furigana with haptic feedback (if enabled)
- [ ] **GESTURE-06**: **Zoom Kanji** — Tap on a kanji inside the Translation Panel to expand full kanji detail view
- [ ] **GESTURE-07**: **Swipe Right** on Translation Panel → mark current kanji as "Learned" (enters FSRS LEARNING state)
- [ ] **GESTURE-08**: **Swipe Left** on Translation Panel → mark kanji as "To Review" (high priority in SRS queue)
- [ ] **GESTURE-09**: Scroll takes priority over all gestures; gestures cancel if vertical movement > 10px within first 100ms
- [ ] **GESTURE-10**: Ghost click prevention — click events are filtered for 50ms after any long-press ends
- [ ] **GESTURE-11**: iOS safari `-webkit-touch-callout: none` applied to all kanji elements to prevent native context menus

### SRS / FSRS Engine (SRS)

- [ ] **SRS-01**: FSRS v4 algorithm (via ts-fsrs) is used for all spaced repetition scheduling; desired retention = 90%
- [ ] **SRS-02**: Kanji states: New → Learning → Review → Relearn → Mastered; transitions driven by FSRS algorithm
- [ ] **SRS-03**: Daily review queue selects cards with scheduledDate ≤ today, sorted by urgency (lowest retrievability first), capped at 30 per session
- [ ] **SRS-04**: Up to 5 new kanji per session are introduced to prevent overload
- [ ] **SRS-05**: Review session shows: kanji card (large), context sentence from a story, "Mostrar respuesta" button, then ratings (Otra vez / Difícil / Bien / Fácil)
- [ ] **SRS-06**: Post-session summary shows: total reviewed, rating breakdown, retention percentage, next review schedule
- [ ] **SRS-07**: Anti-spam protection: if user marks > 20 kanji as learned in < 5 minutes, a friendly reminder appears
- [ ] **SRS-08**: Day boundary for review queue is 04:00 AM local time (not UTC midnight) to prevent timezone drift
- [ ] **SRS-09**: If user returns after >7 days inactive, overdue cards are spread across multiple sessions with a friendly welcome-back message

### Progression & Level System (LEVEL)

- [ ] **LEVEL-01**: Level progress shown as two metrics: coverage (kanji marked learned / total) + retention (FSRS retrievability average)
- [ ] **LEVEL-02**: Level-up triggers when: coverage = 100% AND retention ≥ 80%
- [ ] **LEVEL-03**: If coverage = 100% but retention < 80%, a specific message tells the user their retention % and what's needed
- [ ] **LEVEL-04**: Level-up ceremony executes: summary stats → preview of new level → metamorphosis animation → new theme applied
- [ ] **LEVEL-05**: Each JLPT level has a distinct visual identity:
  - N5: Kawaii/nursery (Nunito, pastels, high roundness, maximum furigana)
  - N4: Schoolbook (Shippori Mincho, primary colors, medium roundness)
  - N3: Urban manga (Zen Maru Gothic, neons, sharp edges)
  - N2: Academic (EB Garamond, muted tones, serif)
  - N1: Wabi-sabi (Shippori Mincho, ink/stone/gold, minimal noise)
- [ ] **LEVEL-06**: Theme is applied via CSS custom properties driven by `data-level` attribute on `<html>`; system-wide instant swap
- [ ] **LEVEL-07**: In N5/N4, theme and accent options in Settings are locked (fixed per-level theme is part of the narrative)

### Gamification (GAME)

- [ ] **GAME-01**: Streak system: a day counts as active if user reads ≥1 story page OR completes ≥5-card SRS session OR marks ≥3 kanji learned
- [ ] **GAME-02**: Streak freeze: 1 freeze earned per 30-day streak, max 3 accumulated; auto-consumed when inactive; user notified next day
- [ ] **GAME-03**: Badge categories: Reading (5 badges), Kanji milestones (6 badges), Streaks (5 badges), Level completion (5 badges), Special (6 badges)
- [ ] **GAME-04**: Locked badges show as "????" with category icon — creates curiosity without revealing spoilers
- [ ] **GAME-05**: XP earned per action (defined in PRD §15.4); displayed in stats; no gameplay gating via XP
- [ ] **GAME-06**: Micro-rewards vary slightly each time (random particle rotation, slightly different colors) to prevent habituation
- [ ] **GAME-07**: Kami-chan mascot (fox) appears on achievements, streak milestones, and welcome-back; visibility configurable in Settings

### Notifications (NOTIF)

- [ ] **NOTIF-01**: Push notification permission is requested only after user's 3rd study session (not on first launch)
- [ ] **NOTIF-02**: Daily reminder sent at user-configured time (default 19:00) if no study activity that day
- [ ] **NOTIF-03**: Streak-danger alert sent 2h before midnight if streak ≥ 3 days, no activity today, and no freeze available
- [ ] **NOTIF-04**: Celebration notification for milestone events sent only if user is not currently in the app
- [ ] **NOTIF-05**: Optional weekly summary notification (default OFF)
- [ ] **NOTIF-06**: Notification tone configurable: Amigable / Directo / Motivacional
- [ ] **NOTIF-07**: No notifications sent between 22:00-08:00 local time; escalating cooldown if user inactive 7+ days; stop if inactive 30+ days

### Stats & Progress (STATS)

- [ ] **STATS-01**: Progress screen shows: level progress bar (coverage), retention bar, days/kanji stats, weekly activity heatmap, streak
- [ ] **STATS-02**: Weekly activity heatmap shows kanji learned per day for the last 7 days
- [ ] **STATS-03**: Achievement grid with unlocked/locked badges displayed
- [ ] **STATS-04**: Progress bar shows level-up estimate ("~2 semanas para N4 basado en tu ritmo actual")

### Settings (SETTINGS)

- [ ] **SETTINGS-01**: User can edit nickname (2-20 chars, letters/numbers/emojis)
- [ ] **SETTINGS-02**: User can update Gemini API key with visibility toggle; link to Google AI Studio for getting a key
- [ ] **SETTINGS-03**: Furigana display defaults configurable: Hidden / Only unknown / Always visible
- [ ] **SETTINGS-04**: Chuleta auto-hide time configurable: 3s / 5s / 10s
- [ ] **SETTINGS-05**: Chuleta Global auto-hide time configurable: 30s / 60s / 120s / ∞
- [ ] **SETTINGS-06**: Text size adjustable (slider with 5 increments)
- [ ] **SETTINGS-07**: Kami-chan visibility: Always / Only on achievements / Hidden
- [ ] **SETTINGS-08**: Sound effects toggle; haptic feedback toggle
- [ ] **SETTINGS-09**: Notification configuration (enable/disable, time, frequency, tone)
- [ ] **SETTINGS-10**: Appearance options (theme: Light/Dark/Auto; accent color; density) — unlocked at N3+
- [ ] **SETTINGS-11**: Donation link to external page ("Invitar un café")
- [ ] **SETTINGS-12**: Sign out button with confirmation

### Performance (PERF)

- [ ] **PERF-01**: Cumulative Layout Shift (CLS) < 0.05 (tested with Lighthouse)
- [ ] **PERF-02**: Interaction to Next Paint (INP) < 100ms for gestures
- [ ] **PERF-03**: First Contentful Paint (FCP) < 1.5s on 4G
- [ ] **PERF-04**: Largest Contentful Paint (LCP) < 2.5s on 4G
- [ ] **PERF-05**: All animations run at ≥ 58fps (no layout-triggering properties: only transform/opacity/filter)
- [ ] **PERF-06**: Zero reflows per gesture interaction

---

## v2 Requirements

### Content Expansion

- **CONT-V2-01**: N4, N3, N2, N1 story content (full JLPT coverage)
- **CONT-V2-02**: Community story submissions (moderated)
- **CONT-V2-03**: Ability to import custom text for reading (paste URL or text)

### Social / Community

- **SOCL-V2-01**: Optional friend progress sharing (not a leaderboard)
- **SOCL-V2-02**: Shared reading sessions (read the same story together)

### Advanced SRS

- **SRS-V2-01**: FSRS weight optimization based on user's review history (personalized model)
- **SRS-V2-02**: Configurable desired retention (currently fixed at 90%)
- **SRS-V2-03**: Vocabulary list export (Anki-compatible .apkg)

### Learning Expansion

- **LEARN-V2-01**: Audio pronunciation for individual kanji (TTS)
- **LEARN-V2-02**: Stroke order visualization (animated)
- **LEARN-V2-03**: Production/writing tests (currently recognition-only)
- **LEARN-V2-04**: Visual customizations unlockable via XP

### Platform

- **PLAT-V2-01**: Native iOS app (via Capacitor or React Native)
- **PLAT-V2-02**: Native Android app

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Hiragana/katakana teaching | Prerequisite skill; app directs users to external kana resources instead |
| Public leaderboards | Causes social anxiety; study is personal; explicit PRD decision |
| Kanji writing/stroke order tests V1 | Reading-focused app; writing is V2+ |
| Audio pronunciation V1 | Scope, TTS licensing, storage overhead |
| Social comparison / social feed | Anti-pattern for language learning anxiety |
| In-app purchases / subscription paywall | BYOK + donation model; no monetization gates |
| English-language UI | Designed specifically for Spanish speakers |
| Server-side SRS computation | FSRS is a client algorithm; server-side = unnecessary cost |
| Multi-user household / family accounts | Firestore model is per-user by design |
| Manga / visual novel reading mode | Very high complexity; V2+ |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 – AUTH-06 | Phase 1 | Pending |
| PWA-01 – PWA-05 | Phase 1 | Pending |
| DATA-01 – DATA-06 | Phase 2 | Pending |
| ENGINE-01 – ENGINE-06 | Phase 3 | Pending |
| READ-01 – READ-09 | Phase 3 | Pending |
| GESTURE-01 – GESTURE-11 | Phase 3 | Pending |
| SRS-01 – SRS-09 | Phase 2 | Pending |
| LEVEL-01 – LEVEL-07 | Phase 4 | Pending |
| GAME-01 – GAME-07 | Phase 4 | Pending |
| NOTIF-01 – NOTIF-07 | Phase 5 | Pending |
| STATS-01 – STATS-04 | Phase 4 | Pending |
| SETTINGS-01 – SETTINGS-12 | Phase 5 | Pending |
| PERF-01 – PERF-06 | All phases (continuous) | Pending |

**Coverage:**
- v1 requirements: 79 total
- Mapped to phases: 79
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-24*
*Last updated: 2026-04-24 after initial definition*
