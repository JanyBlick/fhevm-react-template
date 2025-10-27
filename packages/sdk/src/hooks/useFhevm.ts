/**
 * React Hook for FHEVM Client
 * Provides easy access to FHE operations in React components
 */

import { useState, useEffect } from 'react';
import { FhevmClient, createFhevmClient } from '../core/fhevm';
import { FhevmConfig, KeyPair } from '../types';

export interface UseFhevmOptions {
  config: FhevmConfig;
  keyPair?: KeyPair;
  autoInit?: boolean;
}

export interface UseFhevmReturn {
  client: FhevmClient | null;
  isReady: boolean;
  isLoading: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

/**
 * Hook to manage FHEVM client instance
 * @param options - Configuration options
 * @returns FHEVM client instance and status
 */
export function useFhevm(options: UseFhevmOptions): UseFhevmReturn {
  const { config, keyPair, autoInit = true } = options;

  const [client, setClient] = useState<FhevmClient | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const init = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const fhevmClient = createFhevmClient(config);
      await fhevmClient.init(keyPair);

      setClient(fhevmClient);
      setIsReady(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to initialize FHEVM client');
      setError(error);
      console.error('Failed to initialize FHEVM client:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoInit && !client && !isLoading) {
      init();
    }
  }, [autoInit]);

  return {
    client,
    isReady,
    isLoading,
    error,
    init,
  };
}
