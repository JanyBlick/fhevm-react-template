/**
 * useComputation Hook
 * Hook for homomorphic computation operations
 */

'use client';

import { useState, useCallback } from 'react';

type Operation = 'add' | 'multiply' | 'compare';

interface ComputationResult {
  value: any;
  operation: Operation;
  timestamp: string;
}

export function useComputation() {
  const [result, setResult] = useState<ComputationResult | null>(null);
  const [isComputing, setIsComputing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const compute = useCallback(
    async (operation: Operation, operands: (string | number)[]) => {
      setIsComputing(true);
      setError(null);

      try {
        const response = await fetch('/api/fhe/compute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            operation,
            operands: operands.map((v) => parseFloat(String(v))),
          }),
        });

        if (!response.ok) {
          throw new Error('Computation request failed');
        }

        const data = await response.json();

        if (data.success) {
          const computationResult: ComputationResult = {
            value: data.result.value,
            operation,
            timestamp: data.result.timestamp,
          };
          setResult(computationResult);
          return computationResult;
        } else {
          throw new Error(data.error || 'Computation failed');
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        throw error;
      } finally {
        setIsComputing(false);
      }
    },
    []
  );

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    compute,
    result,
    clearResult,
    isComputing,
    error,
  };
}
