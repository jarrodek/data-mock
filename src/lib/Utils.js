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
