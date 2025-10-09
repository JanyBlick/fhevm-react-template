# FHEVM SDK Architecture

## Overview

The FHEVM SDK is designed as a modular, layered architecture that separates concerns and enables flexibility.

## Architecture Layers

```
┌─────────────────────────────────────────┐
│         Application Layer               │
│    (Next.js, Vue, React Native, etc.)   │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      Framework Adapters Layer           │
│         (@fhevm/react, etc.)            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│          Core SDK Layer                 │
│           (@fhevm/sdk)                  │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│       Smart Contracts Layer             │
│        (@fhevm/contracts)               │
└─────────────────────────────────────────┘
```

## Core Components

### 1. Core SDK (@fhevm/sdk)

**Purpose:** Framework-agnostic FHE operations

**Key Components:**
- `FhevmClient`: Main client for FHE operations
- `crypto`: Encryption/decryption utilities
- `types`: TypeScript type definitions

**Responsibilities:**
- Key generation and management
- Data encryption/decryption
- EIP-712 signature handling
- Provider management

### 2. React Adapter (@fhevm/react)

**Purpose:** React-specific integration

**Key Components:**
- `FhevmProvider`: React context provider
- `useEncrypt`: Hook for encryption
- `useDecrypt`: Hook for decryption
- `EncryptedInput`: Pre-built component

**Responsibilities:**
- State management
- React lifecycle integration
- Component abstractions

### 3. Smart Contracts (@fhevm/contracts)

**Purpose:** On-chain FHE logic

**Key Components:**
- `PrivateVoting`: Example voting contract
- `IFHE`: FHE operations interface

**Responsibilities:**
- Encrypted data storage
- FHE computations
- Access control

## Data Flow

### Encryption Flow

```
User Input → useEncrypt() → FhevmClient.encryptInput()
→ crypto.encrypt() → Encrypted Data → Smart Contract
```

### Decryption Flow

```
Smart Contract → FhevmClient.userDecrypt()
→ EIP-712 Signature → crypto.decrypt() → Decrypted Value
```

## Key Design Decisions

### 1. Monorepo Structure

**Why:**
- Shared dependencies
- Coordinated releases
- Easier cross-package development

**Benefits:**
- Single source of truth
- Simplified version management
- Better developer experience

### 2. Framework Adapters Pattern

**Why:**
- Core SDK remains framework-agnostic
- Easy to add new framework support

**Benefits:**
- Vue, Angular, Svelte adapters can be added
- Node.js usage without React overhead
- Smaller bundle sizes

### 3. TypeScript First

**Why:**
- Type safety for cryptographic operations
- Better developer experience
- Catch errors at compile time

### 4. Modular API Design

**Inspired by:** wagmi, viem

**Pattern:**
```typescript
// Composable hooks
const { encrypt } = useEncrypt();
const { decrypt } = useDecrypt();
const { publicKey } = usePublicKey();
```

**Benefits:**
- Tree-shaking friendly
- Only import what you need
- Easy to test

## Security Considerations

### 1. Key Management

- Keys generated client-side
- Private keys never transmitted
- Optional external key storage

### 2. Signature Verification

- EIP-712 for structured data signing
- Prevents replay attacks
- Domain separation

### 3. Access Control

- Contract-level permissions
- User-specific decryption
- Public decryption for revealed data

## Extension Points

### Adding New FHE Types

1. Update `FheType` enum in types
2. Add encryption logic in crypto
3. Update smart contract interface
4. Add React hooks if needed

### Adding New Framework Adapter

1. Create new package (e.g., `@fhevm/vue`)
2. Import `@fhevm/sdk`
3. Implement framework-specific bindings
4. Follow adapter pattern from `@fhevm/react`

### Adding New Contracts

1. Implement in `packages/contracts/contracts/`
2. Add deployment script
3. Export ABI
4. Document usage

## Performance Considerations

### 1. Encryption Performance

- Encryption happens client-side
- Uses Web Crypto API when available
- Async operations for large data

### 2. Bundle Size

- Tree-shakeable exports
- Optional dependencies
- Code splitting in examples

### 3. Network Optimization

- Batch operations when possible
- Cache public keys
- Minimize contract calls

## Future Enhancements

1. **Multi-network Support**: Better network switching
2. **Batch Operations**: Encrypt/decrypt multiple values
3. **Storage Adapters**: IndexedDB, localStorage for keys
4. **Worker Support**: Encryption in web workers
5. **Native Mobile**: React Native adapter

## Testing Strategy

### Unit Tests
- Core crypto functions
- Client methods
- Type conversions

### Integration Tests
- Contract interactions
- End-to-end flows
- Multi-component scenarios

### Example Apps
- Real-world usage validation
- Performance benchmarking
- UI/UX testing
