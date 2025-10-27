'use client';

import { useState } from 'react';
import { FhevmProvider } from '@fhevm/react';
import VotingApp from '@/components/VotingApp';
import { EncryptionDemo } from '@/components/fhe/EncryptionDemo';
import { ComputationDemo } from '@/components/fhe/ComputationDemo';
import { KeyManager } from '@/components/fhe/KeyManager';
import { BankingExample } from '@/components/examples/BankingExample';
import { MedicalExample } from '@/components/examples/MedicalExample';

const config = {
  providerUrl: process.env.NEXT_PUBLIC_RPC_URL || 'http://127.0.0.1:8545',
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '31337'),
};

type Tab = 'voting' | 'encryption' | 'computation' | 'keys' | 'banking' | 'medical';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('voting');

  const tabs: { id: Tab; label: string; description: string }[] = [
    { id: 'voting', label: 'Voting Demo', description: 'Private voting application' },
    { id: 'encryption', label: 'Encryption', description: 'Encrypt data with FHE' },
    { id: 'computation', label: 'Computation', description: 'Compute on encrypted data' },
    { id: 'keys', label: 'Key Management', description: 'Manage encryption keys' },
    { id: 'banking', label: 'Banking Example', description: 'Private financial transactions' },
    { id: 'medical', label: 'Medical Example', description: 'Private health data' },
  ];

  return (
    <FhevmProvider config={config}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  FHEVM SDK Demo
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Privacy-preserving applications powered by Fully Homomorphic Encryption
                </p>
              </div>
              <div className="hidden sm:flex items-center space-x-4">
                <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Next.js
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  FHE Enabled
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                    transition-colors duration-200
                    ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex flex-col items-center">
                    <span>{tab.label}</span>
                    <span className="text-xs text-gray-400 mt-0.5">{tab.description}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {activeTab === 'voting' && (
              <div className="bg-white rounded-lg shadow p-6">
                <VotingApp />
              </div>
            )}

            {activeTab === 'encryption' && <EncryptionDemo />}

            {activeTab === 'computation' && <ComputationDemo />}

            {activeTab === 'keys' && <KeyManager />}

            {activeTab === 'banking' && <BankingExample />}

            {activeTab === 'medical' && <MedicalExample />}
          </div>

          {/* Info Section */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              About This Demo
            </h3>
            <p className="text-sm text-blue-800 mb-4">
              This is a comprehensive demonstration of the FHEVM SDK for Next.js applications.
              Explore different tabs to see various use cases and capabilities of Fully Homomorphic Encryption.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h4 className="font-semibold mb-1">Key Features:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Client-side encryption</li>
                  <li>Homomorphic computations</li>
                  <li>Secure key management</li>
                  <li>Privacy-preserving operations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Use Cases:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Private voting systems</li>
                  <li>Confidential financial transactions</li>
                  <li>Secure health data management</li>
                  <li>Privacy-focused dApps</li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-sm text-gray-600">
              Built with FHEVM SDK - Enabling privacy-preserving blockchain applications
            </p>
          </div>
        </footer>
      </div>
    </FhevmProvider>
  );
}
