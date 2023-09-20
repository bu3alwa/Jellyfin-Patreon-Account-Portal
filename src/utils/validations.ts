/**
 * Check if the value is a number.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

/**
 * Check if the value is a boolean.
 */
export function isBool(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/**
 * Check if the value is a string.
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}
