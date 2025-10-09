/**
 * Hook to get the current public key
 */

import { useFhevm } from '../context';

interface UsePublicKeyResult {
  publicKey: string | null;
  isReady: boolean;
}

/**
 * Hook to access the FHEVM public key
 */
export function usePublicKey(): UsePublicKeyResult {
  const { publicKey, isInitialized } = useFhevm();

  return {
    publicKey,
    isReady: isInitialized && publicKey !== null,
  };
}
