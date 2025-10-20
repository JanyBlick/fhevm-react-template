# @fhevm/sdk

Core SDK for building privacy-preserving dApps with Fully Homomorphic Encryption (FHE).

## Installation

```bash
npm install @fhevm/sdk
```

## Quick Start

```typescript
import { createFhevmClient, FheType } from '@fhevm/sdk';

// Create client
const client = createFhevmClient({
  providerUrl: 'https://your-rpc-url',
  chainId: 1,
});

// Initialize with keypair
await client.init();

// Encrypt data
const encrypted = await client.encryptInput(42, FheType.UINT32);

// User decryption with EIP-712 signature
const result = await client.userDecrypt(
  {
    contractAddress: '0x...',
    handle: '0x...',
    userAddress: '0x...',
  },
  signer
);
```

## Features

- **Encryption/Decryption**: Full FHE encryption and decryption utilities
- **EIP-712 Signatures**: Built-in support for user decryption signatures
- **Type-safe**: Complete TypeScript support
- **Modular**: Use only what you need
- **Framework-agnostic**: Works with any JavaScript environment

## API Reference

### FhevmClient

Main client class for FHE operations.

#### Methods

- `init(keyPair?)`: Initialize the client
- `encryptInput(data, fheType)`: Encrypt data for contract submission
- `userDecrypt(request, signer)`: Decrypt with EIP-712 signature
- `publicDecrypt(handle)`: Decrypt publicly revealed data
- `getPublicKey()`: Get current public key

### Types

- `FheType`: Supported FHE data types (BOOL, UINT8, UINT16, etc.)
- `EncryptedData`: Encrypted data structure
- `DecryptionRequest`: Decryption request parameters
- `DecryptionResult`: Decryption result with signature

## License

MIT
