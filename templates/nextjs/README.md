# Next.js Template for FHEVM SDK

This is a comprehensive Next.js template demonstrating full FHEVM SDK integration with multiple use cases.

## Location

The complete Next.js example is located at: `../../examples/nextjs/`

This directory serves as a reference pointer. For the full implementation, navigate to the examples directory.

## Quick Start

```bash
cd ../../examples/nextjs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Features

- **Next.js 14 App Router**: Modern React framework with server components
- **Full SDK Integration**: Demonstrates @fhevm/sdk usage patterns
- **Multiple Examples**: Voting, banking, medical data privacy
- **API Routes**: Server-side FHE operations
- **Component Library**: Reusable FHE-enabled components
- **TypeScript**: Full type safety

## Project Structure

```
examples/nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   ├── globals.css        # Global styles
│   │   └── api/               # API routes
│   │       ├── fhe/           # FHE operations
│   │       └── keys/          # Key management
│   │
│   ├── components/            # React components
│   │   ├── ui/               # UI components
│   │   ├── fhe/              # FHE functionality
│   │   └── examples/         # Use case examples
│   │
│   ├── lib/                  # Utility libraries
│   │   ├── fhe/             # FHE client/server
│   │   └── utils/           # Helper functions
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useFHE.ts
│   │   ├── useEncryption.ts
│   │   └── useComputation.ts
│   │
│   └── types/              # TypeScript definitions
│
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## SDK Integration Examples

### Initialize FHE Client

```typescript
import { createFhevmClient } from '@fhevm/sdk';

const client = createFhevmClient({
  providerUrl: process.env.NEXT_PUBLIC_PROVIDER_URL,
  chainId: 11155111,
});

await client.init();
```

### Encrypt Data

```typescript
import { FheType } from '@fhevm/sdk';

const encryptedData = await client.encryptInput(
  sensitiveValue,
  FheType.UINT32
);
```

### Use in React Components

```typescript
import { useFHE } from '@/hooks/useFHE';

function MyComponent() {
  const { client, isReady } = useFHE();

  // Use client for FHE operations
}
```

## Use Cases Demonstrated

### 1. Private Voting
- Anonymous vote submission
- Encrypted vote tallying
- Result decryption with access control

### 2. Banking Example
- Confidential balance operations
- Private transaction amounts
- Encrypted account calculations

### 3. Medical Data
- Patient data encryption
- HIPAA-compliant processing
- Secure data sharing

## API Routes

### Encryption Endpoint
```typescript
POST /api/fhe/encrypt
Body: { value: number, type: string }
Response: { encryptedData: string }
```

### Decryption Endpoint
```typescript
POST /api/fhe/decrypt
Body: { encryptedData: string, signature: string }
Response: { decryptedValue: number }
```

### Computation Endpoint
```typescript
POST /api/fhe/compute
Body: { operation: string, operands: string[] }
Response: { result: string }
```

## Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_PROVIDER_URL=https://sepolia.infura.io/v3/YOUR_KEY
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

This template is ready for deployment to:
- Vercel
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## Learn More

- [FHEVM SDK Documentation](../../packages/sdk/README.md)
- [Getting Started Guide](../../docs/GETTING_STARTED.md)
- [API Reference](../../docs/API.md)
- [Architecture Overview](../../docs/ARCHITECTURE.md)

## Support

For issues and questions:
1. Check the [main README](../../README.md)
2. Review the [example code](../../examples/nextjs/)
3. Consult the [SDK documentation](../../packages/sdk/)

## License

MIT - See [LICENSE](../../LICENSE)
