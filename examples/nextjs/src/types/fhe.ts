/**
 * FHE Type Definitions
 * Application-specific FHE types
 */

export type {
  FhevmConfig,
  EncryptedData,
  DecryptionRequest,
  DecryptionResult,
} from '@fhevm/sdk';

export { FheType } from '@fhevm/sdk';

export interface FHEState {
  isInitialized: boolean;
  publicKey?: string;
  error?: Error;
}

export interface EncryptedValue {
  original: string | number;
  encrypted: string;
  type: string;
  timestamp: Date;
}
