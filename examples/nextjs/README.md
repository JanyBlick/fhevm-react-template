# FHEVM Next.js Example

Example Next.js application demonstrating FHEVM SDK usage with a private voting dApp.

## Features

- Connect wallet (MetaMask)
- Create voting proposals
- Cast encrypted votes
- View finalized results
- Full TypeScript support
- Responsive UI

## Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment:**

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
- RPC URL
- Chain ID
- Contract address (after deploying)

3. **Deploy contracts first:**

```bash
# From monorepo root
npm run deploy:contracts
```

Update `.env.local` with the deployed contract address.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Connect Wallet

1. Click "Connect Wallet"
2. Approve MetaMask connection

### Create a Proposal

1. Enter proposal description
2. Set voting period (in seconds)
3. Click "Create Proposal"

### Vote

1. Click "Vote Yes" or "Vote No" on any active proposal
2. Your vote will be encrypted using FHE
3. Results are revealed only after the deadline

## Integration with FHEVM SDK

This example demonstrates:

```typescript
// Provider setup
<FhevmProvider config={config}>
  <YourApp />
</FhevmProvider>

// Using hooks
const { encrypt } = useEncrypt();
const { client, isInitialized } = useFhevm();

// Encrypting data
const encrypted = await encrypt(voteValue, FheType.UINT8);

// Using with contracts
const tx = await contract.vote(proposalId, encrypted.data);
```

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- ethers.js
- @fhevm/sdk
- @fhevm/react

## License

MIT
