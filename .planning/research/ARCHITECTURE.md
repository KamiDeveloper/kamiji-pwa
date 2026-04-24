# KamiJi Project: Architecture Design

*Research completed: 2026-04-24*

---

## Component Map

```
┌─────────────────────────────────────────────────────────┐
│                     Next.js 16 App Router               │
│                                                         │
│  /           → HomeScreen (RSC shell + client widgets)  │
│  /(auth)/login  → LoginScreen                           │
│  /(auth)/setup  → SetupWizard (3 steps)                 │
│  /read          → StoryListScreen                       │
│  /read/[id]     → ReadingView (core screen)             │
│  /review        → ReviewSession (SRS)                   │
│  /progress      → StatsScreen                           │
│  /settings      → SettingsScreen                        │
│  /offline       → OfflineFallback                       │
└─────────────────────────────────────────────────────────┘

Client Architecture (all kanji interaction = client-side):

ReadingView
 ├── JapaneseTextRenderer      ← renders ruby HTML from story text
 │     ├── RubyKanji           ← individual <ruby> element, gesture target
 │     └── FuriganaReveal      ← visibility-controlled <rt>
 ├── GestureHandler            ← unified pointer event handler
 │     ├── TapDetector         ← La Chuleta
 │     ├── TripleTapDetector   ← Chuleta Global
 │     ├── LongPressDetector   ← El Rayo X
 │     └── ScanDetector        ← Subrayado X-Ray
 ├── TranslationPanel          ← bottom sheet (fixed overlay)
 │     ├── KanjiDetail         ← Zoom Kanji view
 │     └── SwipeToLearn        ← swipe right/left actions
 └── FuriganaEngine            ← resolves readings/translations
       ├── DictionaryLayer     ← Dexie.js queries (IndexedDB)
       ├── GeminiLayer         ← @google/genai API calls
       └── CacheLayer          ← Dexie.js AI response cache
```

---

## IndexedDB Schema (Dexie.js)

```typescript
// db.ts
import Dexie, { type EntityTable } from 'dexie';

// All tables are per-user (userId prefix on records)

interface KanjiRecord {
  id: string;          // `${userId}-${kanjiChar}`
  userId: string;
  kanji: string;       // e.g. "食"
  level: 'n5'|'n4'|'n3'|'n2'|'n1';
  state: 'new'|'learning'|'review'|'relearn'|'mastered';
  // FSRS fields (from ts-fsrs Card interface)
  due: Date;
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  lastReview: Date;
}

interface DictionaryEntry {
  id: string;          // kanji character or compound
  type: 'kanji'|'word';
  level: string;
  readings: string[];
  meanings: string[];  // Spanish meanings
  components?: { kanji: string; reading: string; meaning: string }[];
}

interface AICache {
  key: string;         // `${text}:${context}:${level}`
  furigana: string;
  translation: string;
  breakdown: object;
  createdAt: Date;
}

interface UserProgress {
  userId: string;
  currentLevel: 'n5'|'n4'|'n3'|'n2'|'n1';
  nickname: string;
  totalLearned: number;
  streak: number;
  lastStudyDate: string; // YYYY-MM-DD local
  streakFreezes: number;
  xp: number;
}

interface StoryProgress {
  id: string;          // `${userId}-${storyId}`
  userId: string;
  storyId: string;
  currentPage: number;
  completedAt?: Date;
}

const db = new Dexie('kamiji') as Dexie & {
  kanji: EntityTable<KanjiRecord, 'id'>;
  dictionary: EntityTable<DictionaryEntry, 'id'>;
  aiCache: EntityTable<AICache, 'key'>;
  userProgress: EntityTable<UserProgress, 'userId'>;
  storyProgress: EntityTable<StoryProgress, 'id'>;
};

db.version(1).stores({
  kanji: 'id, userId, kanji, level, state, due',
  dictionary: 'id, type, level',
  aiCache: 'key, createdAt',
  userProgress: 'userId',
  storyProgress: 'id, userId, storyId',
});
```

---

## Gesture System Architecture

```typescript
// hooks/useGestureSystem.ts

type GestureEvent =
  | { type: 'tap'; target: KanjiTarget }
  | { type: 'tripleTap'; position: Point }
  | { type: 'longPress'; target: KanjiTarget }
  | { type: 'scan'; targets: KanjiTarget[] }
  | { type: 'swipeRight'; target: KanjiTarget }
  | { type: 'swipeLeft'; target: KanjiTarget };

// Detection priorities (high to low):
// 1. Scroll (> 10px vertical in first 100ms) → cancel all
// 2. Triple tap (3 taps < 600ms window) → override single tap
// 3. Long-press + drag (500ms then horizontal move) → scan
// 4. Long-press (500ms, no movement) → Rayo X
// 5. Single tap (< 300ms) → Chuleta

// Key implementation notes:
// - Use Pointer Events API (not Touch Events) for unification
// - Dead zone: < 5px movement = not a move
// - Kanji hitbox expansion: +8px each side (via padding or hit-test transform)
// - Cancel long-press if pointer moves > 10px
// - Ghost click prevention: filter clicks within 50ms of longpress end
```

