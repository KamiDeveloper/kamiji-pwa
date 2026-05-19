'use client';
// lib/crypto/byok.ts
// BYOK (Bring Your Own Key) secure storage service using Web Crypto API.
// Keys are NEVER sent to our servers in plaintext. They are encrypted
// locally with a user-provided PIN before optional encrypted sync to Firestore.

const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const ITERATIONS = 100000;

export async function hashGeminiKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function getEncryptionKey(pin: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const pinKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(pin),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as BufferSource,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    pinKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptGeminiKey(
  key: string,
  pin: string
): Promise<{ encrypted: string; salt: string; iv: string }> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const encryptionKey = await getEncryptionKey(pin, salt);

  const encoder = new TextEncoder();
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    encryptionKey,
    encoder.encode(key)
  );

  // Browser-safe Base64 encoding
  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  return {
    encrypted: arrayBufferToBase64(encryptedBuffer),
    salt: arrayBufferToBase64(salt.buffer),
    iv: arrayBufferToBase64(iv.buffer),
  };
}

export async function decryptGeminiKey(
  encrypted: string,
  saltStr: string,
  ivStr: string,
  pin: string
): Promise<string> {
  // Browser-safe Base64 decoding
  const base64ToArrayBuffer = (base64: string) => {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  };

  const salt = base64ToArrayBuffer(saltStr);
  const iv = base64ToArrayBuffer(ivStr);
  const encryptedBuffer = base64ToArrayBuffer(encrypted);
  
  const decryptionKey = await getEncryptionKey(pin, salt);

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    decryptionKey,
    encryptedBuffer
  );

  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuffer);
}
