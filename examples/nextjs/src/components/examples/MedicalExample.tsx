/**
 * Medical Example Component
 * Demonstrates FHE use case for private health data
 */

'use client';

import React, { useState } from 'react';
import { useEncrypt } from '@fhevm/react';
import { FheType } from '@fhevm/sdk';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface HealthRecord {
  id: string;
  metric: string;
  value: string;
  encrypted: string;
  timestamp: Date;
  unit: string;
}

const healthMetrics = [
  { name: 'Heart Rate', unit: 'bpm', range: '60-100' },
  { name: 'Blood Pressure', unit: 'mmHg', range: '90/60-120/80' },
  { name: 'Blood Sugar', unit: 'mg/dL', range: '70-100' },
  { name: 'Body Temperature', unit: '°F', range: '97-99' },
  { name: 'Weight', unit: 'lbs', range: '100-300' },
];

export const MedicalExample: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState(healthMetrics[0]);
  const [value, setValue] = useState<string>('');
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const { encrypt, isLoading } = useEncrypt();

  const handleSubmit = async () => {
    if (!value) return;

    try {
      const result = await encrypt(value, FheType.UINT32);

      const newRecord: HealthRecord = {
        id: Date.now().toString(),
        metric: selectedMetric.name,
        value,
        encrypted: result.data,
        timestamp: new Date(),
        unit: selectedMetric.unit,
      };

      setRecords([newRecord, ...records]);
      setValue('');
    } catch (err) {
      console.error('Failed to submit health data:', err);
    }
  };

  return (
    <Card title="Private Health Data Example">
      <div className="space-y-6">
        {/* Info Banner */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Privacy Protected:</strong> All health metrics are encrypted
            using FHE before storage, ensuring complete medical privacy.
          </p>
        </div>

        {/* Metric Selection */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Health Metric
            </label>
            <select
              value={selectedMetric.name}
              onChange={(e) => {
                const metric = healthMetrics.find((m) => m.name === e.target.value);
                if (metric) setSelectedMetric(metric);
              }}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {healthMetrics.map((metric) => (
                <option key={metric.name} value={metric.name}>
                  {metric.name} ({metric.unit})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Normal range: {selectedMetric.range}
            </p>
          </div>

          <Input
            label={`${selectedMetric.name} Value`}
            type="number"
            placeholder={`Enter ${selectedMetric.name.toLowerCase()}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isLoading}
            helperText={`Unit: ${selectedMetric.unit}`}
          />

          <Button
            onClick={handleSubmit}
            disabled={!value || isLoading}
            className="w-full"
          >
            {isLoading ? 'Encrypting & Submitting...' : 'Submit Encrypted Health Data'}
          </Button>
        </div>

        {/* Health Records */}
        {records.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              Encrypted Health Records
            </h4>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-medium text-gray-900">
                        {record.metric}
                      </h5>
                      <p className="text-sm text-gray-600 mt-1">
                        Value: {record.value} {record.unit}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-1 text-xs bg-green-200 text-green-800 rounded">
                        Encrypted
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {record.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <details className="mt-2">
                    <summary className="text-xs text-blue-600 cursor-pointer">
                      View encrypted data
                    </summary>
                    <div className="mt-2 p-2 bg-white rounded border border-green-300">
                      <p className="text-xs font-mono text-gray-600 break-all">
                        {record.encrypted}
                      </p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Use Cases */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Medical Privacy Use Cases
          </h4>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>Share health data with providers without exposing values</li>
            <li>Participate in medical research while maintaining privacy</li>
            <li>Track personal health metrics securely</li>
            <li>Enable secure health data analysis without decryption</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
