/**
 * FHE Client Library
 * Client-side FHE operations and utilities
 */

import { createFhevmClient, FhevmConfig } from '@fhevm/sdk';

let clientInstance: ReturnType<typeof createFhevmClient> | null = null;

export function getFhevmClient(config: FhevmConfig) {
  if (!clientInstance) {
    clientInstance = createFhevmClient(config);
  }
  return clientInstance;
}

export function resetFhevmClient() {
  clientInstance = null;
}
