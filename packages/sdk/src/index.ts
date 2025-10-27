/**
 * FHEVM SDK - Main exports
 */

// Core
export { FhevmClient, createFhevmClient } from './core/fhevm';

// Utilities - Encryption
export {
  generateKeyPair,
  encrypt,
  decrypt,
  bytesToHex,
  keccak256,
} from './utils/encryption';

// Utilities - Decryption
export {
  createDecryptionSignature,
  userDecrypt,
  publicDecrypt,
} from './utils/decryption';

// Adapters
export { createReactFhevmClient, isClientReady } from './adapters/react';

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

// Legacy exports for backward compatibility
export { FhevmClient as FhevmClient } from './core/fhevm';
export { createFhevmClient as createFhevmClient } from './core/fhevm';
