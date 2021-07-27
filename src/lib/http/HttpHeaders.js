/* eslint-disable no-continue */
import { Random } from '../Random.js';
import { Types } from '../Types.js';
import { HeadersSchema } from './HttpHeadersSchema.js';
import { Time } from '../Time.js';
import { Lorem } from '../Lorem.js';
import { Internet } from '../Internet.js';

/** @typedef {import('../../../types').DataMockInit} DataMockInit */
/** @typedef {import('../../../types').HttpHeadersInit} HttpHeadersInit */
/** @typedef {import('./HttpHeadersSchema').IHeadersSchema} IHeadersSchema */
/** @typedef {import('./HttpHeadersSchema').GenerateInit} GenerateInit */
/** @typedef {import('../../../locales/types').DataMockLocale} DataMockLocale */

export const randomValue = Symbol('randomValue');
export const internetValue = Symbol('internetValue');
export const typesValue = Symbol('typesValue');
export const timeValue = Symbol('timeValue');
export const loremValue = Symbol('loremValue');
export const getInit = Symbol('getInit');
export const collectHeaders = Symbol('collectHeaders');

const singularHeaders = [
  'content-type',
  `content-length`, 
  `content-encoding`, 
  `transfer-encoding`,
  'origin',
  'etag',
  'last-modified',
  'expires',
  'age',
  'connection',
  'date',
];

export class HttpHeaders {
  // #types;

  // #time;

  // #lorem;

  // #internet;

  // #random;

  /**
   * @param {DataMockInit=} init The library init options.
   */
  constructor(init={}) {
    // this.#random = new Random(init.seed);
    // this.#types = new Types(init.seed);
    // this.#time = new Time(init);
    // this.#lorem = new Lorem(init);
    // this.#internet = new Internet(init);
    this[randomValue] = new Random(init.seed);
    this[typesValue] = new Types(init.seed);
    this[timeValue] = new Time(init);
    this[loremValue] = new Lorem(init);
    this[internetValue] = new Internet(init);
  }

  /**
   * @param {number=} value
   */
  seed(value) {
    this[randomValue].seed(value);
    this[typesValue].seed(value);
    this[timeValue].seed(value);
    this[loremValue].seed(value);
    this[internetValue].seed(value);
  }

  /**
   * @param {DataMockLocale=} locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale) {
    this[loremValue].locale(locale);
    this[internetValue].locale(locale);
  }

  /** 
   * @returns {GenerateInit}
   */
  [getInit]() {
    return {
      time: this[timeValue],
      random: this[randomValue],
      types: this[typesValue],
      lorem: this[loremValue],
      internet: this[internetValue],
    };
  }

  contentType() {
    return HeadersSchema["content-type"].generate(this[getInit]());
  }

  /** 
   * Note, the returned value may contain duplicates. In such case the generated list of headers 
   * is the same as size but a header can have multiple values.
   * 
   * Note, invalid configuration may lead to an infinity loop. This may happen when pool is set with the size
   * that exceed pool size and the pool contains headers that have only singular values.
   * 
   * @param {'request'|'response'} type Either `request` or `response`
   * @param {number} size The number of requests to return.
   * @param {string=} group The name of the headers group
   * @param {string[]=} pool The pool of header names to choose from.
   * @param {boolean=} noMulti 
   * @returns {string[]} The list of header names from the `HeadersSchema` object to use.
   */
  [collectHeaders](type, size, group, pool=[], noMulti=false) {
    const keys = Object.keys(HeadersSchema).filter((name) => {
      if (!HeadersSchema[name][type]) {
        return false;
      }
      if (group) {
        const hGroup = /** @type string */ (HeadersSchema[name].group);
        if (!hGroup) {
          return false;
        }
        const groups = hGroup.split(',').map(i => i.trim());
        return groups.includes(group);
      }
      return true;
    });
    if (!keys) {
      throw new Error(`Invalid configuration. Unable to produce headers candidates.`);
    }
    let keeper = 0;
    const maxLoop = size * 10;
    const result = /** @type string[] */ ([]);
    while (result.length < size) {
      keeper++;
      if (maxLoop && keeper > maxLoop) {
        throw new Error(`Invalid configuration. Unable to produce a list of headers.`);
      }
      const name = this[randomValue].pickOne(keys);
      if (noMulti && result.includes(name)) {
        continue;
      }
      if (singularHeaders.includes(name) && result.includes(name)) {
        continue;
      }
      if (pool && pool.length) {
        if (!pool.includes(name)) {
          continue;
        }
      }
      result.push(name);
    }
    return result;
  }

  /**
   * Generates a list of request or response headers.
   * @param {'request'|'response'} type Either `request` or `response`
   * @param {HttpHeadersInit=} init
   */
  headers(type, init={}) {
    const { group, length, max=10, min=0, mime, pool, noMulti } = init;

    const addContentType = !!mime;
    const size = typeof length === 'number' ? length : this[typesValue].number({ min, max, });

    const names = this[collectHeaders](type, size, group, pool, noMulti);
    if (addContentType && names.includes('content-type')) {
      const index = names.indexOf('content-type');
      names.splice(index, 1);
    }

    const headersMap = {};
    const generatorOptions = this[getInit]();
    names.forEach((name) => {
      const info = /** @type IHeadersSchema */ (HeadersSchema[name]);
      const value = info.generate(generatorOptions);
      if (headersMap[name]) {
        const separator = name === 'cookie' ? ';' : ',';
        headersMap[name] += `${separator} ${value}`;
      } else {
        headersMap[name] = value;
      }
    });

    let result = Object.keys(headersMap).map(key => `${key}: ${headersMap[key]}`).join('\n');
    if (addContentType) {
      if (result) {
        result += `\n`;
      }
      result += `content-type: ${mime}`;
    }
    return result;
  }

  /**
   * @returns {string} A value for the `location` header
   */
  link() {
    return HeadersSchema.link.generate(this[getInit]());
  }
}
