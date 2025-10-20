'use client';

import { FhevmProvider } from '@fhevm/react';
import VotingApp from '@/components/VotingApp';

const config = {
  providerUrl: process.env.NEXT_PUBLIC_RPC_URL || 'http://127.0.0.1:8545',
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '31337'),
};

export default function Home() {
  return (
    <FhevmProvider config={config}>
      <div className="container">
        <div className="header">
          <h1>Private Voting</h1>
          <p>Privacy-preserving voting powered by Fully Homomorphic Encryption</p>
        </div>
        <VotingApp />
      </div>
    </FhevmProvider>
  );
}
