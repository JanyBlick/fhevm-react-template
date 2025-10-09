/**
 * Component for encrypted input field
 */

import React, { useState, ChangeEvent } from 'react';
import { useEncrypt } from '../hooks/useEncrypt';
import { FheType, EncryptedData } from '@fhevm/sdk';

interface EncryptedInputProps {
  /** Input type */
  type?: 'number' | 'text';
  /** FHE type for encryption */
  fheType?: FheType;
  /** Placeholder text */
  placeholder?: string;
  /** Callback when encryption completes */
  onEncrypted?: (data: EncryptedData) => void;
  /** CSS class name */
  className?: string;
}

/**
 * Input component that automatically encrypts values
 */
export function EncryptedInput({
  type = 'number',
  fheType = FheType.UINT32,
  placeholder,
  onEncrypted,
  className,
}: EncryptedInputProps) {
  const [value, setValue] = useState('');
  const { encrypt, isEncrypting, error } = useEncrypt();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleEncrypt = async () => {
    if (!value) return;

    try {
      const inputValue = type === 'number' ? Number(value) : value;
      const encrypted = await encrypt(inputValue, fheType);
      if (onEncrypted) {
        onEncrypted(encrypted);
      }
    } catch (err) {
      console.error('Encryption failed:', err);
    }
  };

  return (
    <div className={className}>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={isEncrypting}
        style={{
          padding: '8px',
          marginRight: '8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <button
        onClick={handleEncrypt}
        disabled={isEncrypting || !value}
        style={{
          padding: '8px 16px',
          backgroundColor: isEncrypting ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isEncrypting ? 'not-allowed' : 'pointer',
        }}
      >
        {isEncrypting ? 'Encrypting...' : 'Encrypt'}
      </button>
      {error && (
        <div style={{ color: 'red', marginTop: '8px' }}>
          Error: {error.message}
        </div>
      )}
    </div>
  );
}