---

## Ruby/Furigana HTML Structure

```html
<!-- Pre-reserved space pattern — NO layout shift -->
<ruby class="kanji" data-kanji="食" data-learned="false">
  食
  <rt class="furigana" aria-hidden="true">た</rt>
</ruby>

<!-- CSS: space always allocated; visibility toggled not display -->
.furigana {
  visibility: hidden;  /* NOT display:none — keeps space reserved */
  height: var(--furigana-height);
}
.furigana.visible {
  visibility: visible;
  animation: furiganaReveal var(--reveal-duration) ease-out;
}

/* Level-specific variables */
:root[data-level="n5"] {
  --furigana-height: 14px;
  --furigana-size: 0.45em;
  --reveal-duration: 300ms;
}
```

---

## Theme System Architecture

```typescript
// Theme is applied via `data-level` attribute on <html> element
// All colors, fonts, border-radius via CSS custom properties

// globals.css defines per-level variable sets:
// :root[data-level="n5"] { --accent: #FF8A65; --bg: #FFF8F0; ... }
// :root[data-level="n4"] { --accent: #42A5F5; --bg: #FFFDF7; ... }

// ThemeProvider.tsx (client component):
// - Reads currentLevel from Zustand store (loaded from IndexedDB)
// - Sets document.documentElement.dataset.level = currentLevel
// - Level-up transition: schedule metamorphosis animation, then update level

// Zustand store shape:
interface AppStore {
  currentLevel: JLPTLevel;
  theme: 'light' | 'dark' | 'auto';
  setLevel: (level: JLPTLevel) => void;
}
```

---

## Data Flow

```
User taps kanji
  → GestureHandler.onTap(kanjiChar)
    → FuriganaEngine.resolve(kanjiChar, context, userLevel)
      → DictionaryLayer.lookup(kanjiChar)  // < 5ms IndexedDB
        → If found: return furigana + meaning
        → If not found:
          → CacheLayer.lookup(cacheKey)
            → If cached: return cached result
            → If not:
              → GeminiLayer.query(kanjiChar, context, level)
                → CacheLayer.store(result)
                → return result
  → UI: reveal furigana (visibility: visible on <rt>)
  → Auto-hide after 5s
```

---

## Build Order (Phase Dependencies)

```
Phase 1: Foundation & PWA
  ├── Next.js 16 + Tailwind 4 + TypeScript setup
  ├── Serwist PWA manifest + offline fallback
  ├── Firebase Auth (Google Sign-In)
  ├── Dexie.js schema (v1) — all tables
  ├── ThemeProvider + CSS variable system (all 5 levels)
  └── Japanese font loading (Noto Sans JP, Zen Maru Gothic, etc.)

Phase 2: Data Layer + SRS
  ├── REQUIRES: Phase 1 (Dexie schema, Auth)
  ├── ts-fsrs integration + KanjiRecord CRUD
  ├── Dictionary import pipeline (JMdict/KANJIDIC → IndexedDB)
  ├── Firestore sync service
  └── Daily review queue computation

Phase 3: Reading Core (largest phase)
  ├── REQUIRES: Phase 1 (theme), Phase 2 (dictionary, SRS)
  ├── JapaneseTextRenderer + RubyKanji components
  ├── GestureSystem (all 7 gestures)
  ├── FuriganaEngine (3-layer: dict → AI → fallback)
  ├── TranslationPanel + KanjiDetail
  └── Swipe-to-learn / Swipe-to-review

Phase 4: Home + Story System
  ├── REQUIRES: Phase 2 (progress), Phase 3 (reading view)
  ├── Story data model + content for N5
  ├── HomeScreen (adaptive layout)
  ├── StoryList + unlock system
  └── Pagination within stories

Phase 5: Gamification + Level System
  ├── REQUIRES: Phase 2 (SRS progress), Phase 4 (stories)
  ├── Streak system + streak freeze
  ├── Badge/achievement system
  ├── XP tracking
  └── Level-up detection + metamorphosis ceremony

Phase 6: Onboarding + Settings + Polish
  ├── REQUIRES: All prior phases
  ├── Welcome carousel + Setup wizard
  ├── Settings screen
  ├── Push notifications
  └── Stats/Progress screen
```
