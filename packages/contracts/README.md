# @fhevm/contracts

Solidity smart contracts with FHE (Fully Homomorphic Encryption) support for privacy-preserving dApps.

## Overview

This package contains example smart contracts that demonstrate FHE operations:

- **PrivateVoting**: A voting system with encrypted votes
- **IFHE**: Interface for FHE operations (mock for demonstration)

## Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your configuration
```

## Usage

### Compile Contracts

```bash
npm run compile
```

This compiles all Solidity contracts using Hardhat.

### Export ABIs

```bash
npm run export-abi
```

Extracts ABIs from compiled contracts and saves them to the `abi/` directory.

### Build (Compile + Export)

```bash
npm run build
```

Runs both compile and ABI export.

### Deploy

```bash
# Deploy to localhost
npm run deploy:localhost

# Deploy to other networks
npm run deploy -- --network sepolia
```

### Run Tests

```bash
npm run test
```

## Contracts

### PrivateVoting

A demonstration contract for private voting using encrypted votes.

**Key Features:**
- Create proposals with voting deadlines
- Cast encrypted votes (yes/no)
- Finalize and reveal results after voting ends
- Prevents double voting

**Example Usage:**

```javascript
const voting = await ethers.getContractAt('PrivateVoting', address);

// Create proposal
await voting.createProposal('Should we...?', 86400); // 24 hours

// Cast encrypted vote
await voting.vote(proposalId, encryptedVote);

// Finalize after deadline
await voting.finalizeProposal(proposalId, yesVotes, noVotes);
```

## Integration with Frontend

After deployment, copy the contract address and ABI to your frontend:

```javascript
import PrivateVotingABI from '@fhevm/contracts/abi/PrivateVoting.json';

const contract = new ethers.Contract(
  '0x...', // deployed address
  PrivateVotingABI,
  signer
);
```

## Production Usage

This is a demonstration/template. For production:

1. Replace mock FHE operations with a real FHE library (e.g., Zama's fhEVM)
2. Implement proper access control and permissions
3. Add comprehensive tests
4. Conduct security audits

## License

MIT
