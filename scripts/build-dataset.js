#!/usr/bin/env node
/**
 * KamiJi Dictionary Dataset Builder
 * ===================================
 * Fuses KANJIDIC (kanji_bank) + JMdict-ES (term_bank) Yomitan dictionaries
 * into the KamiJi app schema for all JLPT levels.
 *
 * Usage:
 *   node scripts/build-dataset.js                  # Build all levels (N5-N1)
 *   node scripts/build-dataset.js --level n5       # Build only N5
 *   node scripts/build-dataset.js --level n5,n4    # Build N5 and N4
 *
 * Input structure (place raw files in scripts/raw/):
 *   scripts/raw/kanjidic/
 *     ├── index.json
 *     ├── tag_bank_1.json
 *     └── kanji_bank_1.json
 *   scripts/raw/jmdict/
 *     ├── index.json
 *     ├── tag_bank_1.json
 *     ├── term_bank_1.json
 *     ├── term_bank_2.json
 *     ├── term_bank_3.json
 *     ├── term_bank_4.json
 *     ├── term_bank_5.json
 *     └── term_bank_6.json
 *
 * Output:
 *   public/data/n5-jmdict.json
 *   public/data/n4-jmdict.json
 *   ...
 *   scripts/gaps/n5-gaps.json  (kanji without vocab matches)
 *
 * Yomitan Schema Reference:
 *   kanji_bank entry: [character, onyomi, kunyomi, tags, [meanings], {stats}]
 *   term_bank entry:  [expression, reading, defTags, rules, score, [glossary], seqNum, termTags]
 *
 * JLPT Level Mapping in KANJIDIC tags:
 *   Some KANJIDIC dictionaries use the old JLPT scale (1-4) where:
 *     old 4 = N5, old 3 = N4, old 2 = N3/N2, old 1 = N1
 *   Others use the modern 5-level scale directly in tags.
 *   This script auto-detects the scale by checking if any tag contains "5".
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ── Configuration ──────────────────────────────────────────
const RAW_DIR = path.join(__dirname, 'raw');
const KANJIDIC_DIR = path.join(RAW_DIR, 'kanjidic');
const JMDICT_DIR = path.join(RAW_DIR, 'jmdict');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data');
const GAPS_DIR = path.join(__dirname, 'gaps');
const OFFICIAL_JLPT_CSV = path.join(__dirname, 'jlpt-official-kanjis', 'jlpt_vocab.csv');

const ALL_LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1'];
const LEVEL_RANK = Object.fromEntries(ALL_LEVELS.map((level, index) => [level, index]));
const DATASET_SCHEMA_VERSION = 3;

// ── Helpers ────────────────────────────────────────────────
function loadJSON(filepath) {
  if (!fs.existsSync(filepath)) {
    console.warn(`  ⚠ File not found: ${filepath}`);
    return null;
  }
  return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}

function loadAllBanks(dir, prefix, maxBanks = 20) {
  let data = [];
  for (let i = 1; i <= maxBanks; i++) {
    const filepath = path.join(dir, `${prefix}_${i}.json`);
    if (!fs.existsSync(filepath)) {
      if (i === 1) {
        console.warn(`  ⚠ File not found: ${filepath}`);
      }
      break; // Stop after first missing file (we've loaded all that exist)
    }

    const bank = loadJSON(filepath);
    if (bank) {
      data = data.concat(bank);
    }
  }
  return data;
}

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (char !== '\r') {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function normalizeHeader(value) {
  return String(value || '').trim().replace(/^\uFEFF/, '').toLowerCase();
}

function normalizeCSVLevel(value) {
  const match = String(value || '').trim().toLowerCase().match(/^n([1-5])$/);
  return match ? `n${match[1]}` : null;
}

function getEasiestLevel(levels) {
  // The CSV is vocabulary-level data; a kanji can appear in several levels.
  // Assign it to the first/easiest level so each kanji produces one card.
  return [...levels].sort((a, b) => LEVEL_RANK[a] - LEVEL_RANK[b])[0] || null;
}

function normalizeJLPTLevel(value, usesOldScale) {
  if (value === undefined || value === null || value === '') return null;

  const tag = String(value).trim().toLowerCase();

  const modernMatch = tag.match(/jlpt-?n?([1-5])|^n([1-5])$/);
  if (modernMatch) {
    const level = modernMatch[1] || modernMatch[2];
    return `n${level}`;
  }

  const numericMatch = tag.match(/^([1-5])$/);
  if (!numericMatch) return null;

  const level = numericMatch[1];
  if (!usesOldScale) return `n${level}`;

  const oldToNew = { '4': 'n5', '3': 'n4', '2': 'n3', '1': 'n1' };
  return oldToNew[level] || null;
}

/**
 * Extracts JLPT level from KANJIDIC tags/stats.
 * Tags are space-separated. We look for patterns like:
 *   "jlpt-n5", "jlpt5", "n5", or the old numeric "4" (=N5)
 * Some Yomitan KANJIDIC exports store JLPT as stats.jlpt instead.
 *
 * @param {string} tags - Space-separated tags from kanji_bank entry
 * @param {object} stats - Stats object from kanji_bank entry
 * @param {boolean} usesOldScale - Whether the dictionary uses old 1-4 JLPT scale
 * @returns {string|null} Normalized level like "n5" or null if no JLPT tag found
 */
