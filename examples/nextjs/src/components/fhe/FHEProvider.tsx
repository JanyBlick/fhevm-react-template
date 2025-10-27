/**
 * FHE Provider Component
 * Wrapper component that provides FHE context to children
 */

'use client';

import React from 'react';
import { FhevmProvider as BaseFhevmProvider } from '@fhevm/react';

interface FHEProviderProps {
  children: React.ReactNode;
}

const config = {
  providerUrl: process.env.NEXT_PUBLIC_RPC_URL || 'http://127.0.0.1:8545',
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '31337'),
};

export const FHEProvider: React.FC<FHEProviderProps> = ({ children }) => {
  return (
    <BaseFhevmProvider config={config}>
      {children}
    </BaseFhevmProvider>
  );
};
