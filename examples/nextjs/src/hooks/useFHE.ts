/**
 * useFHE Hook
 * Main hook for FHE operations
 */

'use client';

import { useFhevm } from '@fhevm/react';

export function useFHE() {
  const fhevm = useFhevm();

  return {
    client: fhevm.client,
    isInitialized: fhevm.isInitialized,
    error: fhevm.error,
    initialize: fhevm.init,
  };
}
