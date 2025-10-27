/**
 * React adapter for FHEVM SDK
 * Provides React-specific utilities and helpers
 */

import { FhevmClient } from '../core/fhevm';
import { FhevmConfig } from '../types';

/**
 * Create a React-friendly FHEVM client wrapper
 */
export function createReactFhevmClient(config: FhevmConfig) {
  const client = new FhevmClient(config);

  return {
    client,
    config,
    /**
     * Initialize the client (can be called in useEffect)
     */
    async initialize() {
      await client.init();
      return client;
    },
    /**
     * Get public key (safe for React state)
     */
    getPublicKey() {
      try {
        return client.getPublicKey();
      } catch {
        return null;
      }
    },
  };
}

/**
 * Check if client is ready for use in React components
 */
export function isClientReady(client: FhevmClient | null): boolean {
  if (!client) return false;

  try {
    client.getPublicKey();
    return true;
  } catch {
    return false;
  }
}
