# Renovation Budget Integration with FHEVM SDK

This document explains how the Private Renovation Budget dApp has been integrated into the FHEVM SDK monorepo.

## Overview

The Private Renovation Budget Manager is a production dApp built with Zama's fhEVM that demonstrates real-world FHE usage. It has been integrated as an example showcasing:

- Real Zama fhEVM contracts (not mocks)
- Production-grade FHE operations
- Multiple encrypted data types (euint32, euint64, ebool)
- Complex business logic with privacy preservation

## Original Structure

The original dApp uses:
- **Contracts**: Zama fhEVM v0.8.0 with real FHE operations
- **Frontend**: Vanilla HTML/JS with fhevmjs library
- **Network**: Sepolia testnet with Zama Gateway

## Integration Approach

### Option 1: Keep Original Structure (Recommended for Production)

The existing setup already uses Zama's production fhEVM libraries. Keep using:

```bash
# Run the original frontend
npm run dev  # Serves on http://localhost:8080

# Deploy to Sepolia
npm run deploy
```

### Option 2: Migrate to Next.js with @fhevm/react

For learning purposes or to demonstrate the SDK, we can create a Next.js wrapper:

1. **Use existing contracts** (already production-ready)
2. **Create Next.js frontend** using `@fhevm/react` hooks
3. **Integrate fhevmjs** for real FHE operations

## Key Differences: Mock SDK vs Real fhEVM

| Feature | Our Demo SDK | Zama fhEVM (This App) |
|---------|--------------|----------------------|
| Encryption | Mock (demonstration) | Real TFHE encryption |
| Network | Any EVM | Zama-enabled networks |
| Contracts | Simple examples | Production FHE operations |
| Decryption | Simulated | Gateway-based with KMS |
| Security | Educational | Production-grade |

## Contract Features

The `PrivateRenovationBudget.sol` contract demonstrates:

### 1. Encrypted Data Types

```solidity
euint32 area;          // Encrypted room area
euint32 materialCost;  // Encrypted costs
euint64 totalBudget;   // Encrypted budget
ebool isActive;        // Encrypted boolean
```

### 2. FHE Operations

```solidity
// Encrypted comparisons
FHE.decrypt(condition)

// Encrypted arithmetic
euint64 total = encryptedSum(values);

// Sealed bids (fully private)
euint64 bidAmount;
```

### 3. Gateway Integration

- KMS (Key Management Service) integration
- Decryption requests with pausers
- Re-randomization for sIND-CPAD security
- Multiple KMS node responses

## Using This Example

### Current Setup (Vanilla JS)

```bash
cd examples/renovation-budget

# Install dependencies
npm install

# Compile contracts
npm run compile

# Deploy to Sepolia (requires funded wallet)
npm run deploy

# Run frontend
npm run dev
```

### Migrating to SDK Patterns

If you want to use `@fhevm/react` hooks with real fhEVM:

1. **Keep the contracts unchanged** (they're production-ready)
2. **Install fhevmjs**:
   ```bash
   npm install fhevmjs
   ```

3. **Create wrapper hooks**:
   ```typescript
   import { useFhevm } from '@fhevm/react';
   import { createInstance } from 'fhevmjs';

   // Initialize fhevmjs instance
   const fhevmInstance = await createInstance({
     networkUrl: 'https://devnet.zama.ai',
     gatewayUrl: 'https://gateway.zama.ai'
   });

   // Use with our SDK patterns
   const { encrypt } = useEncrypt();
   ```

4. **Adapt encryption calls**:
   ```typescript
   // Original (fhevmjs)
   const encrypted = instance.encrypt32(value);

   // With SDK hooks
   const { encrypt } = useEncrypt();
   const encrypted = await encrypt(value, FheType.UINT32);
   ```

## Project Structure

```
examples/renovation-budget/
├── contracts/
│   └── PrivateRenovationBudget.sol    # Production fhEVM contract
├── public/
│   ├── app.js                          # Original frontend
│   └── index.html
├── scripts/
│   └── deploy.js                       # Deployment script
├── test/
│   └── PrivateRenovationBudget.test.ts
├── hardhat.config.js
└── package.json
```

## Learning from This Example

### 1. Study the Contract

See `contracts/PrivateRenovationBudget.sol` for:
- How to use real FHE types
- Encrypted business logic
- Gateway integration patterns
- Decryption request handling

### 2. Understand the Flow

1. **Encrypt on Client**: Use fhevmjs to encrypt inputs
2. **Submit to Contract**: Send encrypted data
3. **Compute on Encrypted**: Contract performs FHE operations
4. **Request Decryption**: Through Gateway if needed
5. **Receive Results**: KMS handles decryption

### 3. Compare with Demo SDK

Our demo SDK (`@fhevm/sdk`) simplifies FHE concepts for learning.
This example shows production implementation with Zama's stack.

## Deployment

### Sepolia Testnet

1. **Get Sepolia ETH**: From faucet
2. **Configure `.env`**:
   ```env
   PRIVATE_KEY=your_private_key
   SEPOLIA_RPC_URL=your_rpc_url
   ```
3. **Deploy**:
   ```bash
   npm run deploy
   ```

### Integration with Monorepo

To use this alongside the demo SDK:

```bash
# From monorepo root
cd examples/renovation-budget

# This example is standalone but can reference SDK packages
npm install
npm run dev
```

## Why Keep Both?

### Demo SDK (`@fhevm/sdk`)
- ✅ Educational
- ✅ Easy to understand
- ✅ Works on any network
- ✅ No special infrastructure
- ❌ Not production FHE

### Renovation Budget (Zama fhEVM)
- ✅ Production-ready
- ✅ Real encryption
- ✅ Complex business logic
- ✅ Gateway integration
- ❌ Requires Zama network
- ❌ More complex setup

## Next Steps

1. **Study the contracts** to understand real FHE
2. **Run the original app** to see it in action
3. **Optionally migrate** UI to Next.js for consistency
4. **Compare patterns** between demo SDK and production code

## Resources

- [Zama fhEVM Docs](https://docs.zama.ai/fhevm)
- [fhevmjs Library](https://github.com/zama-ai/fhevmjs)
- [Gateway Documentation](https://docs.zama.ai/fhevm/getting-started/gateway)
- [Original Project README](./README.md)

## Contributing

When modifying this example:
- Keep contracts compatible with Zama fhEVM
- Test on Sepolia before mainnet
- Update documentation with changes
- Follow original security patterns

---

**This example demonstrates production FHE usage and serves as a bridge between our educational SDK and real-world applications.**
