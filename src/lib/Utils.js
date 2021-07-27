/**
 * @returns {number} Random seed value.
 */
export function seed() {
  return Math.floor(Math.random() * 10**13);
}

export const NUMBERS = '0123456789';
export const CHARS_LOWER = 'abcdefghijklmnopqrstuvwxyz';
export const CHARS_UPPER = CHARS_LOWER.toUpperCase();
export const HEX_POOL = `${NUMBERS}abcdef`;

/**
 * @param {string} [input='']
 * @returns {string} Slug from the input.
 */
export function slug(input='') {
  return input.replace(/ /g, '-').replace(/[^一-龠ぁ-ゔァ-ヴー\w.-]+/g, '');
}

/**
 * Transforms ASCII string to buffer.
 * @param {string} asciiString
 * @return {Uint8Array}
 */
export function strToBuffer(asciiString) {
  return new Uint8Array([...asciiString].map(char => char.charCodeAt(0)));
}

/**
 * Converts incoming data to base64 string.
 * @param {ArrayBuffer|Buffer} ab
 * @return {string} Safe to store string.
 */
export function bufferToBase64(ab) {
  // @ts-ignore
  return btoa(String.fromCharCode(...ab));
}

/**
 * Converts base64 string to Uint8Array.
 * @param {string} str
 * @return {Uint8Array} Restored array view.
 */
 export function base64ToBuffer(str) {
  const asciiString = atob(str);
  return new Uint8Array([...asciiString].map(char => char.charCodeAt(0)));
}
