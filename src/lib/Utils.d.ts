/**
 * @returns Random seed value.
 */
export function seed(): number;

export const NUMBERS: string;
export const CHARS_LOWER: string;
export const CHARS_UPPER: string;
export const HEX_POOL: string;

/**
 * @param {string} [input='']
 * @returns {string} Slug from the input.
 */
export function slug(input?: string): string;

/**
 * Transforms ASCII string to buffer.
 */
export function strToBuffer(asciiString: string): Uint8Array;

/**
 * Converts incoming data to base64 string.
 * @returns Safe to store string.
 */
export function bufferToBase64(ab: ArrayBuffer|Buffer): string

/**
 * Converts base64 string to Uint8Array.
 * @returns Restored array view.
 */
export function base64ToBuffer(str: string): Uint8Array;