function extractJLPTLevel(tags, stats, usesOldScale) {
  const statLevel = normalizeJLPTLevel(stats?.jlpt, usesOldScale);
  if (statLevel) return statLevel;

  if (!tags || typeof tags !== 'string') return null;

  const tagList = tags.toLowerCase().split(/\s+/);

  for (const tag of tagList) {
    const tagLevel = normalizeJLPTLevel(tag, usesOldScale);
    if (tagLevel) return tagLevel;
  }

  return null;
}

/**
 * Detects if the KANJIDIC uses the old 4-level JLPT scale.
 * Checks if any kanji_bank entry has a "5" or "n5" in tags.
 * If yes → modern 5-level. If no → old 4-level.
 */
function detectJLPTScale(kanjiBankEntries) {
  for (const entry of kanjiBankEntries) {
    const tags = (entry[3] || '').toLowerCase();
    if (tags.includes('n5') || tags.includes('jlpt-n5') || tags.includes('jlpt5')) {
      return false; // Uses modern 5-level scale
    }

    const statJLPT = entry[5]?.jlpt;
    if (statJLPT !== undefined && statJLPT !== null) {
      const value = String(statJLPT).trim().toLowerCase();
      if (value === '5' || value.includes('n5') || value.includes('jlpt5')) {
        return false; // Uses modern 5-level scale
      }
    }
  }
  // Check tag_bank for JLPT definitions
  const tagBank = loadJSON(path.join(KANJIDIC_DIR, 'tag_bank_1.json'));
  if (tagBank) {
    for (const tag of tagBank) {
      if (typeof tag[0] === 'string' && tag[0].toLowerCase().includes('n5')) {
        return false; // Modern scale
      }
    }
  }
  return true; // Assume old scale if no "5" or "n5" found
}

/**
 * Checks if a string contains any kanji character.
 */
function containsKanji(str) {
  return /[\u4E00-\u9FFF\u3400-\u4DBF]/.test(str);
}

/**
 * Extracts individual kanji characters from a string.
 */
function extractKanjiChars(str) {
  return [...str].filter(ch => /[\u4E00-\u9FFF\u3400-\u4DBF]/.test(ch));
}

function uniqueBy(items, getKey) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const key = getKey(item);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}

function splitReadingTokens(value) {
  return String(value || '')
    .split(/[\s、,;；]+/)
    .map(token => token.trim())
    .filter(Boolean);
}

function readingStem(value) {
  return String(value || '')
    .replace(/^-+/, '')
    .split('.')[0]
    .replace(/-+$/g, '')
    .trim();
}

function pickBaseReading(kanjiData) {
  const kunyomi = splitReadingTokens(kanjiData?.kunyomi || '')
    .map(readingStem)
    .find(Boolean);
  if (kunyomi) return kunyomi;

  return splitReadingTokens(kanjiData?.onyomi || '')[0] || '';
}

function isSingleKanjiKanaWord(expression, kChar) {
  const kanjiChars = extractKanjiChars(expression);
  return kanjiChars.length === 1 && kanjiChars[0] === kChar && expression !== kChar;
}

function mergeMeaningParts(...values) {
  const seen = new Set();
  const parts = [];

  for (const value of values) {
    for (const part of String(value || '').split(/[;；,]+/)) {
      const clean = part.trim();
      if (!clean) continue;
      const key = clean.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      parts.push(clean);
    }
  }

  return parts.join('; ');
}

