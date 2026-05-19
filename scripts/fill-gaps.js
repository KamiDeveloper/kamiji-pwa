#!/usr/bin/env node
/**
 * KamiJi Gap Filler — AI-Assisted Dictionary Completion
 * ======================================================
 * Reads gap files produced by build-dataset.js and uses Gemini AI
 * to generate high-quality vocabulary entries for kanji that had
 * no JMdict-ES match.
 *
 * Usage:
 *   node scripts/fill-gaps.js --level n5                    # Fill N5 gaps
 *   node scripts/fill-gaps.js --level n5 --dry-run          # Preview without writing
 *   node scripts/fill-gaps.js --level n5 --key AIza...      # Pass API key directly
 *
 * Requires:
 *   - GEMINI_API_KEY env var or --key flag
 *   - scripts/gaps/n5-gaps.json (produced by build-dataset.js)
 *
 * Output:
 *   Merges AI-generated entries into public/data/n5-jmdict.json
 *   Moves processed gap file to scripts/gaps/n5-gaps.filled.json
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const GAPS_DIR = path.join(__dirname, 'gaps');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data');

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function updateManifest(level, datasetJson, entryCount) {
  const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
  if (!fs.existsSync(manifestPath)) return;

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  manifest.schemaVersion = Math.max(3, Number(manifest.schemaVersion) || 0);
  manifest.generatedAt = new Date().toISOString();
  manifest.levels = manifest.levels || {};
  manifest.levels[level] = {
    ...(manifest.levels[level] || {}),
    file: `${level}-jmdict.json`,
    entries: entryCount,
    checksum: sha256(datasetJson),
    gaps: 0,
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
}

// ── Gemini API ─────────────────────────────────────────────
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn('⚠️  No GEMINI_API_KEY found in environment variables.');
  console.warn('   Set GEMINI_API_KEY or use --key flag to enable AI generation.');
  console.warn('   Running with --dry-run will allow you to preview prompts without API calls.');
}

async function callGemini(apiKey, prompt, responseJsonSchema) {
  // Use dynamic import for ES module
  const { GoogleGenAI, ThinkingLevel } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseJsonSchema,
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.LOW, // Low thinking for factual structured extraction
      },
      temperature: 0.3,
    },
  });

  return response.text;
}

/**
 * Generates vocabulary entries for a batch of gap kanji using Gemini.
 */
async function generateEntries(apiKey, gaps, level) {
  const kanjiList = gaps.map(g => g.kanji).join(', ');
  const kanjiContext = gaps.map(g => {
    const officialExamples = Array.isArray(g.officialVocab)
      ? g.officialVocab
        .slice(0, 3)
        .map(v => `${v.expression}${v.reading ? ` (${v.reading})` : ''}${v.meaningEn ? ` = ${v.meaningEn}` : ''}`)
        .join('; ')
      : '';
    const kanjidicMeaning = g.meaningFromKanjidic ? `KANJIDIC meaning: ${g.meaningFromKanjidic}` : '';
    const officialHint = officialExamples ? `Official JLPT examples: ${officialExamples}` : '';
    return `- ${g.kanji}: ${[kanjidicMeaning, officialHint].filter(Boolean).join(' | ')}`;
  }).join('\n');

  const responseSchema = {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        kanji: { type: 'string', description: 'The kanji character being processed' },
        representativeWord: { type: 'string', description: 'Most common everyday word using this kanji at the target JLPT level' },
        reading: { type: 'string', description: 'Hiragana reading of the representative word' },
        meaningEs: { type: 'string', description: 'Meaning in Spanish, multiple senses separated by semicolons, max 3-4 options' },
        partOfSpeech: { type: 'string', description: 'Part of speech: noun, verb-ichidan, verb-godan, adjective-i, adjective-na, adverb, etc.' },
      },
      required: ['kanji', 'representativeWord', 'reading', 'meaningEs', 'partOfSpeech'],
    },
  };

  const prompt = `You are a Japanese language expert helping build a Spanish-language kanji learning dictionary.

For each of the following kanji characters, generate a vocabulary entry with:
1. A common representative word using that kanji
2. Its reading in hiragana
3. Its meaning in Spanish (concise, semicolon-separated if multiple)
4. Part of speech in English (noun, verb-ichidan, verb-godan, adjective-i, adjective-na, adverb, etc.)

Target JLPT level: ${level.toUpperCase()} — choose vocabulary appropriate for this proficiency level.

Kanji to process: ${kanjiList}

Available context:
${kanjiContext}

Rules:
- Choose the most common, useful word for each kanji at the ${level.toUpperCase()} level
- Prefer the official JLPT example when it is natural and contains the target kanji
- Meanings MUST be in Spanish
- Keep meanings concise (max 3-4 options separated by semicolons)
- If the kanji itself is commonly used as a standalone word, use that
- Prefer concrete, everyday vocabulary over abstract/literary words`;

  const rawResponse = await callGemini(apiKey, prompt, responseSchema);

  try {
    return JSON.parse(rawResponse);
  } catch (err) {
    console.error('  ❌ Failed to parse Gemini response:', err.message);
    console.error('  Raw response:', rawResponse.substring(0, 500));
    return [];
  }
}

