import { Types } from './Types.js';

/** @typedef {import('../../types').DataMockInit} DataMockInit */
/** @typedef {import('../../types').HarTiming} HarTiming */
/** @typedef {import('../../types').HarTimingInit} HarTimingInit */

export const typesValue = Symbol('typesValue');

/**
 * Generates data related to the HAR specification.
 */
export class Har {
  /**
   * @param {DataMockInit=} init The library init options.
   */
  constructor(init={}) {
    // this.#types = new Types(init.seed);
    this[typesValue] = new Types(init.seed);
  }

  /**
   * @param {HarTimingInit=} init
   * @returns {HarTiming} 
   */
  timing(init = {}) {
    const types = this[typesValue];
    const result = /** @type HarTiming */ ({
      blocked: types.number({ min: 0, max: 100 }),
      connect: types.number({ min: 0, max: 100 }),
      receive: types.number({ min: 0, max: 100 }),
      send: types.number({ min: 0, max: 100 }),
      wait: types.number({ min: 0, max: 100 }),
      dns: types.number({ min: 0, max: 100 }),
    });
    if (init.ssl) {
      result.ssl = types.number({ min: 0, max: 100 });
    }
    return result;
  }
}
