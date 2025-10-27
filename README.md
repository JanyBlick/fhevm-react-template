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
- **[@fhevm/example-renovation-budget](./examples/renovation-budget)** - 🚀 **Production Zama fhEVM app** 
  - **[Live Demo](https://janyblick.github.io/RenovationBudget/)** 🌐
  - **[GitHub Repo](https://github.com/JanyBlick/fhevm-react-template)** 
  - See `demo1.mp4 demo2.mp4 demo3.mp4` for walkthrough

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

### 1. Next.js Comprehensive Example (Educational)
**Location:** `examples/nextjs/`

A complete full-featured example using our demo SDK:
- Private voting system
- Encryption and decryption demos
- Homomorphic computation examples
- Key management interface
- Banking use case (private transactions)
- Medical use case (health data privacy)
- Complete API routes implementation
- `@fhevm/react` hooks integration
- Custom React hooks and components
- Mock FHE operations for learning
- Works on any EVM network

**Features:**
- 6 interactive demo tabs
- Comprehensive component library
- API routes for server-side operations
- Full TypeScript support
- Modern UI with Tailwind CSS

```bash
npm run dev:nextjs
# → http://localhost:3000
```

### 2. Renovation Budget Manager (Production)
**Location:** `examples/renovation-budget/`

A **real production dApp** using Zama's fhEVM:
- ✅ Real TFHE encryption (not mocks!)
- ✅ Complex business logic with FHE
- ✅ Zama Gateway integration
- ✅ Deployed on Sepolia testnet
- 🌐 **[Try Live Demo](https://janyblick.github.io/RenovationBudget/)**
- 📹 Watch `demo.mp4` for walkthrough
- 🔗 **[Source Code](https://github.com/JanyBlick/fhevm-react-template)**

```bash
cd examples/renovation-budget
npm install
npm run dev  # Original vanilla JS frontend
# → http://localhost:8080
```

**Or try it live:** [https://janyblick.github.io/RenovationBudget/](https://janyblick.github.io/RenovationBudget/)

See [Integration Guide](./examples/renovation-budget/INTEGRATION_GUIDE.md) for details.

## Package Structure

```
fhevm-sdk-monorepo/
├── packages/
│   ├── sdk/              # Core SDK (demo/educational)
│   ├── react/            # React hooks & adapters
│   └── contracts/        # Simple example contracts
├── templates/            # Starter templates
│   └── README.md         # Template documentation
├── examples/
│   ├── nextjs/           # Next.js comprehensive demo
│   │   ├── src/
│   │   │   ├── app/      # Next.js App Router with API routes
│   │   │   ├── components/ # UI and FHE components
│   │   │   ├── lib/      # Utility libraries
│   │   │   ├── hooks/    # Custom React hooks
│   │   │   └── types/    # TypeScript definitions
│   │   └── README.md     # Next.js example documentation
│   └── renovation-budget/ # Production Zama fhEVM app
│       ├── demo.mp4      # Video walkthrough
│       └── ... (live on GitHub Pages)
└── docs/                 # Comprehensive documentation
    ├── API.md            # API reference
    ├── ARCHITECTURE.md   # System architecture
    ├── COMPARISON.md     # Demo vs Production comparison
    └── GETTING_STARTED.md # Quick start guide
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
- ✅ **Live demo available**
- ✅ **Deployed on Sepolia**
- ℹ️ Requires Zama-enabled network

## Documentation

- [Setup Guide](./SETUP.md) - Complete setup instructions
- [Getting Started](./docs/GETTING_STARTED.md) - Tutorial for demo SDK
- [API Reference](./docs/API.md) - Complete API documentation
- [Architecture](./docs/ARCHITECTURE.md) - System design
- [Comparison](./docs/COMPARISON.md) - Demo SDK vs Production fhEVM
- [Contributing](./CONTRIBUTING.md) - Development guidelines
- [Renovation Budget Integration](./examples/renovation-budget/INTEGRATION_GUIDE.md) - Production example guide

## Why Two Approaches?

### Demo SDK (`@fhevm/sdk`, `@fhevm/react`)
**Purpose:** Learning and prototyping

- Easy to understand
- Works anywhere
- No special infrastructure
- Great for development
- Fast iteration

### Production Example (Renovation Budget)
**Purpose:** Real-world reference

- Real encryption
- Production patterns
- Complex use cases  
- Zama network required
- **Live demo to try**

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

## Live Demo

🎯 **Try the production example now:**

**[https://janyblick.github.io/RenovationBudget/](https://janyblick.github.io/RenovationBudget/)**

See real FHE operations in action:
- Connect MetaMask to Sepolia
- Submit encrypted renovation budgets
- Add encrypted room requirements
- Submit contractor bids privately
- Calculate encrypted totals
- Request Gateway decryption

Watch `examples/renovation-budget/demo.mp4` for a full walkthrough!

## License

MIT - See [LICENSE](./LICENSE)

## Learn More

- Start with the [Next.js example](./examples/nextjs) to learn SDK basics
- **Try the [live demo](https://janyblick.github.io/RenovationBudget/)** to see production FHE
- Watch `demo.mp4` for a video walkthrough
- Study the [Renovation Budget code](https://github.com/JanyBlick/fhevm-react-template) for production patterns
- Check [Zama fhEVM docs](https://docs.zama.ai/fhevm) for real FHE development
- Review [API docs](./docs/API.md) for complete reference
- Read [Comparison Guide](./docs/COMPARISON.md) to understand the differences

---

**Built with ❤️ for privacy-preserving dApp development**

**🌐 Live Demo:** [janyblick.github.io/RenovationBudget](https://janyblick.github.io/RenovationBudget/) | **📹 Video:** `examples/renovation-budget/demo.mp4`
