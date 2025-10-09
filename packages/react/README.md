# @fhevm/react

React hooks and components for building privacy-preserving dApps with FHEVM.

## Installation

```bash
npm install @fhevm/react
```

## Quick Start

```tsx
import { FhevmProvider, useEncrypt, useDecrypt } from '@fhevm/react';
import { FheType } from '@fhevm/sdk';

// Wrap your app with FhevmProvider
function App() {
  return (
    <FhevmProvider config={{
      providerUrl: 'https://your-rpc-url',
      chainId: 1,
    }}>
      <YourComponent />
    </FhevmProvider>
  );
}

// Use hooks in your components
function YourComponent() {
  const { encrypt, encryptedData, isEncrypting } = useEncrypt();
  const { decrypt, decryptedData, isDecrypting } = useDecrypt();

  const handleEncrypt = async () => {
    await encrypt(42, FheType.UINT32);
  };

  const handleDecrypt = async () => {
    await decrypt({
      contractAddress: '0x...',
      handle: '0x...',
      userAddress: '0x...',
    }, signer);
  };

  return (
    <div>
      <button onClick={handleEncrypt} disabled={isEncrypting}>
        Encrypt
      </button>
      <button onClick={handleDecrypt} disabled={isDecrypting}>
        Decrypt
      </button>
    </div>
  );
}
```

## Components

### EncryptedInput

Pre-built input component with encryption functionality:

```tsx
import { EncryptedInput } from '@fhevm/react';

<EncryptedInput
  type="number"
  fheType={FheType.UINT32}
  placeholder="Enter value"
  onEncrypted={(data) => console.log(data)}
/>
```

## Hooks

### useFhevm()

Access the FHEVM client and initialization state:

```tsx
const { client, isInitialized, publicKey, error } = useFhevm();
```

### useEncrypt()

Encrypt data:

```tsx
const { encrypt, encryptedData, isEncrypting, error } = useEncrypt();
```

### useDecrypt()

Decrypt data with EIP-712 signature:

```tsx
const { decrypt, decryptedData, isDecrypting, error } = useDecrypt();
```

### usePublicKey()

Get the current public key:

```tsx
const { publicKey, isReady } = usePublicKey();
```

## License

MIT
