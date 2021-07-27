import { Random } from './Random.js';
import enLocale from '../../locales/en/index.js';

/** @typedef {import('../../types').DataMockInit} DataMockInit */
/** @typedef {import('../../locales/types').DataMockLocale} DataMockLocale */

/**
 * @param {Random} random
 * @param {string[]} list
 * @param {number=} size
 */
function getListItem(random, list, size) {
  let items = list;
  if (typeof size === 'number') {
    items = items.filter(i => i.length === size);
  }
  if (!items.length) {
    items = list;
  }
  return random.pickOne(items);
}

export const randomValue = Symbol('randomValue');
export const localeValue = Symbol('localeValue');

/**
 * A library that specializes in picking words from locale dictionary.
 */
export class Word {
  // #random;

  // #locale;
  
  /**
   * @param {DataMockInit=} init The library init options.
   */
  constructor(init={}) {
    // this.#random = new Random(init.seed);
    // this.#locale = init.locale || enLocale;
    this[randomValue] = new Random(init.seed);
    this[localeValue] = init.locale || enLocale;
  }

  /**
   * @param {number=} value
   */
  seed(value) {
    this[randomValue].seed(value);
  }

  /**
   * @param {DataMockLocale=} locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale) {
    this[localeValue] = locale || enLocale;
  }

  /**
   * @param {number=} size The length of the word. When not found it uses the whole pool defined in the lang dictionary.
   * @returns {string} A randomly picked adjective.
   */
  adjective(size) {
    const list = this[localeValue].word.adjective || enLocale.word.adjective;
    return getListItem(this[randomValue], list, size);
  }

  /**
   * @param {number=} size The length of the word. When not found it uses the whole pool defined in the lang dictionary.
   * @returns {string} A randomly picked adverb.
   */
  adverb(size) {
    const list = this[localeValue].word.adverb || enLocale.word.adverb;
    return getListItem(this[randomValue], list, size);
  }

  /**
   * @param {number=} size The length of the word. When not found it uses the whole pool defined in the lang dictionary.
   * @returns {string} A randomly picked conjunction.
   */
  conjunction(size) {
    const list = this[localeValue].word.conjunction || enLocale.word.conjunction;
    return getListItem(this[randomValue], list, size);
  }

  /**
   * @param {number=} size The length of the word. When not found it uses the whole pool defined in the lang dictionary.
   * @returns {string} A randomly picked interjection.
   */
  interjection(size) {
    const list = this[localeValue].word.interjection || enLocale.word.interjection;
    return getListItem(this[randomValue], list, size);
  }

  /**
   * @param {number=} size The length of the word. When not found it uses the whole pool defined in the lang dictionary.
   * @returns {string} A randomly picked noun.
   */
  noun(size) {
    const list = this[localeValue].word.noun || enLocale.word.noun;
    return getListItem(this[randomValue], list, size);
  }

  /**
   * @param {number=} size The length of the word. When not found it uses the whole pool defined in the lang dictionary.
   * @returns {string} A randomly picked preposition.
   */
  preposition(size) {
    const list = this[localeValue].word.preposition || enLocale.word.preposition;
    return getListItem(this[randomValue], list, size);
  }

  /**
   * @param {number=} size The length of the word. When not found it uses the whole pool defined in the lang dictionary.
   * @returns {string} A randomly picked verb.
   */
  verb(size) {
    const list = this[localeValue].word.verb || enLocale.word.verb;
    return getListItem(this[randomValue], list, size);
  }
}
