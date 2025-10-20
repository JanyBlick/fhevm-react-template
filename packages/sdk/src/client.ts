/**
 * FHEVM Client - Main entry point for SDK
 */

import { ethers } from 'ethers';
import {
  FhevmConfig,
  EncryptedData,
  DecryptionRequest,
  DecryptionResult,
  EIP712Domain,
  EIP712Message,
  EncryptionInput,
  FheType,
  KeyPair,
} from './types';
import { encrypt, decrypt, bytesToHex, generateKeyPair } from './crypto';

export class FhevmClient {
  private config: FhevmConfig;
  private provider: ethers.Provider;
  private keyPair?: KeyPair;

  constructor(config: FhevmConfig) {
    this.config = config;
    this.provider = new ethers.JsonRpcProvider(config.providerUrl);
  }

  /**
   * Initialize the client with a keypair
   */
  async init(keyPair?: KeyPair): Promise<void> {
    if (keyPair) {
      this.keyPair = keyPair;
    } else {
      this.keyPair = generateKeyPair();
    }
  }

  /**
   * Get the current public key
   */
  getPublicKey(): string {
    if (!this.keyPair) {
      throw new Error('Client not initialized. Call init() first.');
    }
    return this.keyPair.publicKey;
  }

  /**
   * Encrypt input data for contract submission
   */
  async encryptInput(
    data: EncryptionInput,
    fheType: FheType = FheType.UINT32
  ): Promise<EncryptedData> {
    if (!this.keyPair) {
      throw new Error('Client not initialized. Call init() first.');
    }

    const encryptedBytes = await encrypt(data, this.keyPair.publicKey, fheType);
    const encryptedHex = bytesToHex(encryptedBytes);

    return {
      data: encryptedHex,
      publicKey: this.keyPair.publicKey,
    };
  }

  /**
   * Create EIP-712 signature for user decryption
   */
  async createDecryptionSignature(
    request: DecryptionRequest,
    signer: ethers.Signer
  ): Promise<string> {
    const domain: EIP712Domain = {
      name: 'FHEVM',
      version: '1',
      chainId: this.config.chainId,
      verifyingContract: request.contractAddress,
    };

    const types = {
      Decryption: [
        { name: 'handle', type: 'bytes32' },
        { name: 'user', type: 'address' },
      ],
    };

    const message = {
      handle: request.handle,
      user: request.userAddress,
    };

    const signature = await signer.signTypedData(domain, types, message);
    return signature;
  }

  /**
   * Request decryption of encrypted data (userDecrypt)
   */
  async userDecrypt(
    request: DecryptionRequest,
    signer: ethers.Signer
  ): Promise<DecryptionResult> {
    if (!this.keyPair) {
      throw new Error('Client not initialized. Call init() first.');
    }

    // Create EIP-712 signature
    const signature = await this.createDecryptionSignature(request, signer);

    // In a real implementation, this would interact with the gateway
    // For now, we'll simulate the decryption
    const handleBytes = ethers.getBytes(request.handle);
    const decryptedValue = await decrypt(handleBytes, this.keyPair.privateKey);

    return {
      value: decryptedValue,
      handle: request.handle,
      signature,
    };
  }

  /**
   * Public decryption (for publicly revealed data)
   */
  async publicDecrypt(encryptedHandle: string): Promise<bigint> {
    if (!this.keyPair) {
      throw new Error('Client not initialized. Call init() first.');
    }

    const handleBytes = ethers.getBytes(encryptedHandle);
    return await decrypt(handleBytes, this.keyPair.privateKey);
  }

  /**
   * Get the provider instance
   */
  getProvider(): ethers.Provider {
    return this.provider;
  }

  /**
   * Get the configuration
   */
  getConfig(): FhevmConfig {
    return this.config;
  }
}

/**
 * Create a new FHEVM client instance
 */
export function createFhevmClient(config: FhevmConfig): FhevmClient {
  return new FhevmClient(config);
}
