import { Types } from '../Types.js';
import { Lorem } from '../Lorem.js';
import { Random } from '../Random.js';

/** @typedef {import('../../../types').DataMockInit} DataMockInit */
/** @typedef {import('../../../types').HttpPayloadInit} HttpPayloadInit */
/** @typedef {import('../../../locales/types').DataMockLocale} DataMockLocale */

export const randomValue = Symbol('randomValue');
export const typesValue = Symbol('typesValue');
export const loremValue = Symbol('loremValue');

/**
 * Generates date/time related values.
 */
export class HttpPayload {
  // #types;
  
  // #lorem;

  // #random;

  /**
   * @param {DataMockInit=} init The library init options.
   */
  constructor(init={}) {
    // this.#types = new Types(init.seed);
    // this.#random = new Random(init.seed);
    // this.#lorem = new Lorem(init);
    this[typesValue] = new Types(init.seed);
    this[randomValue] = new Random(init.seed);
    this[loremValue] = new Lorem(init);
  }

  /**
   * @param {number=} value
   */
  seed(value) {
    this[randomValue].seed(value);
    this[typesValue].seed(value);
    this[loremValue].seed(value);
  }

  /**
   * @param {DataMockLocale=} locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale) {
    this[loremValue].locale(locale);
  }

  /**
   * Randomly generates a boolean flag describing whether the request can
   * carry a payload.
   * 
   * @param {HttpPayloadInit=} init
   * @returns {boolean} `true` when the request can carry a payload and `false` otherwise.
   */
  isPayload(init={}) {
    let isPayload = false;
    if (!init.noPayload) {
      if (init.force || this[typesValue].boolean()) {
        isPayload = true;
      }
    }
    return isPayload;
  }

  /**
   * Generates a random payload data for given mime type.
   * 
   * @param {string=} mime The ime type. When not set it picks one.
   */
  payload(mime) {
    const ct = mime || this[randomValue].pickOne(['application/x-www-form-urlencoded', 'application/json', 'application/xml']);
    switch (ct) {
      case 'application/x-www-form-urlencoded':
        return this.urlEncoded();
      case 'application/json':
        return this.json();
      case 'application/xml':
        return this.xml();
      default:
        return this[loremValue].paragraph();
    }
  }

  /**
   * Generates a random x-www-form-urlencoded payload.
   * @return {string} The x-www-form-urlencoded payload.
   */
  urlEncoded() {
    const size = this[typesValue].number({ min: 1, max: 10 });
    let result = '';
    for (let i = 0; i < size; i++) {
      const name = encodeURIComponent(this[loremValue].word()).replace(/%20/g, '+');
      const value = encodeURIComponent(this[loremValue].paragraph()).replace(/%20/g, '+');
      if (result) {
        result += '&';
      }
      result += `${name}=${value}`;
    }
    return result;
  }

  /**
   * Generates random JSON data.
   * @return {string} JSON payload
   */
  json() {
    const size = this[typesValue].number({ min: 1, max: 10 });
    let result = '{';
    let addComa = false;
    for (let i = 0; i < size; i++) {
      const name = this[loremValue].word();
      const value = this[loremValue].paragraph();
      if (addComa) {
        result += ',';
      } else {
        addComa = true;
      }
      result += '\n\t';
      result += `"${name}":"${value}"`;
    }
    result += '\n';
    result += '}';
    return result;
  }

  /**
   * Generates random XML data.
   * @return {string} XML payload
   */
  xml() {
    const size = this[typesValue].number({ min: 1, max: 10 });
    let result = '<feed>';
    for (let i = 0; i < size; i++) {
      const name = this[loremValue].word();
      const value = this[loremValue].paragraph();
      result += '\n\t';
      result += `<${name}><![CDATA[${value}]]></${name}>`;
    }
    result += '\n';
    result += '</feed>';
    return result;
  }
}
