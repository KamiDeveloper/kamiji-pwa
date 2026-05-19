// lib/engine/gemini-layer.ts
// Client-only: uses browser Web Crypto API and GoogleGenAI SDK.
//
// The `encryptedKey` parameter is a JSON-encoded string containing the
// BYOK fields: { encrypted: string; salt: string; iv: string; pin: string }
// The caller is responsible for bundling the user's PIN with the stored
// encrypted key data before invoking this function.

import { GoogleGenAI } from '@google/genai';
import { decryptGeminiKey } from '@/lib/crypto/byok';
import type { JLPTLevel, TranslationResult, EngineError } from './types';

const MODEL = 'gemini-3-flash-preview';

const THINKING_BUDGET: Record<JLPTLevel, number> = {
  n5: 0,
  n4: 0,
  n3: 512,
  n2: 1024,
  n1: 1024,
};

interface EncryptedKeyBundle {
  encrypted: string;
  salt: string;
  iv: string;
  pin: string;
}

function classifyError(error: unknown): EngineError {
  const msg = error instanceof Error ? error.message : String(error);
  const lower = msg.toLowerCase();

  if (lower.includes('timeout') || lower.includes('aborted')) {
    return {
      type: 'offline',
      message: 'La conexión tardó demasiado. Verifica tu conexión a internet.',
    };
  }

  if (lower.includes('failed to fetch') || lower.includes('networkerror') || lower.includes('network')) {
    return {
      type: 'offline',
      message: 'Sin conexión a internet. Usando diccionario local.',
    };
  }

  // Check for HTTP status codes in the error message
  const status429 = lower.includes('429') || lower.includes('resource_exhausted') || lower.includes('quota');
  if (status429) {
    // Try to find a Retry-After value (not always available via SDK)
    return {
      type: 'rate-limit-daily',
      message: 'Límite diario de Gemini alcanzado. Usando diccionario local.',
    };
  }

  if (lower.includes('401') || lower.includes('403') || lower.includes('api_key') || lower.includes('invalid') || lower.includes('permission')) {
    return {
      type: 'invalid-key',
      message: 'Clave de API inválida. Revisa tu configuración en Ajustes.',
    };
  }

  return {
    type: 'unknown',
    message: 'Error desconocido al contactar Gemini. Usando diccionario local.',
  };
}

function buildPrompt(kanjiChar: string, context: string, level: JLPTLevel): string {
  return `Eres un experto en japonés. Analiza el kanji "${kanjiChar}" que aparece en el contexto: "${context}".
El texto es de nivel JLPT ${level.toUpperCase()}.

Responde ÚNICAMENTE con un objeto JSON válido (sin markdown, sin bloques de código) con exactamente esta estructura:
{
  "reading": "lectura en hiragana",
  "meaningEs": "significado principal en español (máx 60 caracteres)",
  "partOfSpeech": "tipo gramatical en español (sustantivo, verbo, adjetivo, etc.)",
  "onyomi": ["ON1", "ON2"],
  "kunyomi": ["kun1", "kun2"],
  "exampleJp": "oración de ejemplo en japonés usando este kanji",
  "exampleEs": "traducción al español de la oración de ejemplo",
  "additionalVocab": [
    { "word": "palabra", "reading": "lectura", "meaning": "significado en español" }
  ]
}

Si no hay lecturas on'yomi o kun'yomi, usa arrays vacíos. Incluye hasta 2 palabras adicionales en additionalVocab.`;
}

function cleanString(value: unknown, fallback = ''): string {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function cleanStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const cleaned = value
    .map((item) => cleanString(item))
    .filter(Boolean);
  return cleaned.length > 0 ? cleaned : undefined;
}

function cleanAdditionalVocab(value: unknown): TranslationResult['additionalVocab'] {
  if (!Array.isArray(value)) return undefined;
  const cleaned = value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const record = item as Record<string, unknown>;
      const word = cleanString(record['word']);
      const reading = cleanString(record['reading']);
      const meaning = cleanString(record['meaning']);
      return word && (reading || meaning) ? { word, reading, meaning } : null;
    })
    .filter((item): item is { word: string; reading: string; meaning: string } => item !== null)
    .slice(0, 3);

  return cleaned.length > 0 ? cleaned : undefined;
}

/**
 * Query the Gemini AI to get a full translation for a kanji character.
 *
 * @param kanjiChar - The kanji character to translate
 * @param context - The surrounding sentence/text for context
 * @param level - JLPT level for thinking budget calibration
 * @param encryptedKey - JSON string containing { encrypted, salt, iv, pin }
 * @throws {EngineError} if the API call fails — callers should check error type
 */
export async function queryGemini(
  kanjiChar: string,
  context: string,
  level: JLPTLevel,
  encryptedKey: string
): Promise<TranslationResult> {
  // Decrypt the API key from the BYOK bundle
  let bundle: EncryptedKeyBundle;
  try {
    bundle = JSON.parse(encryptedKey) as EncryptedKeyBundle;
  } catch {
    const err: EngineError = {
      type: 'invalid-key',
      message: 'Formato de clave API inválido. Reconfigura tu clave en Ajustes.',
    };
    throw err;
  }

  let apiKey: string;
  try {
    apiKey = await decryptGeminiKey(bundle.encrypted, bundle.salt, bundle.iv, bundle.pin);
  } catch {
    const err: EngineError = {
      type: 'invalid-key',
      message: 'No se pudo descifrar la clave API. PIN incorrecto o datos corruptos.',
    };
    throw err;
  }

  const thinkingBudget = THINKING_BUDGET[level];
  const prompt = buildPrompt(kanjiChar, context, level);

  // 10-second timeout via Promise.race
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), 10_000)
  );

  let rawText: string;
  try {
    const ai = new GoogleGenAI({ apiKey });

    const generatePromise = ai.models.generateContent({
      model: MODEL,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        ...(thinkingBudget > 0 && {
          thinkingConfig: { thinkingBudget },
        }),
        responseMimeType: 'application/json',
      },
    });

    const response = await Promise.race([generatePromise, timeoutPromise]);
    rawText = response.text ?? '';
  } catch (error: unknown) {
    // Re-throw already-classified EngineErrors
    if (
      error !== null &&
      typeof error === 'object' &&
      'type' in error &&
      'message' in error
    ) {
      throw error;
    }
    throw classifyError(error);
  }

  // Parse JSON response
  let parsed: Record<string, unknown>;
  try {
    // Strip markdown code fences if the model adds them despite responseMimeType
    const clean = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
    parsed = JSON.parse(clean) as Record<string, unknown>;
  } catch {
    const err: EngineError = {
      type: 'broken-response',
      message: 'Respuesta inesperada de Gemini. Usando diccionario local.',
    };
    throw err;
  }

  const exampleEs = cleanString(parsed['exampleEs']);

  return {
    kanji: kanjiChar,
    reading: cleanString(parsed['reading'], kanjiChar),
    meaningEs: cleanString(parsed['meaningEs'], '(sin traduccion)'),
    source: 'ai',
    partOfSpeech: cleanString(parsed['partOfSpeech']) || undefined,
    onyomi: cleanStringArray(parsed['onyomi']),
    kunyomi: cleanStringArray(parsed['kunyomi']),
    exampleJp: cleanString(parsed['exampleJp']) || undefined,
    exampleEs: exampleEs || undefined,
    contextTranslation: exampleEs || undefined,
    additionalVocab: cleanAdditionalVocab(parsed['additionalVocab']),
  };
}
