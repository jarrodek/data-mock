import { Types } from '../Types.js';
import { Lorem } from '../Lorem.js';
import { Random } from '../Random.js';
import { DataMockInit, HttpPayloadInit } from '../../Types.js';
import { DataMockLocale } from '../../../locales/Types.js';

export const randomValue = Symbol('randomValue');
export const typesValue = Symbol('typesValue');
export const loremValue = Symbol('loremValue');

/**
 * Generates date/time related values.
 */
export class HttpPayload {
  [typesValue]: Types;
  [randomValue]: Random;
  [loremValue]: Lorem;

  /**
   * @param init The library init options.
   */
  constructor(init: DataMockInit = {}) {
    this[typesValue] = new Types(init.seed);
    this[randomValue] = new Random(init.seed);
    this[loremValue] = new Lorem(init);
  }

  seed(value?: number): void {
    this[randomValue].seed(value);
    this[typesValue].seed(value);
    this[loremValue].seed(value);
  }

  /**
   * @param locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale?: DataMockLocale): void {
    this[loremValue].locale(locale);
  }

  /**
   * Randomly generates a boolean flag describing whether the request can
   * carry a payload.
   * 
   * @returns `true` when the request can carry a payload and `false` otherwise.
   */
  isPayload(init: HttpPayloadInit = {}): boolean {
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
   * @param mime The ime type. When not set it picks one.
   */
  payload(mime?: string): string {
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
   * @returns The x-www-form-urlencoded payload.
   */
  urlEncoded(): string {
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
   * @returns JSON payload
   */
  json(): string {
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
   * @returns XML payload
   */
  xml(): string {
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
