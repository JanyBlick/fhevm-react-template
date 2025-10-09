/**
 * React Context for FHEVM
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FhevmClient, FhevmConfig, createFhevmClient } from '@fhevm/sdk';

interface FhevmContextValue {
  client: FhevmClient | null;
  isInitialized: boolean;
  publicKey: string | null;
  error: Error | null;
}

const FhevmContext = createContext<FhevmContextValue | undefined>(undefined);

interface FhevmProviderProps {
  config: FhevmConfig;
  children: ReactNode;
}

/**
 * Provider component for FHEVM context
 */
export function FhevmProvider({ config, children }: FhevmProviderProps) {
  const [client, setClient] = useState<FhevmClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function initializeClient() {
      try {
        const fhevmClient = createFhevmClient(config);
        await fhevmClient.init();
        setClient(fhevmClient);
        setPublicKey(fhevmClient.getPublicKey());
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize FHEVM client'));
      }
    }

    initializeClient();
  }, [config]);

  const value: FhevmContextValue = {
    client,
    isInitialized,
    publicKey,
    error,
  };

  return <FhevmContext.Provider value={value}>{children}</FhevmContext.Provider>;
}

/**
 * Hook to access FHEVM context
 */
export function useFhevm(): FhevmContextValue {
  const context = useContext(FhevmContext);
  if (context === undefined) {
    throw new Error('useFhevm must be used within FhevmProvider');
  }
  return context;
}
