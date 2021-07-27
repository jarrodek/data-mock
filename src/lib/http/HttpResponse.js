import { Lorem } from '../Lorem.js';
import { Types } from '../Types.js';
import { HttpHeaders } from './HttpHeaders.js';
import { HttpPayload } from './HttpPayload.js';

/** @typedef {import('../../../types').DataMockInit} DataMockInit */
/** @typedef {import('../../../types').HttpResponseInit} HttpResponseInit */
/** @typedef {import('../../../types').HttpResponseData} HttpResponseData */
/** @typedef {import('../../../locales/types').DataMockLocale} DataMockLocale */

export const typesValue = Symbol('typesValue');
export const headersValue = Symbol('headersValue');
export const payloadValue = Symbol('payloadValue');
export const loremValue = Symbol('loremValue');

/**
 * Generates HTTP response data.
 */
export class HttpResponse {
  /**
   * @param {DataMockInit=} init The library init options.
   */
  constructor(init={}) {
    this[headersValue] = new HttpHeaders(init);
    this[payloadValue] = new HttpPayload(init);
    this[loremValue] = new Lorem(init);
    this[typesValue] = new Types(init.seed);
  }

  /**
   * @param {number=} value
   */
  seed(value) {
    this[headersValue].seed(value);
    this[payloadValue].seed(value);
    this[typesValue].seed(value);
    this[loremValue].seed(value);
  }

  /**
   * @param {DataMockLocale=} locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale) {
    this[headersValue].locale(locale);
    this[payloadValue].locale(locale);
    this[loremValue].locale(locale);
  }

  /**
   * Generates an HTTP response.
   * 
   * @param {HttpResponseInit=} [init={}]
   * @returns {HttpResponseData} 
   */
  response(init = {}) {
    const types = this[typesValue];
    const ct = init.noBody ? undefined : this[headersValue].contentType();
    const body = init.noBody ? undefined : this[payloadValue].payload(ct);
    const headers = this[headersValue].headers('response', ct);
    const statusGroup = init.statusGroup ? init.statusGroup : types.number({ min: 2, max: 5 });
    const sCode = types.number({ min: 0, max: 99 }).toString();
    const code = Number(`${statusGroup}${sCode.padStart(2, '0')}`);
    const status = this[loremValue].word();
    const result = /** @type HttpResponseData */({
      status: code,
      statusText: status,
      headers,
    });
    if (!init.noBody) {
      result.payload = body;
    }
    return result;
  }
}
