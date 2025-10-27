/**
 * FHE Type Definitions
 * TypeScript types for FHE operations
 */

export type {
  FhevmConfig,
  EncryptedData,
  DecryptionRequest,
  DecryptionResult,
  EncryptionInput,
  KeyPair,
} from '@fhevm/sdk';

export { FheType } from '@fhevm/sdk';

export interface FHEClientConfig {
  providerUrl: string;
  chainId: number;
  gatewayUrl?: string;
}

export interface EncryptionOptions {
  type?: 'uint8' | 'uint16' | 'uint32' | 'uint64';
  publicKey?: string;
}

export interface ComputationRequest {
  operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'compare';
  operands: string[];
}
