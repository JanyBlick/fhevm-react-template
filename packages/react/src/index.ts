/**
 * @fhevm/react - Main exports
 */

// Context and Provider
export { FhevmProvider, useFhevm } from './context';

// Hooks
export { useEncrypt, useDecrypt, usePublicKey } from './hooks';

// Components
export { EncryptedInput } from './components';

// Re-export types from SDK
export type {
  FhevmConfig,
  EncryptedData,
  DecryptionRequest,
  DecryptionResult,
  EncryptionInput,
} from '@fhevm/sdk';

export { FheType } from '@fhevm/sdk';
