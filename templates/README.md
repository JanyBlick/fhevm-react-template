# FHEVM SDK Templates

This directory contains templates and starter projects for different frameworks and use cases.

## Available Templates

### Next.js Template
The Next.js template is located in the `examples/nextjs` directory and provides:

- Complete Next.js 14 application with App Router
- Multiple FHE use case demonstrations
- API routes for server-side FHE operations
- Comprehensive component library
- Full SDK integration

**Location:** `../examples/nextjs/`

**Quick Start:**
```bash
cd examples/nextjs
npm install
npm run dev
```

**Features:**
- Private voting demo
- Encryption demonstrations
- Homomorphic computation examples
- Key management interface
- Banking use case example
- Medical data privacy example

### React Template
The React template is available through the `@fhevm/react` package with hooks and components.

**Location:** `../packages/react/`

**Usage:**
```typescript
import { FhevmProvider, useEncrypt, useDecrypt } from '@fhevm/react';
```

### Renovation Budget Example
A production-ready fhEVM application demonstrating real TFHE encryption.

**Location:** `../examples/renovation-budget/`

**Live Demo:** Available on GitHub Pages

## Template Structure

Each template follows this structure:
```
template-name/
├── src/              # Source code
├── package.json      # Dependencies
├── README.md         # Template documentation
├── tsconfig.json     # TypeScript config
└── .env.example      # Environment variables
```

## Creating New Templates

To create a new template:

1. Create a directory in `examples/` for your template
2. Include complete setup and configuration files
3. Add comprehensive README with usage instructions
4. Ensure SDK integration is properly demonstrated
5. Include example use cases

## SDK Integration

All templates demonstrate:
- SDK initialization and configuration
- Encryption/decryption operations
- Contract interaction patterns
- Error handling
- Best practices for production

## Documentation

- [Getting Started Guide](../docs/GETTING_STARTED.md)
- [API Reference](../docs/API.md)
- [Architecture Overview](../docs/ARCHITECTURE.md)
- [SDK Documentation](../packages/sdk/README.md)

## Support

For template-specific questions:
- Check the template's README
- Review the example code
- See the main project documentation

## License

MIT - See [LICENSE](../LICENSE)
