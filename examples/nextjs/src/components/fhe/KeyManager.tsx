/**
 * Key Manager Component
 * Manages FHE public/private key pairs
 */

'use client';

import React, { useState, useEffect } from 'react';
import { usePublicKey } from '@fhevm/react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const KeyManager: React.FC = () => {
  const { publicKey, generateKey, isLoading } = usePublicKey();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleGenerate = async () => {
    await generateKey();
  };

  return (
    <Card title="Key Management">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-700">Public Key</h4>
            <p className="text-xs text-gray-500 mt-1">
              Used for encrypting data before sending to contracts
            </p>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={isLoading}
            size="sm"
            variant="outline"
          >
            {isLoading ? 'Generating...' : 'Generate New Key'}
          </Button>
        </div>

        {publicKey ? (
          <div className="relative">
            <div className="p-3 bg-gray-50 border border-gray-300 rounded-lg">
              <p className="text-xs font-mono break-all text-gray-700">
                {publicKey}
              </p>
            </div>
            <Button
              onClick={handleCopy}
              size="sm"
              variant="secondary"
              className="absolute top-2 right-2"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        ) : (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              No public key available. Generate a new key to start encrypting data.
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Key Security</h4>
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
            <li>Private keys never leave your device</li>
            <li>Public keys are safe to share</li>
            <li>Keys are used for client-side encryption</li>
            <li>Regenerate keys as needed for testing</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
