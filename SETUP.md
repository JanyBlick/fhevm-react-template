# Complete Setup Guide

This guide will walk you through setting up the entire FHEVM SDK monorepo from scratch.

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- Git
- MetaMask or another Web3 wallet
- A code editor (VS Code recommended)

## Step-by-Step Setup

### 1. Install All Dependencies

From the monorepo root:

```bash
npm run install:all
```

This will install dependencies for all packages and examples.

### 2. Build All Packages

Build packages in the correct order:

```bash
npm run build
```

This runs:
1. `@fhevm/sdk` build
2. `@fhevm/react` build (depends on SDK)
3. `@fhevm/contracts` compile

### 3. Set Up Smart Contracts

#### Start Local Blockchain

Open a new terminal and run:

```bash
cd packages/contracts
npx hardhat node
```

Keep this running. You should see:
- Account addresses with private keys
- "Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/"

#### Deploy Contracts

In another terminal:

```bash
npm run deploy:contracts
```

You should see:
```
Deploying PrivateVoting contract...
PrivateVoting deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**Copy this address** - you'll need it for the frontend!

### 4. Configure the Frontend Example

```bash
cd examples/nextjs
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545
NEXT_PUBLIC_CHAIN_ID=31337
NEXT_PUBLIC_VOTING_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

Replace the contract address with your deployed address from step 3.

### 5. Run the Example Application

From the monorepo root:

```bash
npm run dev:nextjs
```

Or from the Next.js directory:

```bash
cd examples/nextjs
npm run dev
```

Visit http://localhost:3000

### 6. Connect MetaMask

#### Add Local Network to MetaMask

1. Open MetaMask
2. Click network dropdown → "Add Network" → "Add a network manually"
3. Enter:
   - **Network Name:** Hardhat Local
   - **RPC URL:** http://127.0.0.1:8545
   - **Chain ID:** 31337
   - **Currency Symbol:** ETH

#### Import a Test Account

From the Hardhat node output, copy one of the private keys:

1. MetaMask → Account icon → "Import Account"
2. Paste the private key
3. You should see a balance of 10000 ETH

### 7. Test the Application

1. Click "Connect Wallet" in the app
2. Approve the connection in MetaMask
3. Create a proposal:
   - Enter description: "Should we use FHEVM?"
   - Voting period: 86400 (24 hours in seconds)
   - Click "Create Proposal"
4. Cast a vote:
   - Click "Vote Yes" or "Vote No"
   - Approve the transaction in MetaMask
5. Your vote is now encrypted on-chain!

## Development Workflow

### Working on SDK Core

```bash
cd packages/sdk
npm run dev  # Watch mode - rebuilds on changes
```

### Working on React Hooks

```bash
cd packages/react
npm run dev  # Watch mode
```

### Working on Contracts

Edit contracts in `packages/contracts/contracts/`:

```bash
cd packages/contracts
npm run compile  # Recompile after changes
npm test         # Run tests
```

### Testing Changes in Example App

With SDK/React in watch mode, the Next.js dev server will hot-reload changes automatically.

## Project Structure

```
fhevm-sdk-monorepo/
├── packages/
│   ├── sdk/                    # Core SDK
│   │   ├── src/
│   │   │   ├── client.ts      # Main client
│   │   │   ├── crypto.ts      # Crypto utilities
│   │   │   ├── types.ts       # TypeScript types
│   │   │   └── index.ts       # Exports
│   │   └── package.json
│   │
│   ├── react/                  # React hooks & components
│   │   ├── src/
│   │   │   ├── context.tsx    # React context
│   │   │   ├── hooks/         # Custom hooks
│   │   │   ├── components/    # React components
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── contracts/              # Smart contracts
│       ├── contracts/
│       │   ├── PrivateVoting.sol
│       │   └── IFHE.sol
│       ├── scripts/
│       │   ├── deploy.js
│       │   └── exportAbi.js
│       └── hardhat.config.js
│
├── examples/
│   └── nextjs/                 # Next.js example
│       ├── src/
│       │   ├── app/
│       │   └── components/
│       └── package.json
│
├── docs/                       # Documentation
│   ├── API.md
│   ├── ARCHITECTURE.md
│   └── GETTING_STARTED.md
│
└── package.json                # Root package.json
```

## Common Scripts

From monorepo root:

```bash
# Install all dependencies
npm run install:all

# Build all packages
npm run build

# Build specific package
npm run build:sdk
npm run build:react
npm run build:contracts

# Compile contracts
npm run compile:contracts

# Deploy contracts
npm run deploy:contracts

# Run Next.js example
npm run dev:nextjs

# Clean everything
npm run clean
```

## Troubleshooting

### "Cannot find module '@fhevm/sdk'"

Run `npm run build` from the root to build all packages.

### "Client not initialized"

Make sure you're wrapping your app with `FhevmProvider`.

### Contract deployment fails

1. Check Hardhat node is running
2. Verify you're using the correct network
3. Check account has sufficient funds

### Next.js build errors

1. Delete `.next` folder
2. Run `npm run clean` in examples/nextjs
3. Rebuild with `npm run build`

### Type errors

1. Delete all `node_modules` folders
2. Delete all `dist` folders
3. Run `npm run install:all`
4. Run `npm run build`

## Next Steps

- Read the [Getting Started Guide](./docs/GETTING_STARTED.md)
- Explore the [API Documentation](./docs/API.md)
- Understand the [Architecture](./docs/ARCHITECTURE.md)
- Build your own privacy-preserving dApp!

## Getting Help

- Check existing documentation in `/docs`
- Open an issue on GitHub
- Review example code in `/examples/nextjs`

## Production Deployment

For production use:

1. **Use Real FHE Library**: Replace mock crypto with production FHE (e.g., Zama's fhEVM)
2. **Deploy to Testnet**: Test on Sepolia or other testnet first
3. **Security Audit**: Have contracts audited
4. **Environment Variables**: Use proper secrets management
5. **Error Handling**: Add comprehensive error handling
6. **Monitoring**: Set up logging and monitoring
7. **Testing**: Add extensive unit and integration tests

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

## License

MIT - see [LICENSE](./LICENSE)
