import { Types } from './Types.js';
import { Random } from './Random.js';
import enLocale from '../../locales/en/index.js';
import { slug } from './Utils.js';

/** @typedef {import('../../types').DataMockInit} DataMockInit */
/** @typedef {import('../../types').LoremWordInit} LoremWordInit */
/** @typedef {import('../../types').LoremSyllableInit} LoremSyllableInit */
/** @typedef {import('../../types').LoremSentenceInit} LoremSentenceInit */
/** @typedef {import('../../types').LoremSentencesInit} LoremSentencesInit */
/** @typedef {import('../../types').LoremParagraphInit} LoremParagraphInit */
/** @typedef {import('../../types').LoremParagraphsInit} LoremParagraphsInit */
/** @typedef {import('../../locales/types').DataMockLocale} DataMockLocale */

export const randomValue = Symbol('randomValue');
export const typesValue = Symbol('typesValue');
export const localeValue = Symbol('localeValue');

/**
 * A library that specializes in generating string values.
 */
export class Lorem {
  // #types;

  // #locale;

  // #random;

  /**
   * @param {DataMockInit=} init The library init options.
   */
  constructor(init={}) {
    // this.#types = new Types(init.seed);
    // this.#random = new Random(init.seed);
    // this.#locale = init.locale || enLocale;
    this[typesValue] = new Types(init.seed);
    this[randomValue] = new Random(init.seed);
    this[localeValue] = init.locale || enLocale;
  }

  /**
   * @param {number=} value
   */
  seed(value) {
    this[randomValue].seed(value);
    this[typesValue].seed(value);
  }

  /**
   * @param {DataMockLocale=} locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale) {
    this[localeValue] = locale || enLocale;
  }

  /**
   * @param {LoremWordInit=} init
   */
  word(init={}) {
    const opts = { ...init };
    if (typeof opts.syllables === 'number' && typeof opts.length === 'number') {
      throw new RangeError(`Cannot specify both "syllables" and "length".`);
    }
    let result = '';

    if (typeof opts.length === 'number') {
      do {
        result += this.syllable();
      } while (result.length < opts.length);
      result = result.substring(0, opts.length);
    } else {
      const syllables = opts.syllables || this[typesValue].number({ min: 1, max: 3 });
      for (let i = 0; i < syllables; i++) {
        result += this.syllable();
      }
    }
    if (opts.capitalize) {
      result = this.capitalize(result);
    }
    return result;
  }

  /**
   * @param {string} input The word to capitalize.
   * @returns {string} Capitalized word.
   */
  capitalize(input) {
    return input.charAt(0).toUpperCase() + input.substr(1);
  }

  /**
   * @param {number} [length=3]
   * @returns {string} A space separated list of words.
   */
  words(length = 3) {
    const result = new Array(length).fill('').map(() => this.word());
    return result.join(' ');
  }

  /**
   * @param {LoremSentenceInit=} [init={}]
   * @returns {string} A sentence of words separated with a space.
   */
  sentence(init={}) {
    const opts = { ...init };
    const { words = this[typesValue].number({ min: 12, max: 18 }) } = opts;
    let result = new Array(words).fill('').map(() => this.word()).join(' ');
    result = this.capitalize(result);
    let { punctuation } = opts;
    if (punctuation !== false && !/^[.?;!:]$/.test(String(punctuation))) {
      punctuation = '.';
    }
    if (punctuation) {
      result += punctuation;
    }
    return result;
  }

  /** 
   * @param {LoremSentencesInit|number=} [init={}]
   * @returns {string} Generates sentences.
   */
  sentences(init={}) {
    let opts = /** @type LoremSentencesInit */ ({ });
    if (typeof init === 'number') {
      opts.size = init;
    } else {
      opts = { ...init };
    }
    const { size = this[typesValue].number({ min: 2, max: 6 }) } = opts;
    const sentences = new Array(size).fill('').map(() => this.sentence());
    return sentences.join(' ');
  }

  /** 
   * @param {number=} count The number of words in the slug.
   * @returns {string}
   */
  slug(count) {
    const words = this.words(count);
    return slug(words);
  }

  /** 
   * @param {LoremParagraphInit|number=} init When number then it is a number of sentences in the paragraph.
   * @returns {string} A paragraph of sentences.
   */
  paragraph(init={}) {
    let opts = /** @type LoremParagraphInit */ ({ });
    if (typeof init === 'number') {
      opts.sentences = init;
    } else {
      opts = { ...init };
    }
    const { lineBreak, sentences = this[typesValue].number({ min: 3, max: 7 }) } = opts;
    const items = new Array(sentences).fill('').map(() => this.sentence());
    return items.join(lineBreak === true ? '\r\n' : ' ');
  }

  /** 
   * @param {LoremParagraphsInit|number=} init
   * @returns {string} A number of paragraphs.
   */
  paragraphs(init={}) {
    let opts = /** @type LoremParagraphsInit */ ({ });
    if (typeof init === 'number') {
      opts.size = init;
    } else {
      opts = { ...init };
    }
    const { separator='\r\n', size = 3 } = opts;
    const items = new Array(size).fill('').map(() => this.paragraph());
    return items.join(separator);
  }

  /**
   * @param {LoremSyllableInit=} [init={}]
   * @returns {string} A syllable or a number of syllables.
   */
  syllable(init={}) {
    const opts = { ...init };
    const length = opts.length || this[typesValue].number({ min: 2, max: 3 });
    const consonants = this[localeValue].syntax && this[localeValue].syntax.consonants || enLocale.syntax.consonants;
    const vowels = this[localeValue].syntax && this[localeValue].syntax.vowels || enLocale.syntax.vowels;
    const all = consonants + vowels;
    let result = '';
    let chr;
    for (let i = 0; i < length; i++) {
      if (i === 0) {
        // First character can be anything
        chr = this[typesValue].character({ pool: all });
      } else if (vowels.includes(chr)) {
        // Last character was a vowel, now we want a consonant
        chr = this[typesValue].character({pool: consonants});
      } else {
        // Last character was a consonant, now we want a vowel
        chr = this[typesValue].character({pool: vowels});
      }
      result += chr;
    }
    if (opts.capitalize) {
      result = this.capitalize(result);
    }
    return result;
  }

  /** 
   * @returns {string} A random text based on a random lorem method
   */
  lorem() {
    const methods = ['word', 'words', 'sentence', 'sentences', 'paragraph', 'paragraphs'];
    const method = this[randomValue].pickOne(methods);
    return this[method]();
  }
}
