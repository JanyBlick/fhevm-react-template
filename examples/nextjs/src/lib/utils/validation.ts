/**
 * Validation Utilities
 * Input validation helper functions
 */

export function validateNumber(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export function validatePositiveNumber(value: any): boolean {
  return validateNumber(value) && parseFloat(value) > 0;
}

export function validateIntegerInRange(
  value: any,
  min: number,
  max: number
): boolean {
  const num = parseInt(value, 10);
  return Number.isInteger(num) && num >= min && num <= max;
}

export function validateRequiredFields(
  obj: Record<string, any>,
  requiredFields: string[]
): { valid: boolean; missing: string[] } {
  const missing = requiredFields.filter(
    (field) => obj[field] === undefined || obj[field] === null || obj[field] === ''
  );
  return {
    valid: missing.length === 0,
    missing,
  };
}

export function sanitizeNumberInput(value: string): string {
  return value.replace(/[^0-9.-]/g, '');
}
