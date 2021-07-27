/* eslint-disable no-bitwise */
import { Random } from './Random.js';
import { MersenneTwister } from './MersenneTwister.js';
import * as BasicTypes from './BasicTypes.js';
import { HEX_POOL } from './Utils.js';

/** @typedef {import('../../types').TypeNumberInit} TypeNumberInit */
/** @typedef {import('../../types').TypeDateTimeInit} TypeDateTimeInit */
/** @typedef {import('../../types').TypeBooleanInit} TypeBooleanInit */
/** @typedef {import('../../types').TypeFalsyInit} TypeFalsyInit */
/** @typedef {import('../../types').TypeCharacterInit} TypeCharacterInit */
/** @typedef {import('../../types').TypeHashInit} TypeHashInit */

export const randomValue = Symbol('randomValue');
export const mtValue = Symbol('mtValue');

/**
 * A class that generates different base data types.
 */
export class Types {
  // /** 
  //  * @type {Random}
  //  */
  // #random;
  
  // /** 
  //  * @type {MersenneTwister}
  //  */
  // #mt;

  /**
   * @param {number=} seed
   */
  constructor(seed) {
    // this.#mt = MersenneTwister.fromSeed(seed);
    // this.#random = new Random(seed);
    this[mtValue] = MersenneTwister.fromSeed(seed);
    this[randomValue] = new Random(seed);
  }

  /**
   * @param {number=} value
   */
  seed(value) {
    this[mtValue] = MersenneTwister.fromSeed(value);
    this[randomValue].seed(value);
  }

  /**
   * Generates a pseudo-random number.
   * @param {number|TypeNumberInit=} [init={}] When passed a number it generates an integer in a range from [0, init]
   * @returns {number} A pseudo-random number.
   */
  number(init={}) {
    return BasicTypes.number(this[mtValue], init);
  }

  /**
   * Generates a pseudo-random floating point number.
   * @param {number|TypeNumberInit=} [init={}] When passed a number it generates an float with this precision
   * @returns {number} A pseudo-random floating point number.
   */
  float(init={}) {
    return BasicTypes.float(this[mtValue], init);
  }
  
  /**
   * @param {number|TypeDateTimeInit=} [init={}] When passed a number it generates an date in a range from [since 1. Jan 1970 UTC, init]
   * @returns {Date} A random date in a range.
   */
  datetime(init={}) {
    return BasicTypes.date(this[mtValue], init);
  }

  /**
   * @param {number=} [size=10] The size of the random string.
   * @param {string=} pool The set of characters to use.
   * @returns {string} The generated random string
   */
  string(size=10, pool) {
    return BasicTypes.string(this[mtValue], size, pool);
  }

  /**
   * @param {TypeCharacterInit=} init
   */
  character(init={}) {
    return BasicTypes.character(this[mtValue], init);
  }

  /**
   * @returns {string} Generates a random UUID v4 (rfc4122) string.
   */
  uuid() {
    const tpl = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return tpl.replace(/[xy]/g, (current) => {
      const n = this.number({ min: 0, max: 15 });
      const value = current === 'x' ? n : (n & 0x3 | 0x8);
      return value.toString(16);
    });
  }

  /**
   * Generates a random hash value.
   * @param {TypeHashInit=} init
   */
  hash(init={}) {
    const { length=40, casing='lower' } = init;
    const pool = casing === 'upper' ? HEX_POOL.toUpperCase() : HEX_POOL;
    return this.string(length, pool);
  }

  /**
   * @param {number|TypeBooleanInit=} [init={}] When number it is the likelihood of receiving a true or false value back. 
   * @returns {boolean} A random boolean value.
   */
  boolean(init={}) {
    let opts = /** @type TypeBooleanInit */ ({});
    if (typeof init === 'number') {
      opts.likelihood = init;
    } else if (typeof init === 'object') {
      opts = { ...init };
    }
    if (opts.likelihood < 0 || opts.likelihood > 100) {
      throw new RangeError('Invalid likelihood range. Accepted range is [0, 100].');
    }
    return this[mtValue].real2() * 100 < opts.likelihood;
  }

  /**
   * Produces a falsy value.
   * @param {TypeFalsyInit=} init
   */
  falsy(init={}) {
    const pool = init.pool || [false, null, 0, NaN, ''];
    return this[randomValue].pickOne(pool);
  }

  /**
   * @param {number=} [size=1] The size of the generated hexadecimal string
   * @returns {string} A random hexadecimal string.
   */
  hexaDecimal(size=1) {
    const pool = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"];
    const generated = this[randomValue].pick(pool, size);
    const value = generated.join('');
    return `0x${value}`;
  }
}
