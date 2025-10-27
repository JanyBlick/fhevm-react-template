# React Template for FHEVM SDK

This is a production-ready React/Next.js template demonstrating real-world FHEVM application development.

## Location

The complete React example is located at: `../../examples/renovation-budget/`

This directory serves as a reference pointer. For the full implementation, navigate to the examples directory.

## Quick Start

```bash
cd ../../examples/renovation-budget
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the application.

## Features

- **React 18 + Next.js 14**: Modern React with App Router
- **Real Smart Contract Integration**: Deployed on Sepolia testnet
- **Full FHE Workflow**: End-to-end encrypted operations
- **Production-Ready**: Complete with testing and deployment scripts
- **TypeScript**: Full type safety across the stack

## Use Case: Private Renovation Budget

A real-world application for confidential renovation cost estimation:

- **Homeowners**: Create projects, add encrypted room requirements, calculate budgets
- **Contractors**: Submit encrypted bids, view project details
- **Administrators**: Verify contractors, manage platform

## Project Structure

```
examples/renovation-budget/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Main application
│   │   └── globals.css          # Styles
│   │
│   ├── components/              # React components
│   │   ├── WalletConnection.tsx # MetaMask integration
│   │   ├── FHEProvider.tsx      # FHE context
│   │   ├── HomeownerPanel.tsx   # Homeowner UI
│   │   ├── ContractorPanel.tsx  # Contractor UI
│   │   └── AdminPanel.tsx       # Admin UI
│   │
│   └── hooks/                   # Custom hooks
│       └── useContract.ts       # Smart contract hook
│
├── contracts/                   # Solidity contracts
├── scripts/                     # Deployment scripts
├── test/                        # Contract tests
├── package.json
├── hardhat.config.js
├── next.config.js
└── README.md
```

## SDK Integration

### FHE Provider Setup

```typescript
import { createFhevmClient } from '@fhevm/sdk';
import { ethers } from 'ethers';

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

const client = createFhevmClient({
  providerUrl: 'https://sepolia.infura.io/v3/',
  chainId: 11155111,
});

await client.init();
```

### Encrypting User Input

```typescript
import { FheType } from '@fhevm/sdk';

// Encrypt sensitive data before submitting to blockchain
const encryptedArea = await client.encryptInput(
  roomArea,
  FheType.UINT32
);

const encryptedCost = await client.encryptInput(
  materialCost,
  FheType.UINT32
);

// Submit to smart contract
await contract.addRoomRequirement(
  projectId,
  encryptedArea.data,
  encryptedCost.data,
  encryptedLabor.data
);
```

### Smart Contract Interaction

```typescript
import { ethers } from 'ethers';

const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  signer
);

// All operations preserve data privacy through FHE
const tx = await contract.createProject();
await tx.wait();
```

## Key Features

### 1. Wallet Integration
- MetaMask connection
- Network switching (Sepolia)
- Account management

### 2. FHE Operations
- Client-side encryption
- Encrypted contract calls
- Privacy-preserved calculations

### 3. Smart Contract Features
- Project management
- Encrypted room requirements
- Confidential budget calculations
- Private bid submission
- Contractor verification

## Development

```bash
# Install dependencies
npm install

# Compile smart contracts
npm run compile

# Run tests
npm run test

# Deploy contracts
npm run deploy

# Run development server
npm run dev

# Build for production
npm run build
```

## Smart Contract

**Deployed Address**: `0x55F046c86B21805df96997b479e9CF88ce8692C1`

**Network**: Sepolia Testnet

**Functions**:
- `createProject()`: Initialize new project
- `addRoomRequirement()`: Add encrypted room specs
- `calculateBudget()`: Compute private budget
- `submitBid()`: Contractor encrypted bids
- `approveProject()`: Select winning contractor
- `verifyContractor()`: Admin verification

## Environment Setup

Create a `.env` file:

```env
PRIVATE_KEY=your_private_key_here
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
ETHERSCAN_API_KEY=your_etherscan_key
```

## Deployment

Ready for deployment to:
- Vercel (recommended for Next.js)
- GitHub Pages (static export)
- Netlify
- AWS Amplify

## Learn More

- [Application README](../../examples/renovation-budget/README.md)
- [Smart Contract Source](../../examples/renovation-budget/contracts/)
- [FHEVM SDK Documentation](../../packages/sdk/README.md)
- [Getting Started Guide](../../docs/GETTING_STARTED.md)

## Support

For issues and questions:
1. Check the [example README](../../examples/renovation-budget/README.md)
2. Review the [implementation code](../../examples/renovation-budget/src/)
3. Consult the [SDK documentation](../../packages/sdk/)

## License

MIT - See [LICENSE](../../LICENSE)
