# KamiJi Project: Feature Research & Competitive Analysis

*Research completed: 2026-04-24*

---

## 1. Table Stakes (Must-Have Features)

Features users expect in any serious kanji learning app. Missing any of these will cause immediate rejection.

| Feature | Complexity | KamiJi Status |
|---------|------------|---------------|
| Furigana / reading aid for unknown kanji | Low-Medium | ✅ Core gesture (La Chuleta) |
| Spanish-language interface & translations | Low | ✅ Spanish-native design |
| JLPT-structured learning path | Medium | ✅ N5→N1 progression |
| Progress tracking (kanji learned, level) | Medium | ✅ Coverage + retention bars |
| Spaced repetition review system | High | ✅ FSRS v4 |
| Offline functionality (core features) | High | ✅ IndexedDB + Serwist |
| Mobile-first responsive design | Medium | ✅ PWA mobile-first |
| Cloud sync / account backup | Medium | ✅ Firebase Auth + Firestore |
| Daily study reminders | Low | ✅ Web Push Notifications |
| Error states with recovery paths | Low | ✅ Defined in PRD §11 |

---

## 2. Differentiators (KamiJi's Unique Advantages)

### 2a. True Differentiators (No Competitor Has This Combination)

| Differentiator | Competitor Gap | KamiJi Implementation |
|---------------|----------------|----------------------|
| **Gesture-native kanji interactions** | WaniKani/Anki use buttons; no app uses tap/long-press/scan gestures | Tap=Chuleta, Long=RayoX, Triple=Global, Scan=Subrayado |
| **Evolving UI per JLPT level (Metamorphosis)** | No app changes its entire visual identity as you progress | 5 distinct themes: kawaii→wabi-sabi, each with ceremony |
| **Spanish-native (not translated from English)** | All major apps are EN-first with poor ES translations | Written in Spanish from ground up; ES idioms, cultural references |
| **BYOK AI model** | No kanji app offers user-supplied AI key for zero ongoing cost | Gemini BYOK; free tier covers typical learning volume |
| **Context-reading over rote flashcards** | WaniKani/Anki = isolated kanji; even Satori Reader is EN-only | Graded stories with interactive kanji inline |
| **FSRS v4 (not SM-2)** | Most apps still use SM-2 (WaniKani uses WK's custom algo, Anki uses SM-2) | ts-fsrs with 90% desired retention; 25% fewer reviews |

### 2b. Partial Differentiators (Competitors Have Weaker Versions)

| Differentiator | Who Has It | KamiJi Advantage |
|---------------|-----------|-------------------|
| Graded reading content | Satori Reader (EN only) | Spanish + gesture UX + integrated SRS |
| Gamification/streaks | Duolingo (superficial) | Streaks tied to real learning, not app-opening |
| Offline SRS | Anki (complex setup) | Zero-config offline, works on install |
| Story-based learning | NHK Web Easy | No SRS, no gesture UX, no Spanish |

---

## 3. Anti-Features (What KamiJi Should Deliberately NOT Build in V1)

| Anti-Feature | Why Avoid | User Research Evidence |
|-------------|-----------|----------------------|
| **Public leaderboards** | Causes social anxiety; study is personal | Reddit r/LearnJapanese: "WaniKani leaderboards make me feel behind" |
| **Daily XP requirements to maintain progress** | Creates resentment; users quit after missing 1 day | Duolingo criticism: "punishing for life" |
| **Kanji writing/stroke order tests** | Complex, low ROI for reading focus | V1 = reading only; writing is V2+ |
| **Multiple competing SRS queues** | Analysis paralysis; WaniKani users complain about "Lessons pile" | Single unified queue with 30-card cap |
| **Kanji meaning multiple-choice quizzes** | Gamey but not effective; rewards guessing | Recall through reading context is superior |
| **Native pronunciation audio** | Storage, licensing, scope; not needed for reading | Can add in V2 with proper audio licensing |
| **AI chat assistant** | Scope creep; Gemini key is for furigana engine | Focused AI use only |

---

## 4. Content Strategy

### Minimum Viable Content for N5 Launch

Based on competitive analysis:

| Content Type | Minimum for Launch | Target for V1 |
|-------------|-------------------|---------------|
| N5 Stories | 5 stories (15+ pages total) | 10-12 stories |
| N5 Kanji coverage | All ~103 standard N5 kanji | 100% of JMdict N5 list |
| Story difficulty spread | At least 2 easy, 2 medium, 1 hard | 3/5/4 (easy/medium/hard) |
| Story themes | 3+ different contexts (family, food, seasons) | 6+ themes |

### JLPT Kanji List Source Strategy

| Source | Use Case | Format |
|--------|----------|--------|
| **KANJIDIC2** | Kanji readings, stroke count, JLPT level | XML → JSON conversion |
| **JMdict-ES** | Word entries with Spanish meanings | XML → partitioned JSON per level |
| **Jitendex** | Enhanced JMdict with better English/ES glosses | JSON |
| **KanjiFrequency** | Supplement JLPT list with frequency-adjusted order | CSV |

**Key insight**: KANJIDIC2 N5 list = 103 kanji. These are the gates for N5 completion. Stories must contain these kanji in context, introduced gradually.

### Content Creation Strategy (V1)

Since KamiJi is a solo/small team project:
1. **Hand-authored stories**: 5-8 N5 stories crafted to introduce kanji incrementally
2. **Gemini-assisted generation**: Use Gemini to draft stories meeting kanji constraints, then human-review
3. **Launch small, grow iteratively**: 5 N5 stories at launch is viable if they're high quality; users who complete them become evangelists

---

## 5. Competitor Feature Gap Matrix

| Feature | WaniKani | Anki | Duolingo | Satori Reader | KamiJi |
|---------|----------|------|----------|---------------|--------|
| Spanish-native | ❌ | ❌ | ⚠️ | ❌ | ✅ |
| Graded reading | ❌ | ❌ | ⚠️ | ✅ EN | ✅ |
| Gesture UX | ❌ | ❌ | ❌ | ❌ | ✅ |
| Evolving UI | ❌ | ❌ | ❌ | ❌ | ✅ |
| FSRS algorithm | ❌ | ✅ | ❌ | ❌ | ✅ |
| Offline-first | ❌ | ✅ | ⚠️ | ❌ | ✅ |
| Free (no sub) | ❌ | ✅ | ⚠️ | ❌ | ✅ |
| PWA installable | ❌ | ✅ | ✅ | ❌ | ✅ |
| AI-enhanced | ❌ | ❌ | ⚠️ | ❌ | ✅ |
| No social pressure | ✅ | ✅ | ❌ | ✅ | ✅ |

---

## 6. V2+ Feature Candidates (Not In V1 Scope)

These are validated desires from the learning community that KamiJi should plan for post-V1:

| Feature | User Demand | Complexity |
|---------|------------|------------|
| Custom story upload / reading own text | High (advanced users) | Medium |
| Audio pronunciation (TTS per kanji) | Medium | Medium |
| Stroke order display | Medium | High |
| N4-N1 content (full JLPT coverage) | High | High (content only) |
| Social reading groups / shared progress | Low | High |
| Vocabulary lists export (to Anki) | Medium | Low |
| Handwriting practice | Low | Very High |
| Manga/visual novel reading mode | High (advanced) | Very High |
