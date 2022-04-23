import { Types } from '../Types.js';
import { Lorem } from '../Lorem.js';
import { Random } from '../Random.js';
import { Internet } from '../Internet.js';
import { Svg } from '../Svg.js';
import { DataMockInit, HttpPayloadInit, ISvgImageInit } from '../../Types.js';
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

  protected _internet: Internet;
  protected _svg: Svg;

  /**
   * @param init The library init options.
   */
  constructor(init: DataMockInit = {}) {
    this[typesValue] = new Types(init.seed);
    this[randomValue] = new Random(init.seed);
    this[loremValue] = new Lorem(init);
    this._internet = new Internet(init);
    this._svg = new Svg(init);
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
   * Tests whether this generator supports generating a payload of a given mime type
   * @param mime The mime type of the body
   * @returns True when the body can be generated via this generator.
   */
  supportsPayload(mime?: string): boolean {
    if (!mime) {
      return true;
    }
    return [
      'application/x-www-form-urlencoded',
      'application/json',
      'application/xml',
      'image/svg+xml',
    ].includes(mime);
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
      case 'image/svg+xml':
        return this.svg();
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

  /**
   * This is a link to the SVG generator.
   */
  svg(init?: ISvgImageInit): string {
    return this._svg.image(init);
  }
}
