import { MersenneTwister } from './MersenneTwister.js';
import * as BasicTypes from './BasicTypes.js';

export const mtValue = Symbol('mtValue');
const defaultPool = ['a', 'b', 'c', 'd', 'e', 'f'];

export class Random {
  // /** 
  //  * @type {MersenneTwister}
  //  */
  // #mt;

  /**
   * @param {number=} seed
   */
  constructor(seed) {
    // this.#mt = MersenneTwister.fromSeed(seed);
    this[mtValue] = MersenneTwister.fromSeed(seed);
  }

  /**
   * @param {number=} value
   */
  seed(value) {
    this[mtValue] = MersenneTwister.fromSeed(value);
  }

  /**
   * Picks an number of random elements in a random order from an array.
   * @param {any[]=} source The source array. When not set a hexadecimal string part is used. 
   * @param {number=} count The size of the returned set.
   * @returns {any[]}
   */
  pick(source = defaultPool, count) {
    let size = count;
    if (typeof size !== 'number') {
      size = BasicTypes.number(this[mtValue], { min: 1, max: source.length });
    } else if (size > source.length) {
      size = source.length;
    } else if (size < 0) {
      size = 0;
    }

    const copy = [...source];
    let i = copy.length;
    const min = i - size;
    let temp;
    let index;

    while (i-- > min) {
      index = Math.floor((i + 1) * BasicTypes.float(this[mtValue], { min: 0, max: 0.99 }));
      temp = copy[index];
      copy[index] = copy[i];
      copy[i] = temp;
    }

    return copy.slice(min);
  }

  /**
   * Picks an random element from the source array.
   * 
   * @param {any[]=} source The source array. When not set a hexadecimal string part is used. 
   * @returns {any}
   */
  pickOne(source = defaultPool) {
    const n = BasicTypes.number(this[mtValue], { max: source.length - 1 });
    return source[n];
  }
}
