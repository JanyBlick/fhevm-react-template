/**
 * Hook for decrypting data
 */

import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useFhevm } from '../context';
import { DecryptionRequest, DecryptionResult } from '@fhevm/sdk';

interface UseDecryptResult {
  decrypt: (request: DecryptionRequest, signer: ethers.Signer) => Promise<DecryptionResult>;
  decryptedData: DecryptionResult | null;
  isDecrypting: boolean;
  error: Error | null;
}

/**
 * Hook to decrypt data using FHEVM with EIP-712 signature
 */
export function useDecrypt(): UseDecryptResult {
  const { client, isInitialized } = useFhevm();
  const [decryptedData, setDecryptedData] = useState<DecryptionResult | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const decrypt = useCallback(
    async (request: DecryptionRequest, signer: ethers.Signer) => {
      if (!client || !isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      setIsDecrypting(true);
      setError(null);

      try {
        const result = await client.userDecrypt(request, signer);
        setDecryptedData(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Decryption failed');
        setError(error);
        throw error;
      } finally {
        setIsDecrypting(false);
      }
    },
    [client, isInitialized]
  );

  return {
    decrypt,
    decryptedData,
    isDecrypting,
    error,
  };
}
