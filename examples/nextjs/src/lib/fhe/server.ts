/**
 * FHE Server Library
 * Server-side FHE operations (API routes)
 */

export interface FHEOperation {
  type: 'encrypt' | 'decrypt' | 'compute';
  data: any;
}

export function validateFHEOperation(operation: FHEOperation): boolean {
  if (!operation.type || !operation.data) {
    return false;
  }

  const validTypes = ['encrypt', 'decrypt', 'compute'];
  return validTypes.includes(operation.type);
}

export function sanitizeInput(input: any): any {
  // Basic input sanitization
  if (typeof input === 'string') {
    return input.trim();
  }
  if (typeof input === 'number') {
    return isFinite(input) ? input : 0;
  }
  return input;
}
