/**
 * Banking Example Component
 * Demonstrates FHE use case for private financial transactions
 */

'use client';

import React, { useState } from 'react';
import { useEncrypt } from '@fhevm/react';
import { FheType } from '@fhevm/sdk';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface Transaction {
  id: string;
  amount: string;
  type: 'deposit' | 'withdrawal';
  encrypted: string;
  timestamp: Date;
}

export const BankingExample: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [balance, setBalance] = useState<number>(1000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { encrypt, isLoading } = useEncrypt();

  const handleTransaction = async (type: 'deposit' | 'withdrawal') => {
    if (!amount) return;

    try {
      const result = await encrypt(amount, FheType.UINT32);
      const numAmount = parseFloat(amount);

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        amount,
        type,
        encrypted: result.data,
        timestamp: new Date(),
      };

      setTransactions([newTransaction, ...transactions]);

      if (type === 'deposit') {
        setBalance(balance + numAmount);
      } else {
        setBalance(Math.max(0, balance - numAmount));
      }

      setAmount('');
    } catch (err) {
      console.error('Transaction failed:', err);
    }
  };

  return (
    <Card title="Private Banking Example">
      <div className="space-y-6">
        {/* Balance Display */}
        <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
          <p className="text-sm opacity-90">Current Balance</p>
          <p className="text-3xl font-bold mt-1">${balance.toFixed(2)}</p>
          <p className="text-xs mt-2 opacity-75">
            All transactions are encrypted using FHE
          </p>
        </div>

        {/* Transaction Input */}
        <div className="space-y-3">
          <Input
            label="Transaction Amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isLoading}
          />

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleTransaction('deposit')}
              disabled={!amount || isLoading}
              variant="primary"
            >
              Deposit
            </Button>
            <Button
              onClick={() => handleTransaction('withdrawal')}
              disabled={!amount || isLoading || parseFloat(amount) > balance}
              variant="secondary"
            >
              Withdraw
            </Button>
          </div>
        </div>

        {/* Transaction History */}
        {transactions.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Recent Transactions
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">
                        {tx.type === 'deposit' ? '+' : '-'}${tx.amount}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {tx.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        tx.type === 'deposit'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {tx.type}
                    </span>
                  </div>
                  <details className="mt-2">
                    <summary className="text-xs text-blue-600 cursor-pointer">
                      View encrypted data
                    </summary>
                    <p className="text-xs font-mono text-gray-600 mt-1 break-all">
                      {tx.encrypted}
                    </p>
                  </details>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>Privacy Note:</strong> Transaction amounts are encrypted
            before being submitted to the blockchain, ensuring complete privacy.
          </p>
        </div>
      </div>
    </Card>
  );
};