function termReadingsMatch(csvReading, termReading) {
  if (!csvReading || !termReading) return false;
  return splitReadingTokens(csvReading).includes(termReading);
}

function loadOfficialJLPTData(filepath) {
  const empty = {
    available: false,
    kanjiLevelMap: {},
    vocabByKanji: {},
    termsByLevel: Object.fromEntries(ALL_LEVELS.map(level => [level, []])),
    stats: {
      rows: 0,
      termsByLevel: {},
      kanjiByLevel: {},
      overlapCount: 0,
      skippedRows: 0,
    },
  };

  if (!fs.existsSync(filepath)) {
    console.warn(`  Warning: Official JLPT CSV not found: ${filepath}`);
    console.warn('     Falling back to KANJIDIC JLPT metadata only.');
    return empty;
  }

  const rows = parseCSV(fs.readFileSync(filepath, 'utf-8')).filter(row =>
    row.some(field => String(field || '').trim() !== '')
  );

  if (rows.length < 2) {
    console.warn(`  Warning: Official JLPT CSV is empty or missing rows: ${filepath}`);
    return empty;
  }

  const header = rows.shift().map(normalizeHeader);
  const originalIdx = header.indexOf('original') !== -1 ? header.indexOf('original') : 0;
  const furiganaIdx = header.indexOf('furigana') !== -1 ? header.indexOf('furigana') : 1;
  const englishIdx = header.indexOf('english') !== -1 ? header.indexOf('english') : 2;
  const levelIdx = header.indexOf('jlpt level') !== -1 ? header.indexOf('jlpt level') : 3;

  const levelsByKanji = {};
  const vocabByKanji = {};
  const officialTermsByLevel = Object.fromEntries(ALL_LEVELS.map(level => [level, []]));
  const termsByLevel = Object.fromEntries(ALL_LEVELS.map(level => [level, 0]));
  let skippedRows = 0;

  for (const row of rows) {
    const expression = String(row[originalIdx] || '').trim();
    const reading = String(row[furiganaIdx] || '').trim();
    const meaningEn = String(row[englishIdx] || '').trim();
    const level = normalizeCSVLevel(row[levelIdx]);

    if (!expression || !level) {
      skippedRows++;
      continue;
    }

    termsByLevel[level]++;
    officialTermsByLevel[level].push({
      expression,
      reading,
      meaningEn,
      level,
    });

    const kanjiChars = [...new Set(extractKanjiChars(expression))];
    if (!kanjiChars.length) continue;

    for (const kChar of kanjiChars) {
      if (!levelsByKanji[kChar]) levelsByKanji[kChar] = new Set();
      levelsByKanji[kChar].add(level);

      if (!vocabByKanji[kChar]) vocabByKanji[kChar] = [];
      vocabByKanji[kChar].push({
        expression,
        reading,
        meaningEn,
        level,
      });
    }
  }

  const kanjiLevelMap = {};
  let overlapCount = 0;
  for (const [kChar, levels] of Object.entries(levelsByKanji)) {
    if (levels.size > 1) overlapCount++;
    kanjiLevelMap[kChar] = getEasiestLevel(levels);
  }

  const kanjiByLevel = Object.fromEntries(ALL_LEVELS.map(level => [level, 0]));
  for (const level of Object.values(kanjiLevelMap)) {
    kanjiByLevel[level]++;
  }

  return {
    available: true,
    kanjiLevelMap,
    vocabByKanji,
    termsByLevel: officialTermsByLevel,
    stats: {
      rows: rows.length,
      termsByLevel,
      kanjiByLevel,
      overlapCount,
      skippedRows,
    },
  };
}

/**
 * Cleans and normalizes glossary entries from JMdict.
 * JMdict glossary can be strings or structured objects.
 */
function normalizeGlossary(glossaryArray) {
  if (!Array.isArray(glossaryArray)) return '';

  return glossaryArray
    .map(g => {
      if (typeof g === 'string') return g;
      if (typeof g === 'object' && g !== null) {
        // Yomitan structured content
        if (g.type === 'text') return g.text || '';
        if (g.type === 'structured-content') return ''; // Skip complex HTML
        if (g.content) return typeof g.content === 'string' ? g.content : '';
        return '';
      }
      return String(g);
    })
    .filter(Boolean)
    .join('; ');
}

// ── Main Pipeline ──────────────────────────────────────────