// ── Main ───────────────────────────────────────────────────

async function fillGaps(level, apiKey, dryRun) {
  const gapsPath = path.join(GAPS_DIR, `${level}-gaps.json`);
  const dataPath = path.join(OUTPUT_DIR, `${level}-jmdict.json`);

  if (!fs.existsSync(gapsPath)) {
    console.log(`✅ No gaps file for ${level.toUpperCase()} — nothing to fill.`);
    return;
  }

  const gaps = JSON.parse(fs.readFileSync(gapsPath, 'utf-8'));
  if (!gaps.length) {
    console.log(`✅ ${level.toUpperCase()} gaps file is empty — nothing to fill.`);
    return;
  }

  console.log(`\n🔧 Filling ${gaps.length} gaps for ${level.toUpperCase()}...`);

  if (dryRun) {
    console.log('  [DRY RUN] Would generate entries for:');
    gaps.forEach(g => {
      const officialExamples = Array.isArray(g.officialVocab)
        ? g.officialVocab.slice(0, 2).map(v => v.expression).join(', ')
        : '';
      console.log(`    - ${g.kanji}: ${g.meaningFromKanjidic || officialExamples || '(no local context)'}`);
    });
    return;
  }

  // Process in batches of 20 to avoid hitting token limits
  const BATCH_SIZE = 20;
  const allGenerated = [];

  for (let i = 0; i < gaps.length; i += BATCH_SIZE) {
    const batch = gaps.slice(i, i + BATCH_SIZE);
    console.log(`  Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(gaps.length / BATCH_SIZE)} (${batch.length} kanji)...`);

    try {
      const entries = await generateEntries(apiKey, batch, level);
      allGenerated.push(...entries);
      console.log(`    ✓ Generated ${entries.length} entries`);

      // Rate limit protection
      if (i + BATCH_SIZE < gaps.length) {
        await new Promise(r => setTimeout(r, 2000));
      }
    } catch (err) {
      console.error(`    ❌ Batch failed: ${err.message}`);
    }
  }

  if (!allGenerated.length) {
    console.error('  ❌ No entries generated. Check your API key and try again.');
    return;
  }

  // Load existing dataset
  let dataset = [];
  if (fs.existsSync(dataPath)) {
    dataset = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  }

  // Merge: update existing gap entries with AI data
  let merged = 0;
  for (const gen of allGenerated) {
    const existing = dataset.find(d => d.kanji === gen.kanji);
    if (existing) {
      // Update the gap entry with AI-generated vocab
      existing.reading = gen.reading || existing.reading;
      existing.meaningEs = gen.meaningEs || existing.meaningEs;
      existing.partOfSpeech = gen.partOfSpeech || existing.partOfSpeech;
      existing.entryType = 'kanji';
      existing.representativeWord = gen.representativeWord;
      existing.representativeWordReading = gen.reading;
      existing.source = 'ai-generated';
      merged++;
    } else {
      // Kanji not in dataset yet — find its KANJIDIC data from gaps
      const gapEntry = gaps.find(g => g.kanji === gen.kanji);
      dataset.push({
        kanji: gen.kanji,
        reading: gen.reading,
        meaningEs: gen.meaningEs,
        onyomi: gapEntry?.onyomi || '',
        kunyomi: gapEntry?.kunyomi || '',
        partOfSpeech: gen.partOfSpeech || 'unknown',
        level,
        entryType: 'kanji',
        representativeWord: gen.representativeWord,
        representativeWordReading: gen.reading,
        source: 'ai-generated',
      });
      merged++;
    }
  }

  // Sort and write
  dataset.sort((a, b) => a.kanji.localeCompare(b.kanji));
  const datasetJson = JSON.stringify(dataset, null, 2);
  fs.writeFileSync(dataPath, datasetJson, 'utf-8');
  updateManifest(level, datasetJson, dataset.length);

  // Archive the gaps file
  const filledPath = path.join(GAPS_DIR, `${level}-gaps.filled.json`);
  fs.renameSync(gapsPath, filledPath);

  console.log(`  ✅ Merged ${merged} AI-generated entries into ${path.basename(dataPath)}`);
  console.log(`  📁 Gaps archived to ${path.basename(filledPath)}`);
}

// ── CLI ────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  // Parse --level
  const levelIdx = args.indexOf('--level');
  if (levelIdx === -1 || !args[levelIdx + 1]) {
    console.error('Usage: node scripts/fill-gaps.js --level n5 [--dry-run] [--key YOUR_KEY]');
    process.exit(1);
  }
  const levels = args[levelIdx + 1].split(',').map(l => l.trim().toLowerCase());

  // Parse --key
  const keyIdx = args.indexOf('--key');
  const apiKey = (keyIdx !== -1 && args[keyIdx + 1])
    ? args[keyIdx + 1]
    : process.env.GEMINI_API_KEY;

  const dryRun = args.includes('--dry-run');

  if (!apiKey && !dryRun) {
    console.error('❌ No API key provided.');
    console.error('   Set GEMINI_API_KEY env var or use --key flag.');
    console.error('   Use --dry-run to preview without API calls.');
    process.exit(1);
  }

  for (const level of levels) {
    await fillGaps(level, apiKey, dryRun);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
