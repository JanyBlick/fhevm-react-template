/**
 * Computation Demo Component
 * Demonstrates homomorphic computation on encrypted data
 */

'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

type Operation = 'add' | 'multiply' | 'compare';

export const ComputationDemo: React.FC = () => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [operation, setOperation] = useState<Operation>('add');
  const [result, setResult] = useState<string>('');
  const [isComputing, setIsComputing] = useState(false);

  const handleCompute = async () => {
    if (!value1 || !value2) return;

    setIsComputing(true);
    try {
      const response = await fetch('/api/fhe/compute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation,
          operands: [parseFloat(value1), parseFloat(value2)],
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(String(data.result.value));
      }
    } catch (err) {
      console.error('Computation failed:', err);
    } finally {
      setIsComputing(false);
    }
  };

  return (
    <Card title="Homomorphic Computation Demo">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Value"
            type="number"
            placeholder="Enter first number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            disabled={isComputing}
          />
          <Input
            label="Second Value"
            type="number"
            placeholder="Enter second number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            disabled={isComputing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Operation
          </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as Operation)}
            disabled={isComputing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="add">Addition</option>
            <option value="multiply">Multiplication</option>
            <option value="compare">Comparison (Greater Than)</option>
          </select>
        </div>

        <Button
          onClick={handleCompute}
          disabled={!value1 || !value2 || isComputing}
          className="w-full"
        >
          {isComputing ? 'Computing...' : 'Compute on Encrypted Data'}
        </Button>

        {result && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Computation Result</h4>
            <p className="text-lg text-blue-800 font-mono">{result}</p>
            <p className="text-sm text-blue-600 mt-2">
              This computation was performed on encrypted data without decrypting it!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
