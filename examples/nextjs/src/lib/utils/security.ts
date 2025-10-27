/**
 * Security Utilities
 * Security-related helper functions
 */

export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function isValidSignature(signature: string): boolean {
  return /^0x[a-fA-F0-9]{130}$/.test(signature);
}

export function sanitizeHexString(hex: string): string {
  const cleaned = hex.toLowerCase().replace(/[^0-9a-f]/g, '');
  return cleaned.startsWith('0x') ? cleaned : `0x${cleaned}`;
}

export function isValidHexString(hex: string): boolean {
  return /^0x[a-fA-F0-9]*$/.test(hex);
}

export function maskSensitiveData(data: string, visibleChars: number = 6): string {
  if (data.length <= visibleChars * 2) {
    return data;
  }
  const start = data.slice(0, visibleChars);
  const end = data.slice(-visibleChars);
  return `${start}...${end}`;
}
