/**
 * Decryption utilities for FHE operations
 */

import { ethers } from 'ethers';
import { DecryptionRequest, DecryptionResult, EIP712Domain } from '../types';
import { decrypt } from './encryption';

/**
 * Create EIP-712 signature for user decryption
 */
export async function createDecryptionSignature(
  request: DecryptionRequest,
  signer: ethers.Signer,
  chainId: number
): Promise<string> {
  const domain: EIP712Domain = {
    name: 'FHEVM',
    version: '1',
    chainId,
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
 * User-initiated decryption with EIP-712 signature
 */
export async function userDecrypt(
  request: DecryptionRequest,
  privateKey: string,
  signer: ethers.Signer,
  chainId: number
): Promise<DecryptionResult> {
  // Create EIP-712 signature
  const signature = await createDecryptionSignature(request, signer, chainId);

  // In a real implementation, this would interact with the gateway
  // For now, we'll simulate the decryption
  const handleBytes = ethers.getBytes(request.handle);
  const decryptedValue = await decrypt(handleBytes, privateKey);

  return {
    value: decryptedValue,
    handle: request.handle,
    signature,
  };
}

/**
 * Public decryption (for publicly revealed data)
 */
export async function publicDecrypt(
  encryptedHandle: string,
  privateKey: string
): Promise<bigint> {
  const handleBytes = ethers.getBytes(encryptedHandle);
  return await decrypt(handleBytes, privateKey);
}
