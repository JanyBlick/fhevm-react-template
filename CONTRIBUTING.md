# Contributing to FHEVM SDK

Thank you for your interest in contributing to the FHEVM SDK!

## Development Setup

1. **Clone the repository:**

```bash
git clone <repository-url>
cd fhevm-sdk-monorepo
```

2. **Install dependencies:**

```bash
npm run install:all
```

3. **Build all packages:**

```bash
npm run build
```

## Project Structure

```
fhevm-sdk-monorepo/
├── packages/
│   ├── sdk/              # Core SDK (@fhevm/sdk)
│   ├── react/            # React hooks (@fhevm/react)
│   └── contracts/        # Smart contracts (@fhevm/contracts)
└── examples/
    └── nextjs/           # Next.js example
```

## Development Workflow

### Working on SDK Core

```bash
cd packages/sdk
npm run dev  # Watch mode
```

### Working on React Package

```bash
cd packages/react
npm run dev  # Watch mode
```

### Working on Contracts

```bash
cd packages/contracts
npm run compile
npm test
```

### Testing with Example App

```bash
# Terminal 1: Build packages in watch mode
cd packages/sdk && npm run dev

# Terminal 2: Build React package
cd packages/react && npm run dev

# Terminal 3: Run example
npm run dev:nextjs
```

## Making Changes

### Adding New Features

1. Create a feature branch
2. Implement changes with tests
3. Update documentation
4. Submit pull request

### Code Style

- Use TypeScript for all new code
- Follow existing code patterns
- Add JSDoc comments for public APIs
- Run linters before committing

### Testing

- Add tests for new features
- Ensure all tests pass
- Test with example applications

## Package Guidelines

### @fhevm/sdk

- Keep framework-agnostic
- Maintain backward compatibility
- Export clear, typed APIs

### @fhevm/react

- Follow React hooks best practices
- Keep components reusable
- Document all props

### @fhevm/contracts

- Follow Solidity best practices
- Add comprehensive tests
- Document all functions

## Publishing (Maintainers Only)

```bash
# Version bump
npm version patch|minor|major

# Publish all packages
npm publish --workspaces
```

## Questions?

Open an issue or start a discussion!
