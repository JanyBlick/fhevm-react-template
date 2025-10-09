/**
 * Hook for encrypting data
 */

import { useState, useCallback } from 'react';
import { useFhevm } from '../context';
import { EncryptedData, EncryptionInput, FheType } from '@fhevm/sdk';

interface UseEncryptResult {
  encrypt: (data: EncryptionInput, fheType?: FheType) => Promise<EncryptedData>;
  encryptedData: EncryptedData | null;
  isEncrypting: boolean;
  error: Error | null;
}

/**
 * Hook to encrypt data using FHEVM
 */
export function useEncrypt(): UseEncryptResult {
  const { client, isInitialized } = useFhevm();
  const [encryptedData, setEncryptedData] = useState<EncryptedData | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encrypt = useCallback(
    async (data: EncryptionInput, fheType: FheType = FheType.UINT32) => {
      if (!client || !isInitialized) {
        throw new Error('FHEVM client not initialized');
      }

      setIsEncrypting(true);
      setError(null);

      try {
        const result = await client.encryptInput(data, fheType);
        setEncryptedData(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Encryption failed');
        setError(error);
        throw error;
      } finally {
        setIsEncrypting(false);
      }
    },
    [client, isInitialized]
  );

  return {
    encrypt,
    encryptedData,
    isEncrypting,
    error,
  };
}