function getOfficialVocabForLevel(kanjiData, level) {
  const officialVocabulary = kanjiData?.officialVocabulary || [];
  const exactLevel = officialVocabulary.filter(vocab => vocab.level === level);
  if (exactLevel.length > 0) return exactLevel;

  return officialVocabulary
    .slice()
    .sort((a, b) => LEVEL_RANK[a.level] - LEVEL_RANK[b.level]);
}

function findBestTerm(termEntriesByExpression, expression, reading = '') {
  const candidates = termEntriesByExpression[expression] || [];
  if (!candidates.length) return null;

  return candidates.find(entry => termReadingsMatch(reading, entry.reading)) || candidates[0];
}

function hydrateOfficialVocab(vocab, termEntriesByExpression) {
  if (!vocab) return null;

  const term = findBestTerm(termEntriesByExpression, vocab.expression, vocab.reading);
  return {
    expression: vocab.expression,
    reading: term?.reading || splitReadingTokens(vocab.reading)[0] || vocab.reading || '',
    meaningEs: term?.meaningEs || vocab.meaningEn || '',
    partOfSpeech: term?.partOfSpeech || 'vocabulary',
    score: typeof term?.score === 'number' ? term.score : 0,
    level: vocab.level,
    official: true,
  };
}

function pickPedagogicalVocab(vocabEntries, kanjiData, level, termEntriesByExpression) {
  const officialVocab = getOfficialVocabForLevel(kanjiData, level);
  const hydratedOfficial = officialVocab
    .map(vocab => hydrateOfficialVocab(vocab, termEntriesByExpression))
    .filter(Boolean);

  return hydratedOfficial.find(vocab => isSingleKanjiKanaWord(vocab.expression, kanjiData.character))
    || hydratedOfficial.find(vocab => vocab.expression === kanjiData.character)
    || hydratedOfficial[0]
    || vocabEntries.find(entry => isSingleKanjiKanaWord(entry.expression, kanjiData.character))
    || vocabEntries[0]
    || null;
}

function buildAdditionalVocab(vocabEntries, kanjiData, level, representativeExpression, termEntriesByExpression) {
  const official = getOfficialVocabForLevel(kanjiData, level)
    .map(vocab => hydrateOfficialVocab(vocab, termEntriesByExpression))
    .filter(Boolean);

  return uniqueBy([...official, ...vocabEntries], entry => entry.expression)
    .filter(entry => entry.expression !== representativeExpression)
    .filter(entry => entry.expression && entry.reading && entry.meaningEs)
    .slice(0, 3)
    .map(entry => ({
      word: entry.expression,
      reading: entry.reading,
      meaning: entry.meaningEs,
    }));
}

function buildKanjiMeaning(kanjiData, representative) {
  if (representative?.meaningEs && isSingleKanjiKanaWord(representative.expression, kanjiData.character)) {
    return representative.meaningEs;
  }

  return mergeMeaningParts(...(kanjiData.meanings || []), representative?.meaningEs);
}

function buildVocabularyRecord(officialTerm, level, termEntriesByExpression) {
  const term = findBestTerm(termEntriesByExpression, officialTerm.expression, officialTerm.reading);
  const components = [...new Set(extractKanjiChars(officialTerm.expression))];
  if (!components.length) return null;
  if ([...officialTerm.expression].length === 1 && components.length === 1) return null;

  return {
    kanji: officialTerm.expression,
    reading: term?.reading || splitReadingTokens(officialTerm.reading)[0] || officialTerm.reading || '',
    meaningEs: term?.meaningEs || officialTerm.meaningEn || '',
    partOfSpeech: term?.partOfSpeech || 'vocabulary',
    level,
    entryType: 'vocabulary',
    components,
    source: term ? 'official-csv+jmdict' : 'official-csv-fallback',
  };
}

