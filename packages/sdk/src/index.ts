/**
 * FHEVM SDK - Main exports
 */

// Client
export { FhevmClient, createFhevmClient } from './client';

// Crypto utilities
export {
  generateKeyPair,
  encrypt,
  decrypt,
  bytesToHex,
  keccak256,
} from './crypto';

// Types
export type {
  FhevmConfig,
  EncryptedData,
  DecryptionRequest,
  DecryptionResult,
  KeyPair,
  EIP712Domain,
  EIP712Types,
  EIP712Message,
  EncryptionInput,
} from './types';

export { FheType } from './types';
