/**
 * Encryption Demo Component
 * Demonstrates encryption of user input
 */

'use client';

import React, { useState } from 'react';
import { useEncrypt } from '@fhevm/react';
import { FheType } from '@fhevm/sdk';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export const EncryptionDemo: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [encrypted, setEncrypted] = useState<string>('');
  const { encrypt, isLoading, error } = useEncrypt();

  const handleEncrypt = async () => {
    if (!value) return;

    try {
      const result = await encrypt(value, FheType.UINT32);
      setEncrypted(result.data);
    } catch (err) {
      console.error('Encryption failed:', err);
    }
  };

  return (
    <Card title="Encryption Demo">
      <div className="space-y-4">
        <div>
          <Input
            label="Value to Encrypt"
            type="number"
            placeholder="Enter a number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <Button
          onClick={handleEncrypt}
          disabled={!value || isLoading}
          className="w-full"
        >
          {isLoading ? 'Encrypting...' : 'Encrypt Value'}
        </Button>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">Error: {error.message}</p>
          </div>
        )}

        {encrypted && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Encrypted Data</h4>
            <p className="text-sm text-green-800 break-all font-mono">
              {encrypted}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