function buildDatasets(targetLevels) {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  KamiJi Dictionary Dataset Builder               ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log();

  // ── Step 1: Load KANJIDIC ────────────────────────────────
  console.log('📖 Loading KANJIDIC (kanji_bank)...');
  const kanjiBank = loadAllBanks(KANJIDIC_DIR, 'kanji_bank');
  if (!kanjiBank.length) {
    console.error('❌ No kanji_bank files found in', KANJIDIC_DIR);
    console.error('   Place your KANJIDIC Yomitan files in scripts/raw/kanjidic/');
    process.exit(1);
  }
  console.log(`   Found ${kanjiBank.length} kanji entries`);

  // Detect JLPT scale
  const usesOldScale = detectJLPTScale(kanjiBank);
  console.log(`   JLPT scale: ${usesOldScale ? 'Old (1-4)' : 'Modern (N5-N1)'}`);

  console.log('\nLoading official JLPT vocabulary CSV...');
  const officialJLPT = loadOfficialJLPTData(OFFICIAL_JLPT_CSV);
  if (officialJLPT.available) {
    console.log(`   Found ${officialJLPT.stats.rows} official vocab rows`);
    for (const level of ALL_LEVELS) {
      console.log(`   ${level.toUpperCase()}: ${officialJLPT.stats.kanjiByLevel[level]} unique kanji assigned from CSV`);
    }
    if (officialJLPT.stats.overlapCount > 0) {
      console.log(`   ${officialJLPT.stats.overlapCount} kanji appear in multiple CSV levels; using earliest/easiest level`);
    }
  }

  // ── Step 2: Index kanji by JLPT level ────────────────────
  console.log('\n📊 Indexing kanji by JLPT level...');
  const kanjiByLevel = {};
  const kanjiDataMap = {}; // char -> { onyomi, kunyomi, meanings, tags }
  const unclassifiedKanji = [];
  const levelSourceStats = {
    officialCsv: 0,
    kanjidicFallback: 0,
    officialOnly: 0,
    unclassified: 0,
    recoveredNoKanjidicJlpt: 0,
    conflicts: 0,
  };
  const conflictSamples = [];

  for (const level of ALL_LEVELS) {
    kanjiByLevel[level] = [];
  }

  function addKanjiToLevel(level, character) {
    if (!level || !kanjiByLevel[level]) return;
    if (!kanjiByLevel[level].includes(character)) {
      kanjiByLevel[level].push(character);
    }
  }

  for (const entry of kanjiBank) {
    // Schema: [character, onyomi, kunyomi, tags, [meanings], {stats}]
    const [character, onyomi, kunyomi, tags, meanings, stats] = entry;

    if (!character || typeof character !== 'string') continue;

    const officialLevel = officialJLPT.kanjiLevelMap[character] || null;
    const kanjidicLevel = extractJLPTLevel(tags, stats, usesOldScale);
    const level = officialLevel || kanjidicLevel;
    const levelSource = officialLevel ? 'official-csv' : (kanjidicLevel ? 'kanjidic-fallback' : 'unclassified');

    if (!kanjidicLevel && officialLevel) {
      levelSourceStats.recoveredNoKanjidicJlpt++;
    }

    if (officialLevel && kanjidicLevel && officialLevel !== kanjidicLevel) {
      levelSourceStats.conflicts++;
      if (conflictSamples.length < 10) {
        conflictSamples.push({ kanji: character, officialLevel, kanjidicLevel });
      }
    }

    kanjiDataMap[character] = {
      character,
      onyomi: onyomi || '',
      kunyomi: kunyomi || '',
      meanings: Array.isArray(meanings) ? meanings : [],
      tags: tags || '',
      stats: stats || {},
      officialVocabulary: officialJLPT.vocabByKanji[character] || [],
      officialLevel,
      kanjidicLevel,
      levelSource,
    };

    if (level) {
      addKanjiToLevel(level, character);
      if (officialLevel) {
        levelSourceStats.officialCsv++;
      } else {
        levelSourceStats.kanjidicFallback++;
      }
    } else {
      levelSourceStats.unclassified++;
      unclassifiedKanji.push({
        kanji: character,
        onyomi: onyomi || '',
        kunyomi: kunyomi || '',
        meaningFromKanjidic: Array.isArray(meanings) ? meanings.join('; ') : '',
        reason: 'not_found_in_official_csv_or_kanjidic_jlpt',
      });
    }
  }

  for (const [character, officialLevel] of Object.entries(officialJLPT.kanjiLevelMap)) {
    if (kanjiDataMap[character]) continue;

    kanjiDataMap[character] = {
      character,
      onyomi: '',
      kunyomi: '',
      meanings: [],
      tags: '',
      stats: {},
      officialVocabulary: officialJLPT.vocabByKanji[character] || [],
      officialLevel,
      kanjidicLevel: null,
      levelSource: 'official-csv-only',
    };

    addKanjiToLevel(officialLevel, character);
    levelSourceStats.officialOnly++;
  }

  console.log(`   Level source: ${levelSourceStats.officialCsv} from official CSV, ${levelSourceStats.kanjidicFallback} from KANJIDIC fallback, ${levelSourceStats.officialOnly} CSV-only`);
  if (levelSourceStats.recoveredNoKanjidicJlpt > 0) {
    console.log(`   Recovered ${levelSourceStats.recoveredNoKanjidicJlpt} KANJIDIC kanji with no JLPT tag via official CSV`);
  }
  if (levelSourceStats.conflicts > 0) {
    console.log(`   Resolved ${levelSourceStats.conflicts} official-vs-KANJIDIC level conflicts in favor of the CSV`);
    console.log(`   Conflict samples: ${conflictSamples.map(sample => `${sample.kanji}:${sample.kanjidicLevel}->${sample.officialLevel}`).join(', ')}`);
  }
  if (levelSourceStats.unclassified > 0) {
    console.log(`   ${levelSourceStats.unclassified} KANJIDIC kanji still have no level source; writing review report later`);
  }

  for (const level of ALL_LEVELS) {
    console.log(`   ${level.toUpperCase()}: ${kanjiByLevel[level].length} kanji`);
  }

  // ── Step 3: Load JMdict-ES ───────────────────────────────
  console.log('\n📚 Loading JMdict-ES (term_bank)...');
  const termBank = loadAllBanks(JMDICT_DIR, 'term_bank');
  if (!termBank.length) {
    console.error('❌ No term_bank files found in', JMDICT_DIR);
    console.error('   Place your JMdict-ES Yomitan files in scripts/raw/jmdict/');
    process.exit(1);
  }
  console.log(`   Found ${termBank.length} vocabulary entries`);

  // ── Step 4: Build kanji→vocab index ──────────────────────
  console.log('\n🔗 Cross-referencing kanji ↔ vocabulary...');

  // Map: kanjiChar -> [{ expression, reading, meaningEs, partOfSpeech, score }]
  const kanjiVocabMap = {};
  // Map: expression -> JMdict candidates. Used for exact compound lookups.
  const termEntriesByExpression = {};

  for (const term of termBank) {
    // Schema: [expression, reading, defTags, rules, score, [glossary], seqNum, termTags]
    const [expression, reading, defTags, rules, score, glossary] = term;

    if (!expression || !containsKanji(expression)) continue;

    const meaningEs = normalizeGlossary(glossary);
    if (!meaningEs) continue;

    const vocabEntry = {
      expression,
      reading: reading || '',
      meaningEs,
      partOfSpeech: defTags || rules || '',
      score: typeof score === 'number' ? score : 0,
    };

    if (!termEntriesByExpression[expression]) {
      termEntriesByExpression[expression] = [];
    }
    termEntriesByExpression[expression].push(vocabEntry);

    const kanjiChars = [...new Set(extractKanjiChars(expression))];

    for (const kChar of kanjiChars) {
      if (!kanjiVocabMap[kChar]) {
        kanjiVocabMap[kChar] = [];
      }

      kanjiVocabMap[kChar].push(vocabEntry);
    }
  }

  // Sort vocab by score (higher = more common) for each kanji
  for (const kChar of Object.keys(kanjiVocabMap)) {
    kanjiVocabMap[kChar].sort((a, b) => b.score - a.score);
  }
  for (const expression of Object.keys(termEntriesByExpression)) {
    termEntriesByExpression[expression].sort((a, b) => b.score - a.score);
  }

  console.log(`   Indexed vocab for ${Object.keys(kanjiVocabMap).length} unique kanji`);

  // ── Step 5: Build datasets per level ─────────────────────
  console.log('\n🏗  Building datasets...');
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(GAPS_DIR, { recursive: true });

  const unclassifiedPath = path.join(GAPS_DIR, 'unclassified-kanji.json');
  if (unclassifiedKanji.length > 0) {
    fs.writeFileSync(unclassifiedPath, JSON.stringify(unclassifiedKanji, null, 2), 'utf-8');
    console.log(`   Review needed: ${unclassifiedKanji.length} unclassified kanji -> ${unclassifiedPath}`);
  } else if (fs.existsSync(unclassifiedPath)) {
    fs.unlinkSync(unclassifiedPath);
  }

  const stats = {};
  const manifest = {
    schemaVersion: DATASET_SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    sources: {
      kanjidic: path.relative(path.join(__dirname, '..'), KANJIDIC_DIR).replace(/\\/g, '/'),
      jmdict: path.relative(path.join(__dirname, '..'), JMDICT_DIR).replace(/\\/g, '/'),
      officialJlptCsv: fs.existsSync(OFFICIAL_JLPT_CSV)
        ? path.relative(path.join(__dirname, '..'), OFFICIAL_JLPT_CSV).replace(/\\/g, '/')
        : null,
    },
    levels: {},
  };

  for (const level of targetLevels) {
    const kanjiList = kanjiByLevel[level];
    if (!kanjiList || !kanjiList.length) {
      console.log(`   ${level.toUpperCase()}: Skipped (0 kanji found)`);
      stats[level] = { total: 0, withVocab: 0, gaps: 0 };
      continue;
    }

    const dataset = [];
    const gaps = [];

    for (const kChar of kanjiList) {
      const kanjiData = kanjiDataMap[kChar];
      if (!kanjiData) continue;

      const vocabEntries = kanjiVocabMap[kChar] || [];
      const officialContext = getOfficialVocabForLevel(kanjiData, level).slice(0, 5);
      const representative = pickPedagogicalVocab(
        vocabEntries,
        kanjiData,
        level,
        termEntriesByExpression
      );
      const additionalVocab = buildAdditionalVocab(
        vocabEntries,
        kanjiData,
        level,
        representative?.expression,
        termEntriesByExpression
      );

      if (vocabEntries.length === 0) {
        // GAP: Kanji exists in KANJIDIC but has no JMdict vocab match
        gaps.push({
          kanji: kChar,
          onyomi: kanjiData.onyomi,
          kunyomi: kanjiData.kunyomi,
          meaningFromKanjidic: kanjiData.meanings.join('; '),
          levelSource: kanjiData.levelSource,
          officialLevel: kanjiData.officialLevel,
          kanjidicLevel: kanjiData.kanjidicLevel,
          officialVocab: officialContext,
          reason: 'no_vocab_match',
          suggestion: `No JMdict-ES vocabulary found containing "${kChar}". Needs AI-generated vocab entry.`,
        });

        // Still create a basic entry from KANJIDIC, with CSV vocab as fallback.
        dataset.push({
          kanji: kChar,
          reading: pickBaseReading(kanjiData) || representative?.reading || kChar,
          meaningEs: buildKanjiMeaning(kanjiData, representative),
          onyomi: kanjiData.onyomi,
          kunyomi: kanjiData.kunyomi,
          partOfSpeech: 'kanji',
          level,
          entryType: 'kanji',
          representativeWord: representative?.expression,
          representativeWordReading: representative?.reading,
          source: representative ? 'kanjidic+official-csv' : 'kanjidic-fallback',
          ...(additionalVocab.length > 0 && { additionalVocab }),
        });
      } else {
        // Prefer a JMdict entry that also appears in the official JLPT CSV.
        const best = representative || vocabEntries[0];
        const matchedOfficialExpression = officialContext.some(vocab => vocab.expression === best.expression);

        // Also collect up to 3 secondary vocab entries for richer data
        const secondaryVocab = additionalVocab;

        dataset.push({
          kanji: kChar,
          reading: pickBaseReading(kanjiData) || best.reading || kChar,
          meaningEs: buildKanjiMeaning(kanjiData, best),
          onyomi: kanjiData.onyomi,
          kunyomi: kanjiData.kunyomi,
          partOfSpeech: 'kanji',
          level,
          entryType: 'kanji',
          // Representative word from JMdict
          representativeWord: best.expression,
          representativeWordReading: best.reading,
          source: matchedOfficialExpression ? 'kanjidic+official-csv+jmdict' : 'kanjidic+jmdict',
          // Additional vocab (optional enrichment)
          ...(secondaryVocab.length > 0 && { additionalVocab: secondaryVocab }),
        });
      }
    }

    const seenVocabulary = new Set(dataset.map(entry => `${entry.kanji}\t${entry.reading}`));
    for (const officialTerm of officialJLPT.termsByLevel[level] || []) {
      const vocabularyRecord = buildVocabularyRecord(officialTerm, level, termEntriesByExpression);
      if (!vocabularyRecord || !vocabularyRecord.meaningEs) continue;

      const key = `${vocabularyRecord.kanji}\t${vocabularyRecord.reading}`;
      if (seenVocabulary.has(key)) continue;
      seenVocabulary.add(key);
      dataset.push(vocabularyRecord);
    }

    // Sort dataset alphabetically by kanji for consistency
    dataset.sort((a, b) => a.kanji.localeCompare(b.kanji));

    // Write dataset
    const outPath = path.join(OUTPUT_DIR, `${level}-jmdict.json`);
    const datasetJson = JSON.stringify(dataset, null, 2);
    fs.writeFileSync(outPath, datasetJson, 'utf-8');
    manifest.levels[level] = {
      file: `${level}-jmdict.json`,
      entries: dataset.length,
      checksum: sha256(datasetJson),
      gaps: gaps.length,
    };

    // Write gaps
    const gapsPath = path.join(GAPS_DIR, `${level}-gaps.json`);
    if (gaps.length > 0) {
      fs.writeFileSync(gapsPath, JSON.stringify(gaps, null, 2), 'utf-8');
    } else if (fs.existsSync(gapsPath)) {
      fs.unlinkSync(gapsPath);
    }

    stats[level] = {
      total: kanjiList.length,
      withVocab: kanjiList.length - gaps.length,
      gaps: gaps.length,
      outputFile: outPath,
    };

    const gapPct = kanjiList.length > 0
      ? ((gaps.length / kanjiList.length) * 100).toFixed(1)
      : '0.0';

    console.log(`   ${level.toUpperCase()}: ${dataset.length} entries written → ${outPath}`);
    if (gaps.length > 0) {
      console.log(`      ⚠ ${gaps.length} gaps (${gapPct}%) → scripts/gaps/${level}-gaps.json`);
    }
  }

  const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

  // ── Step 6: Summary ──────────────────────────────────────
  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║  Build Summary                                   ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log();
  console.log('  Level │ Total │ Matched │  Gaps  │ File');
  console.log('  ──────┼───────┼─────────┼────────┼──────────────────');
  for (const level of targetLevels) {
    const s = stats[level];
    if (!s) continue;
    const matched = String(s.withVocab).padStart(5);
    const gaps = String(s.gaps).padStart(5);
    const total = String(s.total).padStart(5);
    const file = s.outputFile ? path.basename(s.outputFile) : 'skipped';
    console.log(`  ${level.toUpperCase()}   │${total} │${matched}   │${gaps}  │ ${file}`);
  }

  const totalGaps = targetLevels.reduce((sum, l) => sum + (stats[l]?.gaps || 0), 0);
  if (totalGaps > 0) {
    console.log(`\n  ⚠ Total gaps: ${totalGaps} kanji without JMdict vocab match.`);
    console.log('    Run: node scripts/fill-gaps.js to generate AI-assisted entries.');
  }

  console.log('\n✅ Done!\n');
}

