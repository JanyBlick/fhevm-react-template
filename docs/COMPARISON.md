# Demo SDK vs Production fhEVM: A Comparison

This document compares our educational SDK with the production Zama fhEVM implementation, using the Renovation Budget app as an example.

## Overview

| Aspect | Demo SDK (`@fhevm/sdk`) | Production (Zama fhEVM) |
|--------|------------------------|-------------------------|
| **Purpose** | Education & prototyping | Production applications |
| **Encryption** | Mock (demonstration) | Real TFHE encryption |
| **Networks** | Any EVM chain | Zama-enabled networks |
| **Setup** | Simple | Complex (Gateway, KMS) |
| **Performance** | Fast (no real crypto) | Slower (real FHE ops) |
| **Security** | Not secure | Production-grade |

## Code Comparison

### 1. Client Initialization

#### Demo SDK
```typescript
import { createFhevmClient } from '@fhevm/sdk';

const client = createFhevmClient({
  providerUrl: 'https://any-rpc-url',
  chainId: 1
});

await client.init(); // Generates mock keypair
```

#### Production fhEVM
```typescript
import { createInstance } from 'fhevmjs';

const instance = await createInstance({
  networkUrl: 'https://devnet.zama.ai',
  gatewayUrl: 'https://gateway.zama.ai',
  kmsContractAddress: '0x...',
  aclContractAddress: '0x...'
});
```

### 2. Encrypting Data

#### Demo SDK
```typescript
import { useEncrypt } from '@fhevm/react';
import { FheType } from '@fhevm/sdk';

const { encrypt } = useEncrypt();
const encrypted = await encrypt(42, FheType.UINT32);

// Returns: { data: '0x...', publicKey: '0x...' }
```

#### Production fhEVM
```typescript
import { createInstance } from 'fhevmjs';

const instance = await createInstance({ ... });
const encrypted = instance.encrypt32(42);

// Returns Uint8Array with real TFHE ciphertext
```

### 3. Smart Contracts

#### Demo SDK Contract
```solidity
contract SimpleVoting {
    mapping(address => bytes32) private encryptedVotes;

    function vote(bytes32 encryptedVote) external {
        encryptedVotes[msg.sender] = encryptedVote;
    }

    // Mock decryption
    function getVote() external view returns (uint256) {
        // Not real FHE - just placeholder
        return uint256(encryptedVotes[msg.sender]);
    }
}
```

#### Production fhEVM Contract
```solidity
import { FHE, euint32 } from "@fhevm/solidity/lib/FHE.sol";

contract PrivateRenovationBudget {
    mapping(address => euint32) private encryptedBudgets;

    function submitBudget(bytes calldata encryptedAmount) external {
        euint32 amount = FHE.asEuint32(encryptedAmount);
        encryptedBudgets[msg.sender] = amount;
    }

    // Real FHE operations
    function addToBudget(bytes calldata additionalAmount) external {
        euint32 additional = FHE.asEuint32(additionalAmount);
        encryptedBudgets[msg.sender] = FHE.add(
            encryptedBudgets[msg.sender],
            additional
        );
    }

    // Gateway-based decryption
    function requestDecryption(uint256[] calldata cts) external {
        // Sends request to Zama Gateway
        Gateway.requestDecryption(cts, ...);
    }
}
```

### 4. Decryption

#### Demo SDK
```typescript
const { decrypt } = useDecrypt();

const result = await decrypt({
  contractAddress: '0x...',
  handle: '0x...',
  userAddress: account
}, signer);

// Mock decryption with EIP-712 signature
console.log(result.value); // Simulated plaintext
```

#### Production fhEVM
```typescript
// Request decryption through Gateway
const tx = await contract.requestDecryption(
  [ciphertext],
  4  // delay in blocks
);

// Wait for callback from Gateway
contract.on('CallbackReceived', (requestId, decryptedValue) => {
  console.log(decryptedValue); // Real decrypted value
});

// Or use permit for user-specific decryption
const { publicKey, signature } = await instance.generateToken({
  verifyingContract: contractAddress,
});

const permission = await contract.permit(signature, publicKey);
const decrypted = await instance.reencrypt(
  ciphertext,
  privateKey,
  publicKey,
  signature.signature,
  contractAddress,
  account
);
```

## React Integration

### Demo SDK
```tsx
import { FhevmProvider, useEncrypt } from '@fhevm/react';

function App() {
  return (
    <FhevmProvider config={{ providerUrl: '...', chainId: 1 }}>
      <MyComponent />
    </FhevmProvider>
  );
}

function MyComponent() {
  const { encrypt, isEncrypting } = useEncrypt();

  const handleSubmit = async () => {
    const encrypted = await encrypt(value, FheType.UINT32);
    await contract.submitValue(encrypted.data);
  };

  return <button onClick={handleSubmit}>Submit</button>;
}
```

