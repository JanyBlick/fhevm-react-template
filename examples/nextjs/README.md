# Next.js FHEVM Example

A comprehensive Next.js application demonstrating the FHEVM SDK with multiple privacy-preserving use cases.

## Features

### Core Functionality
- **Private Voting**: Cast votes that remain encrypted on-chain
- **Encryption Demo**: Encrypt values using FHE before blockchain submission
- **Homomorphic Computation**: Perform calculations on encrypted data without decryption
- **Key Management**: Generate and manage FHE encryption keys
- **Banking Example**: Privacy-preserving financial transactions
- **Medical Example**: Secure health data management

### Technical Features
- **Modern UI**: Built with Next.js 14 and App Router
- **TypeScript**: Full type safety throughout
- **API Routes**: Server-side FHE operations
- **React Hooks**: Custom hooks for FHE operations
- **Component Library**: Reusable UI components
- **SDK Integration**: Complete @fhevm/sdk and @fhevm/react integration

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

From the monorepo root:

```bash
npm run install:all
npm run build
```

Or from this directory:

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page with tab navigation
│   ├── globals.css             # Global styles
│   └── api/                    # API routes
│       ├── fhe/
│       │   ├── route.ts         # Main FHE operations
│       │   ├── encrypt/route.ts # Encryption endpoint
│       │   ├── decrypt/route.ts # Decryption endpoint
│       │   └── compute/route.ts # Computation endpoint
│       └── keys/route.ts       # Key management API
│
├── components/                 # React components
│   ├── ui/                     # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── fhe/                    # FHE-specific components
│   │   ├── FHEProvider.tsx     # FHE context provider
│   │   ├── EncryptionDemo.tsx  # Encryption demo
│   │   ├── ComputationDemo.tsx # Computation demo
│   │   └── KeyManager.tsx      # Key management UI
│   ├── examples/               # Use case examples
│   │   ├── BankingExample.tsx  # Banking use case
│   │   └── MedicalExample.tsx  # Medical use case
│   └── VotingApp.tsx           # Voting demo
│
├── lib/                        # Utility libraries
│   ├── fhe/                    # FHE integration
│   │   ├── client.ts           # Client-side FHE
│   │   ├── server.ts           # Server-side FHE
│   │   ├── keys.ts             # Key management
│   │   └── types.ts            # FHE type definitions
│   └── utils/                  # Helper utilities
│       ├── security.ts         # Security utilities
│       └── validation.ts       # Input validation
│
├── hooks/                      # Custom React hooks
│   ├── useFHE.ts               # Main FHE hook
│   ├── useEncryption.ts        # Encryption hook
│   └── useComputation.ts       # Computation hook
│
└── types/                      # TypeScript types
    ├── fhe.ts                  # FHE type definitions
    └── api.ts                  # API types
```

## Usage Examples

### Encryption

```typescript
import { useEncrypt } from '@fhevm/react';
import { FheType } from '@fhevm/sdk';

function MyComponent() {
  const { encrypt, isLoading } = useEncrypt();

  const handleEncrypt = async () => {
    const result = await encrypt(42, FheType.UINT32);
    console.log('Encrypted:', result.data);
  };

  return <button onClick={handleEncrypt}>Encrypt</button>;
}
```

### Homomorphic Computation

```typescript
import { useComputation } from '@/hooks/useComputation';

function ComputeComponent() {
  const { compute, result, isComputing } = useComputation();

  const handleCompute = async () => {
    await compute('add', [10, 20]);
  };

  return (
    <div>
      <button onClick={handleCompute} disabled={isComputing}>
        Compute
      </button>
      {result && <p>Result: {result.value}</p>}
    </div>
  );
}
```

### Key Management

```typescript
import { usePublicKey } from '@fhevm/react';

function KeyComponent() {
  const { publicKey, generateKey } = usePublicKey();

  return (
    <div>
      <p>Public Key: {publicKey}</p>
      <button onClick={generateKey}>Generate New Key</button>
    </div>
  );
}
```

## API Endpoints

### Encryption API
- **POST /api/fhe/encrypt**
  - Encrypts a value using FHE
  - Body: `{ value: string | number, type?: string }`

### Decryption API
- **POST /api/fhe/decrypt**
  - Decrypts FHE-encrypted data
  - Body: `{ encryptedData: string, userAddress: string, signature?: string }`

### Computation API
- **POST /api/fhe/compute**
  - Performs homomorphic computation
  - Body: `{ operation: string, operands: number[] }`

### Key Management API
- **POST /api/keys**
  - Manages encryption keys
  - Body: `{ action: 'generate' | 'retrieve', address?: string }`

## Available Demos

1. **Voting Demo**: Private voting with encrypted ballots
2. **Encryption Demo**: Encrypt values before submission
3. **Computation Demo**: Perform calculations on encrypted data
4. **Key Management**: Generate and manage encryption keys
5. **Banking Example**: Private financial transactions
6. **Medical Example**: Secure health data management

## Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545
NEXT_PUBLIC_CHAIN_ID=31337
```

## Learn More

### Documentation
- [FHEVM SDK Documentation](../../packages/sdk/README.md)
- [FHEVM React Hooks](../../packages/react/README.md)
- [Project Setup Guide](../../SETUP.md)
- [API Documentation](../../docs/API.md)
- [Architecture Overview](../../docs/ARCHITECTURE.md)

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama fhEVM Documentation](https://docs.zama.ai/fhevm)
- [Fully Homomorphic Encryption](https://en.wikipedia.org/wiki/Homomorphic_encryption)

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## License

MIT - See [LICENSE](../../LICENSE)
