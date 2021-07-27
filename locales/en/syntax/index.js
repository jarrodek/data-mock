/** @typedef {import('../../types').LocaleSyntax} LocaleSyntax */

const locale = /** @type LocaleSyntax */ (Object.freeze({
  // consonants except hard to speak ones
  consonants: 'bcdfghjklmnprstvwz', 
  vowels: 'aeiou',
}));

export default locale;
