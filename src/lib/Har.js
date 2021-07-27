import { Internet } from './Internet.js';
import { Lorem } from './Lorem.js';
import { Random } from './Random.js';
import { Software } from './Software.js';
import { Time } from './Time.js';
import { Types } from './Types.js';

/** @typedef {import('../../types').DataMockInit} DataMockInit */
/** @typedef {import('../../types').HarTiming} HarTiming */
/** @typedef {import('../../types').HarTimingInit} HarTimingInit */
/** @typedef {import('../../locales/types').DataMockLocale} DataMockLocale */
/** @typedef {import('har-format').Creator} Creator */
/** @typedef {import('har-format').Browser} Browser */

export const typesValue = Symbol('typesValue');
export const randomValue = Symbol('randomValue');
export const internetValue = Symbol('internetValue');
export const loremValue = Symbol('loremValue');
export const timeValue = Symbol('timeValue');
export const softwareValue = Symbol('softwareValue');

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
    this[randomValue] = new Random(init.seed);
    this[loremValue] = new Lorem(init);
    this[internetValue] = new Internet(init);
    this[timeValue] = new Time(init);
    this[softwareValue] = new Software(init);
  }

  /**
   * @param {number=} value
   */
  seed(value) {
    this[typesValue].seed(value);
    this[randomValue].seed(value);
    this[loremValue].seed(value);
    this[internetValue].seed(value);
    this[timeValue].seed(value);
    this[softwareValue].seed(value);
  }

  /**
   * @param {DataMockLocale=} locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale) {
    this[loremValue].locale(locale);
    this[internetValue].locale(locale);
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

  /**
   * @return {string} The version of the HAR spec.
   */
  version() {
    return '1.2';
  }

  /**
   * @returns {Creator} the HAR's creator info.
   */
  creator() {
    const name = this[loremValue].word();
    const version = this[softwareValue].majorMinorVersion();
    const comment = this[loremValue].paragraph();
    return {
      name,
      version,
      comment,
    };
  }

  /**
   * @returns {Browser} the HAR's browser info.
   */
  browser() {
    const name = this[internetValue].browser();
    const version = this[softwareValue].majorMinorVersion();
    const comment = this[loremValue].paragraph();
    return {
      name,
      version,
      comment,
    };
  }
}