// ── CLI ────────────────────────────────────────────────────
const args = process.argv.slice(2);
let targetLevels = ALL_LEVELS;

const levelIdx = args.indexOf('--level');
if (levelIdx !== -1 && args[levelIdx + 1]) {
  targetLevels = args[levelIdx + 1].split(',').map(l => l.trim().toLowerCase());
  // Validate
  for (const l of targetLevels) {
    if (!ALL_LEVELS.includes(l)) {
      console.error(`❌ Invalid level: "${l}". Valid levels: ${ALL_LEVELS.join(', ')}`);
      process.exit(1);
    }
  }
}

// Verify raw directories exist
if (!fs.existsSync(KANJIDIC_DIR)) {
  console.error('❌ KANJIDIC directory not found:', KANJIDIC_DIR);
  console.error('\nSetup instructions:');
  console.error('  1. Download KANJIDIC_spanish Yomitan dictionary');
  console.error('  2. Unzip into scripts/raw/kanjidic/');
  console.error('     Expected files: kanji_bank_1.json, tag_bank_1.json, index.json');
  process.exit(1);
}

if (!fs.existsSync(JMDICT_DIR)) {
  console.error('❌ JMdict-ES directory not found:', JMDICT_DIR);
  console.error('\nSetup instructions:');
  console.error('  1. Download JMdict_spanish Yomitan dictionary');
  console.error('  2. Unzip into scripts/raw/jmdict/');
  console.error('     Expected files: term_bank_1.json through term_bank_6.json, tag_bank_1.json, index.json');
  process.exit(1);
}

buildDatasets(targetLevels);