### Production fhEVM (Current)
```javascript
// Vanilla JS approach in Renovation Budget
let fhevmInstance;

async function initFhevm() {
  fhevmInstance = await createInstance({
    networkUrl: provider.connection.url,
    gatewayUrl: GATEWAY_URL
  });
}

async function encryptValue(value) {
  const encrypted = fhevmInstance.encrypt32(value);
  return encrypted;
}

// Could be migrated to React hooks pattern
```

## Feature Comparison

### Encryption Types

#### Demo SDK
```typescript
enum FheType {
  BOOL = 0,
  UINT8 = 1,
  UINT16 = 2,
  UINT32 = 3,
  UINT64 = 4,
  UINT128 = 5,
  UINT256 = 6,
  ADDRESS = 7,
  BYTES = 8
}
```

#### Production fhEVM
```solidity
// Available types
euint8, euint16, euint32, euint64, euint128, euint256
ebool
eaddress
```

### Operations

#### Demo SDK
- ✅ Basic encryption/decryption (mock)
- ✅ EIP-712 signatures
- ✅ Key management
- ❌ Real FHE arithmetic
- ❌ Encrypted comparisons
- ❌ Encrypted conditionals

#### Production fhEVM
- ✅ Real TFHE encryption
- ✅ FHE arithmetic (add, sub, mul, div)
- ✅ FHE comparisons (eq, ne, lt, lte, gt, gte)
- ✅ FHE conditionals (select, min, max)
- ✅ FHE bitwise ops (and, or, xor, not)
- ✅ Gateway-based decryption
- ✅ Access control (ACL)
- ✅ Re-encryption for users

## Renovation Budget Example

### What It Demonstrates

The Private Renovation Budget Manager shows:

1. **Complex Business Logic**
   - Multiple encrypted values per entity
   - Encrypted arithmetic for budget calculations
   - Encrypted comparisons for bid evaluation

2. **Production Patterns**
   - Gateway integration
   - KMS configuration
   - Decryption request handling
   - Re-randomization support

3. **Real Use Case**
   - Homeowners submit private budgets
   - Contractors bid privately
   - Final calculations remain encrypted
   - Selective decryption through Gateway

### Contract Structure

```solidity
struct RoomRequirement {
    euint32 area;          // Encrypted
    euint32 materialCost;  // Encrypted
    euint32 laborCost;     // Encrypted
    bool isActive;         // Plain
}

struct RenovationProject {
    address homeowner;           // Plain
    euint64 totalBudget;        // Encrypted
    euint32 contingencyPercent; // Encrypted
    euint64 finalEstimate;      // Encrypted
    bool isCalculated;          // Plain
    // ...
}

// FHE Operations
function calculateRoomCost(uint8 roomIndex) internal {
    euint32 areaCost = FHE.mul(
        room.area,
        room.materialCost
    );
    euint32 laborTotal = FHE.mul(
        room.area,
        room.laborCost
    );
    // More encrypted arithmetic...
}
```

## When to Use Each

### Use Demo SDK When:
- ✅ Learning FHE concepts
- ✅ Prototyping UX flows
- ✅ Testing on any network
- ✅ Don't need real privacy
- ✅ Want simple setup

### Use Production fhEVM When:
- ✅ Building real applications
- ✅ Need actual privacy
- ✅ Have budget for infrastructure
- ✅ Can deploy to Zama network
- ✅ Need complex FHE operations

## Migration Path

### From Demo SDK to Production

1. **Keep UI Patterns**
   ```typescript
   // Demo SDK pattern
   const { encrypt } = useEncrypt();

   // Can be adapted to:
   const encrypt = async (value) => {
     return fhevmInstance.encrypt32(value);
   };
   ```

2. **Update Contracts**
   ```solidity
   // Replace mock with real FHE
   import { FHE, euint32 } from "@fhevm/solidity/lib/FHE.sol";
   ```

3. **Add Gateway Integration**
   ```typescript
   const instance = await createInstance({
     networkUrl: providerUrl,
     gatewayUrl: GATEWAY_URL,
     // ... KMS config
   });
   ```

4. **Handle Decryption Properly**
   ```solidity
   // Add Gateway callback
   function fulfillDecryption(
     uint256 requestId,
     uint256 decrypted
   ) public onlyGateway {
     // Handle decrypted value
   }
   ```

## Resources

### Demo SDK
- [Getting Started](./GETTING_STARTED.md)
- [API Reference](./API.md)
- [Next.js Example](../examples/nextjs)

### Production fhEVM
- [Zama Documentation](https://docs.zama.ai/fhevm)
- [fhevmjs GitHub](https://github.com/zama-ai/fhevmjs)
- [Gateway Guide](https://docs.zama.ai/fhevm/getting-started/gateway)
- [Renovation Budget Example](../examples/renovation-budget)

## Conclusion

Both approaches have their place:

- **Start with Demo SDK** to understand concepts
- **Study Renovation Budget** for real-world patterns
- **Migrate to Production** when ready for deployment

The Demo SDK teaches the "what" and "why" of FHE.
The Production example shows the "how" of real implementation.

Together, they provide a complete learning path from concept to production!
