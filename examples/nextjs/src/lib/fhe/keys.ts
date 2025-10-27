/**
 * Key Management Library
 * Utilities for managing FHE keys
 */

import { generateKeyPair, KeyPair } from '@fhevm/sdk';

const KEY_STORAGE_KEY = 'fhevm_keypair';

export function generateAndStoreKeyPair(): KeyPair {
  const keyPair = generateKeyPair();

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(KEY_STORAGE_KEY, JSON.stringify(keyPair));
    } catch (error) {
      console.error('Failed to store keypair:', error);
    }
  }

  return keyPair;
}

export function getStoredKeyPair(): KeyPair | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(KEY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to retrieve keypair:', error);
    return null;
  }
}

export function clearStoredKeyPair(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(KEY_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear keypair:', error);
    }
  }
}

export function getOrGenerateKeyPair(): KeyPair {
  const stored = getStoredKeyPair();
  return stored || generateAndStoreKeyPair();
}
