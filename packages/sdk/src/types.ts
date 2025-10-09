/**
 * Core types for FHEVM SDK
 */

export interface FhevmConfig {
  /** Network provider URL */
  providerUrl: string;
  /** Contract address for FHE operations */
  gatewayUrl?: string;
  /** Network chain ID */
  chainId: number;
  /** Optional ACL contract address */
  aclAddress?: string;
}

export interface EncryptedData {
  /** Encrypted data as hex string */
  data: string;
  /** Public key used for encryption */
  publicKey: string;
  /** Signature for verification */
  signature?: string;
}

export interface DecryptionRequest {
  /** Contract address */
  contractAddress: string;
  /** Encrypted data handle/ciphertext */
  handle: string;
  /** User address */
  userAddress: string;
}

export interface DecryptionResult {
  /** Decrypted value */
  value: bigint | number | boolean | string;
  /** Original handle */
  handle: string;
  /** Verification signature */
  signature: string;
}

export interface KeyPair {
  /** Public key for encryption */
  publicKey: string;
  /** Private key for decryption */
  privateKey: string;
}

export interface EIP712Domain {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
}

export interface EIP712Types {
  [key: string]: Array<{ name: string; type: string }>;
}

export interface EIP712Message {
  domain: EIP712Domain;
  types: EIP712Types;
  primaryType: string;
  message: Record<string, unknown>;
}

export type EncryptionInput =
  | number
  | bigint
  | boolean
  | string
  | Uint8Array;

export enum FheType {
  BOOL = 0,
  UINT8 = 1,
  UINT16 = 2,
  UINT32 = 3,
  UINT64 = 4,
  UINT128 = 5,
  UINT256 = 6,
  ADDRESS = 7,
  BYTES = 8,
}
