# @fhevm/sdk

Core SDK for building privacy-preserving decentralized applications using Fully Homomorphic Encryption (FHE) on Ethereum.

## Features

- ✅ **Framework-Agnostic** - Works with any JavaScript framework
- ✅ **TypeScript First** - Complete type definitions
- ✅ **Modular Design** - Core, utils, adapters, and types
- ✅ **EIP-712 Support** - Built-in signature handling
- ✅ **Multiple FHE Types** - Support for various encrypted data types

## Installation

```bash
npm install @fhevm/sdk
```

## Quick Start

```typescript
import { createFhevmClient, FheType } from '@fhevm/sdk';

// Create and initialize client
const client = createFhevmClient({
  providerUrl: 'http://localhost:8545',
  chainId: 31337,
});

await client.init();

// Encrypt data
const encrypted = await client.encryptInput(42, FheType.UINT32);

// Decrypt with user signature
const result = await client.userDecrypt(
  {
    contractAddress: '0x...',
    handle: encrypted.data,
    userAddress: '0x...',
  },
  signer
);
```

## Architecture

```
src/
├── core/              # Core FHEVM client
│   └── fhevm.ts       # Main FhevmClient class
├── utils/             # Utility functions
│   ├── encryption.ts  # Encryption utilities
│   └── decryption.ts  # Decryption utilities
├── adapters/          # Framework adapters
│   └── react.ts       # React adapter
├── types.ts           # TypeScript types
└── index.ts           # Main entry point
```

## API Reference

### Client Initialization

```typescript
import { createFhevmClient } from '@fhevm/sdk';

const client = createFhevmClient({
  providerUrl: string;      // RPC URL
  chainId: number;          // Network chain ID
  gatewayUrl?: string;      // Optional gateway URL
  aclAddress?: string;      // Optional ACL contract
});

await client.init(keyPair?: KeyPair);
```

### Encryption

```typescript
// Encrypt input data
const encrypted = await client.encryptInput(
  data: number | bigint | boolean | string | Uint8Array,
  fheType?: FheType
);

// Returns: { data: string, publicKey: string }
```

### Decryption

```typescript
// User decryption (requires signature)
const result = await client.userDecrypt(
  {
    contractAddress: string,
    handle: string,
    userAddress: string,
  },
  signer: ethers.Signer
);

// Public decryption
const value = await client.publicDecrypt(encryptedHandle: string);
```

### Utility Methods

```typescript
// Get public key
const publicKey = client.getPublicKey();

// Get provider instance
const provider = client.getProvider();

// Get configuration
const config = client.getConfig();
```

## FHE Types

```typescript
enum FheType {
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
```

## Standalone Utilities

```typescript
import {
  generateKeyPair,
  encrypt,
  decrypt,
  bytesToHex,
  keccak256,
  createDecryptionSignature,
  userDecrypt,
  publicDecrypt,
} from '@fhevm/sdk';

// Generate keypair
const keyPair = generateKeyPair();

// Encrypt data directly
const encrypted = await encrypt(data, publicKey, fheType);

// Decrypt data directly
const decrypted = await decrypt(encryptedData, privateKey);
```

## React Adapter

```typescript
import { createReactFhevmClient, isClientReady } from '@fhevm/sdk/adapters/react';

const reactClient = createReactFhevmClient(config);
await reactClient.initialize();

if (isClientReady(reactClient.client)) {
  // Client is ready to use
}
```

## TypeScript Support

Full TypeScript definitions included:

```typescript
import type {
  FhevmConfig,
  EncryptedData,
  DecryptionRequest,
  DecryptionResult,
  KeyPair,
  EIP712Domain,
  EIP712Types,
  EIP712Message,
  EncryptionInput,
} from '@fhevm/sdk';
```

## Examples

See the [monorepo examples](../../examples) for complete implementations:
- [Next.js Example](../../examples/nextjs) - Comprehensive Next.js integration
- [Renovation Budget](../../examples/renovation-budget) - Production fhEVM app

## Framework Integration

### React

Use `@fhevm/react` for React hooks and components:

```bash
npm install @fhevm/react
```

### Vue/Angular

Use the core SDK with the adapters pattern to create framework-specific wrappers.

## Development

```bash
# Build the package
npm run build

# Watch mode
npm run dev

# Clean build artifacts
npm run clean

# Run tests
npm run test
```

## License

MIT
