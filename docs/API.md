# API Reference

Complete API documentation for FHEVM SDK packages.

## @fhevm/sdk

### FhevmClient

Main client class for FHE operations.

#### Constructor

```typescript
new FhevmClient(config: FhevmConfig)
```

**Parameters:**
- `config.providerUrl`: RPC URL (string)
- `config.chainId`: Network chain ID (number)
- `config.gatewayUrl`: Optional gateway URL (string)
- `config.aclAddress`: Optional ACL contract address (string)

**Example:**
```typescript
const client = new FhevmClient({
  providerUrl: 'https://rpc.example.com',
  chainId: 1,
});
```

#### Methods

##### init(keyPair?)

Initialize the client with a keypair.

```typescript
await client.init(keyPair?: KeyPair): Promise<void>
```

**Parameters:**
- `keyPair`: Optional keypair. If not provided, generates a new one.

##### encryptInput(data, fheType)

Encrypt data for contract submission.

```typescript
await client.encryptInput(
  data: EncryptionInput,
  fheType: FheType = FheType.UINT32
): Promise<EncryptedData>
```

**Parameters:**
- `data`: Value to encrypt (number, bigint, boolean, string, Uint8Array)
- `fheType`: FHE type (default: UINT32)

**Returns:**
```typescript
{
  data: string;        // Encrypted data as hex
  publicKey: string;   // Public key used
}
```

##### userDecrypt(request, signer)

Decrypt with EIP-712 signature.

```typescript
await client.userDecrypt(
  request: DecryptionRequest,
  signer: ethers.Signer
): Promise<DecryptionResult>
```

**Parameters:**
- `request.contractAddress`: Contract address
- `request.handle`: Encrypted data handle
- `request.userAddress`: User address
- `signer`: ethers.js Signer

**Returns:**
```typescript
{
  value: bigint;      // Decrypted value
  handle: string;     // Original handle
  signature: string;  // EIP-712 signature
}
```

##### publicDecrypt(handle)

Decrypt publicly revealed data.

```typescript
await client.publicDecrypt(encryptedHandle: string): Promise<bigint>
```

##### getPublicKey()

Get the current public key.

```typescript
client.getPublicKey(): string
```

##### getProvider()

Get the ethers provider instance.

```typescript
client.getProvider(): ethers.Provider
```

---

### Crypto Functions

#### generateKeyPair()

Generate a new FHE keypair.

```typescript
generateKeyPair(): KeyPair
```

**Returns:**
```typescript
{
  publicKey: string;
  privateKey: string;
}
```

#### encrypt(data, publicKey, fheType)

Encrypt data using FHE.

```typescript
await encrypt(
  data: EncryptionInput,
  publicKey: string,
  fheType: FheType
): Promise<Uint8Array>
```

#### decrypt(encryptedData, privateKey)

Decrypt FHE encrypted data.

```typescript
await decrypt(
  encryptedData: Uint8Array,
  privateKey: string
): Promise<bigint>
```

#### bytesToHex(bytes)

Convert bytes to hex string.

```typescript
bytesToHex(bytes: Uint8Array): string
```

---

### Types

#### FheType

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
  BYTES = 8,
}
```

#### FhevmConfig

```typescript
interface FhevmConfig {
  providerUrl: string;
  chainId: number;
  gatewayUrl?: string;
  aclAddress?: string;
}
```

#### EncryptedData

```typescript
interface EncryptedData {
  data: string;
  publicKey: string;
  signature?: string;
}
```

---

## @fhevm/react

### FhevmProvider

Context provider for FHEVM.

```typescript
<FhevmProvider config={config}>
  {children}
</FhevmProvider>
```

**Props:**
- `config`: FhevmConfig
- `children`: ReactNode

---

### Hooks

#### useFhevm()

Access FHEVM client and state.

```typescript
const {
  client,          // FhevmClient | null
  isInitialized,   // boolean
  publicKey,       // string | null
  error,           // Error | null
} = useFhevm();
```

#### useEncrypt()

Hook for encrypting data.

```typescript
const {
  encrypt,         // (data, fheType?) => Promise<EncryptedData>
  encryptedData,   // EncryptedData | null
  isEncrypting,    // boolean
  error,           // Error | null
} = useEncrypt();
```

**Example:**
```typescript
const { encrypt, isEncrypting } = useEncrypt();

const handleEncrypt = async () => {
  try {
    const result = await encrypt(42, FheType.UINT32);
    console.log('Encrypted:', result.data);
  } catch (error) {
    console.error('Failed:', error);
  }
};
```

#### useDecrypt()

Hook for decrypting data.

```typescript
const {
  decrypt,         // (request, signer) => Promise<DecryptionResult>
  decryptedData,   // DecryptionResult | null
  isDecrypting,    // boolean
  error,           // Error | null
} = useDecrypt();
```

#### usePublicKey()

Hook for accessing public key.

```typescript
const {
  publicKey,       // string | null
  isReady,         // boolean
} = usePublicKey();
```

---

### Components

#### EncryptedInput

Pre-built encrypted input component.

```typescript
<EncryptedInput
  type="number"              // 'number' | 'text'
  fheType={FheType.UINT32}   // FheType
  placeholder="Enter value"   // string
  onEncrypted={handleEncrypted}  // (data: EncryptedData) => void
  className="custom-class"    // string
/>
```

**Props:**
- `type`: Input type (default: 'number')
- `fheType`: FHE type for encryption (default: UINT32)
- `placeholder`: Placeholder text
- `onEncrypted`: Callback when encryption completes
- `className`: CSS class name

---

## @fhevm/contracts

### PrivateVoting

Privacy-preserving voting contract.

#### Functions

##### createProposal(description, votingPeriod)

Create a new proposal.

```solidity
function createProposal(
  string memory description,
  uint256 votingPeriod
) external onlyOwner returns (uint256)
```

##### vote(proposalId, encryptedVote)

Cast an encrypted vote.

```solidity
function vote(
  uint256 proposalId,
  bytes32 encryptedVote
) external
```

##### finalizeProposal(proposalId, yesVotes, noVotes)

Finalize proposal and reveal results.

```solidity
function finalizeProposal(
  uint256 proposalId,
  uint256 yesVotes,
  uint256 noVotes
) external onlyOwner
```

##### getProposal(proposalId)

Get proposal details.

```solidity
function getProposal(uint256 proposalId)
  external view returns (
    string memory description,
    uint256 deadline,
    bool finalized,
    uint256 yesVotes,
    uint256 noVotes
  )
```

#### Events

```solidity
event ProposalCreated(uint256 indexed proposalId, string description, uint256 deadline);
event VoteCast(uint256 indexed proposalId, address indexed voter);
event ProposalFinalized(uint256 indexed proposalId, uint256 yesVotes, uint256 noVotes);
```

---

## Error Handling

All async methods can throw errors. Always use try-catch:

```typescript
try {
  const result = await encrypt(value, FheType.UINT32);
} catch (error) {
  console.error('Encryption failed:', error);
  // Handle error
}
```

Common errors:
- `"Client not initialized"`: Call `init()` first
- `"FHEVM client not initialized"`: Wrap with `FhevmProvider`
- Contract errors: Check transaction parameters

---

## TypeScript Support

All packages include full TypeScript definitions. Import types as needed:

```typescript
import type {
  FhevmConfig,
  EncryptedData,
  DecryptionRequest,
  DecryptionResult,
} from '@fhevm/sdk';
```
