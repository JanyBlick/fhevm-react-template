# Getting Started with FHEVM SDK

This guide will help you get started with the FHEVM SDK for building privacy-preserving dApps.

## Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or another Web3 wallet
- Basic knowledge of React and Ethereum

## Quick Start

### 1. Installation

From the monorepo root:

```bash
npm run install:all
```

### 2. Build All Packages

```bash
npm run build
```

### 3. Deploy Contracts

```bash
# Start local blockchain (in separate terminal)
cd packages/contracts
npx hardhat node

# Deploy contracts
npm run deploy:localhost
```

Copy the deployed contract address.

### 4. Configure Frontend

```bash
cd examples/nextjs
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545
NEXT_PUBLIC_CHAIN_ID=31337
NEXT_PUBLIC_VOTING_CONTRACT_ADDRESS=<your-deployed-address>
```

### 5. Run the Example

```bash
npm run dev:nextjs
```

Visit http://localhost:3000

## Using FHEVM SDK in Your Project

### Install Packages

```bash
npm install @fhevm/sdk @fhevm/react ethers
```

### Setup Provider

```typescript
import { FhevmProvider } from '@fhevm/react';

function App() {
  return (
    <FhevmProvider config={{
      providerUrl: 'https://your-rpc-url',
      chainId: 1,
    }}>
      <YourApp />
    </FhevmProvider>
  );
}
```

### Use Hooks

```typescript
import { useEncrypt, useDecrypt, useFhevm } from '@fhevm/react';
import { FheType } from '@fhevm/sdk';

function YourComponent() {
  const { isInitialized, publicKey } = useFhevm();
  const { encrypt, isEncrypting } = useEncrypt();
  const { decrypt, isDecrypting } = useDecrypt();

  const handleEncrypt = async () => {
    const encrypted = await encrypt(42, FheType.UINT32);
    console.log('Encrypted:', encrypted);
  };

  const handleDecrypt = async () => {
    const result = await decrypt({
      contractAddress: '0x...',
      handle: '0x...',
      userAddress: '0x...',
    }, signer);
    console.log('Decrypted:', result.value);
  };

  return (
    <div>
      <button onClick={handleEncrypt} disabled={!isInitialized}>
        Encrypt
      </button>
      <button onClick={handleDecrypt}>
        Decrypt
      </button>
    </div>
  );
}
```

### Use Components

```typescript
import { EncryptedInput } from '@fhevm/react';
import { FheType } from '@fhevm/sdk';

function VotingForm() {
  const handleEncrypted = (data) => {
    console.log('Encrypted vote:', data);
    // Send to contract
  };

  return (
    <EncryptedInput
      type="number"
      fheType={FheType.UINT8}
      placeholder="Your vote (0 or 1)"
      onEncrypted={handleEncrypted}
    />
  );
}
```

## Core Concepts

### 1. FHE Types

FHEVM supports several encrypted types:

```typescript
enum FheType {
  BOOL = 0,      // Encrypted boolean
  UINT8 = 1,     // Encrypted 8-bit unsigned integer
  UINT16 = 2,    // Encrypted 16-bit unsigned integer
  UINT32 = 3,    // Encrypted 32-bit unsigned integer
  UINT64 = 4,    // Encrypted 64-bit unsigned integer
  UINT128 = 5,   // Encrypted 128-bit unsigned integer
  UINT256 = 6,   // Encrypted 256-bit unsigned integer
  ADDRESS = 7,   // Encrypted address
  BYTES = 8,     // Encrypted bytes
}
```

### 2. Encryption

```typescript
const encrypted = await encrypt(value, FheType.UINT32);
// Returns: { data: string, publicKey: string }
```

### 3. Decryption

Two types of decryption:

**User Decryption (requires signature):**
```typescript
const result = await userDecrypt(request, signer);
// Uses EIP-712 signature
```

**Public Decryption:**
```typescript
const value = await publicDecrypt(handle);
// For publicly revealed data
```

### 4. EIP-712 Signatures

Used for secure user decryption:

```typescript
const signature = await createDecryptionSignature(
  {
    contractAddress: '0x...',
    handle: '0x...',
    userAddress: '0x...',
  },
  signer
);
```

## Smart Contract Integration

### Deploy Your Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyPrivateContract {
    mapping(address => bytes32) private encryptedData;

    function submitEncrypted(bytes32 data) external {
        encryptedData[msg.sender] = data;
    }

    function getEncrypted() external view returns (bytes32) {
        return encryptedData[msg.sender];
    }
}
```

### Interact from Frontend

```typescript
const contract = new ethers.Contract(address, abi, signer);

// Submit encrypted data
const encrypted = await encrypt(42, FheType.UINT32);
await contract.submitEncrypted(encrypted.data);

// Retrieve and decrypt
const handle = await contract.getEncrypted();
const decrypted = await publicDecrypt(handle);
```

## Next Steps

- Explore the [Architecture](./ARCHITECTURE.md) documentation
- Check out the [API Reference](./API.md)
- Build your own privacy-preserving dApp!
- Join the community on GitHub

## Troubleshooting

### "Client not initialized"

Make sure to wrap your app with `FhevmProvider` and wait for `isInitialized`.

### "MetaMask not found"

Install MetaMask browser extension.

### Contract deployment fails

Check that Hardhat node is running and your account has funds.

### Encryption is slow

FHE operations are computationally intensive. Consider:
- Using web workers
- Showing loading indicators
- Batching operations

## Resources

- [Full Example Code](../examples/nextjs)
- [Contract Examples](../packages/contracts/contracts)
- [API Documentation](./API.md)
- GitHub Issues for support
