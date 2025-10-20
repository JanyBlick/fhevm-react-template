# FHEVM SDK Monorepo

A comprehensive SDK for building privacy-preserving decentralized applications using Fully Homomorphic Encryption (FHE) on Ethereum.

## Architecture

This monorepo contains:

### Core Packages
- **[@fhevm/sdk](./packages/sdk)** - Core SDK with encryption/decryption utilities
- **[@fhevm/react](./packages/react)** - React hooks and components  
- **[@fhevm/contracts](./packages/contracts)** - Solidity smart contracts with FHE support

### Examples
- **[@fhevm/example-nextjs](./examples/nextjs)** - Next.js template with voting dApp
- **[@fhevm/example-renovation-budget](./examples/renovation-budget)** - Production Zama fhEVM app (Private Renovation Budget Manager)

## Quick Start

### Install all dependencies

```bash
npm run install:all
```

### Build all packages

```bash
npm run build
```

### Compile and deploy demo contracts

```bash
npm run compile:contracts
npm run deploy:contracts
```

### Run Examples

```bash
# Next.js voting example (demo SDK)
npm run dev:nextjs

# Renovation Budget app (production Zama fhEVM)
cd examples/renovation-budget && npm run dev
```

## Examples Overview

### 1. Next.js Voting Example (Educational)
**Location:** `examples/nextjs/`

A complete educational example using our demo SDK:
- Simple voting system
- `@fhevm/react` hooks integration
- Mock FHE operations for learning
- Works on any EVM network

```bash
npm run dev:nextjs
```

### 2. Renovation Budget Manager (Production)
**Location:** `examples/renovation-budget/`

A **real production dApp** using Zama's fhEVM:
- Real TFHE encryption (not mocks!)
- Complex business logic with FHE
- Zama Gateway integration
- Deployed on Sepolia testnet

```bash
cd examples/renovation-budget
npm install
npm run dev  # Original vanilla JS frontend
```

See [Integration Guide](./examples/renovation-budget/INTEGRATION_GUIDE.md) for details.

## Package Structure

```
fhevm-sdk-monorepo/
├── packages/
│   ├── sdk/              # Core SDK (demo/educational)
│   ├── react/            # React hooks & adapters
│   └── contracts/        # Simple example contracts
└── examples/
    ├── nextjs/           # Next.js demo app
    └── renovation-budget/ # Production Zama fhEVM app
```

## Features

### Demo SDK Features
- ✅ Universal SDK that works across environments
- ✅ Modular API structure similar to wagmi  
- ✅ EIP-712 signature support
- ✅ React hooks for easy integration
- ✅ Works on any EVM network
- ℹ️ Mock encryption (educational purposes)

### Production Example Features
- ✅ Real TFHE encryption via Zama
- ✅ Gateway-based decryption
- ✅ Production-grade contracts
- ✅ Complex encrypted business logic
- ℹ️ Requires Zama-enabled network

## Documentation

- [Setup Guide](./SETUP.md) - Complete setup instructions
- [Getting Started](./docs/GETTING_STARTED.md) - Tutorial for demo SDK
- [API Reference](./docs/API.md) - Complete API documentation
- [Architecture](./docs/ARCHITECTURE.md) - System design
- [Contributing](./CONTRIBUTING.md) - Development guidelines
- [Renovation Budget Integration](./examples/renovation-budget/INTEGRATION_GUIDE.md) - Production example guide

## Why Two Approaches?

### Demo SDK (`@fhevm/sdk`, `@fhevm/react`)
**Purpose:** Learning and prototyping

- Easy to understand
- Works anywhere
- No special infrastructure
- Great for development

### Production Example (Renovation Budget)
**Purpose:** Real-world reference

- Real encryption
- Production patterns
- Complex use cases  
- Zama network required

## Available Scripts

From monorepo root:

```bash
# Installation & Build
npm run install:all          # Install all dependencies
npm run build               # Build all packages
npm run build:sdk           # Build SDK only
npm run build:react         # Build React package only

# Contracts (Demo)
npm run compile:contracts   # Compile demo contracts
npm run deploy:contracts    # Deploy demo contracts

# Examples
npm run dev:nextjs          # Run Next.js example
cd examples/renovation-budget && npm run dev  # Run production example

# Maintenance
npm run clean               # Clean all build artifacts
npm run test                # Run all tests
```

## License

MIT - See [LICENSE](./LICENSE)

## Learn More

- Start with the [Next.js example](./examples/nextjs) to learn SDK basics
- Study the [Renovation Budget app](./examples/renovation-budget) for production patterns
- Check [Zama fhEVM docs](https://docs.zama.ai/fhevm) for real FHE development
- Review [API docs](./docs/API.md) for complete reference

---

**Built with ❤️ for privacy-preserving dApp development**
