/**
 * useEncryption Hook
 * Hook for encryption operations
 */

'use client';

import { useState, useCallback } from 'react';
import { useEncrypt as useBaseEncrypt } from '@fhevm/react';
import { FheType } from '@fhevm/sdk';

export function useEncryption() {
  const [encryptedData, setEncryptedData] = useState<string | null>(null);
  const { encrypt, isLoading, error } = useBaseEncrypt();

  const encryptValue = useCallback(
    async (value: string | number, type: FheType = FheType.UINT32) => {
      try {
        const result = await encrypt(value, type);
        setEncryptedData(result.data);
        return result;
      } catch (err) {
        console.error('Encryption failed:', err);
        throw err;
      }
    },
    [encrypt]
  );

  const clearEncrypted = useCallback(() => {
    setEncryptedData(null);
  }, []);

  return {
    encryptValue,
    encryptedData,
    clearEncrypted,
    isLoading,
    error,
  };
}
