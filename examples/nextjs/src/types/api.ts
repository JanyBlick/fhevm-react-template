/**
 * API Type Definitions
 * Types for API requests and responses
 */

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp?: string;
}

export interface EncryptionRequest {
  value: string | number;
  type?: 'uint8' | 'uint16' | 'uint32' | 'uint64';
}

export interface EncryptionResponse {
  encrypted: {
    data: string;
    type: string;
    timestamp: string;
  };
}

export interface DecryptionRequest {
  encryptedData: string;
  userAddress: string;
  signature?: string;
}

export interface DecryptionResponse {
  decrypted: {
    value: number;
    userAddress: string;
    timestamp: string;
  };
}

export interface ComputationRequest {
  operation: 'add' | 'multiply' | 'compare';
  operands: number[];
}

export interface ComputationResponse {
  result: {
    operation: string;
    value: any;
    encrypted: boolean;
    timestamp: string;
  };
}

export interface KeyGenerationRequest {
  action: 'generate' | 'retrieve';
  address?: string;
}

export interface KeyGenerationResponse {
  publicKey: string;
  timestamp: string;
}
