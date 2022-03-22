import { Lorem } from '../Lorem.js';
import { Random } from '../Random.js';
import { Types } from '../Types.js';
import { HttpHeaders } from './HttpHeaders.js';
import { HttpPayload } from './HttpPayload.js';
import { DataMockInit, HttpResponseInit, HttpResponseData, HttpResponseRedirectStatusInit, HttpResponseStatusResult } from '../../Types.js';
import { DataMockLocale } from '../../../locales/Types.js';

export const typesValue = Symbol('typesValue');
export const headersValue = Symbol('headersValue');
export const payloadValue = Symbol('payloadValue');
export const loremValue = Symbol('loremValue');
export const randomValue = Symbol('randomValue');

/**
 * Generates HTTP response data.
 */
export class HttpResponse {
  [headersValue]: HttpHeaders;
  [payloadValue]: HttpPayload;
  [loremValue]: Lorem;
  [typesValue]: Types;
  [randomValue]: Random;

  /**
   * @returns The list of status code for a redirect.
   */
  get redirectCodes(): number[] {
    return [301, 302, 303, 307, 308];
  }

  /**
   * @param init The library init options.
   */
  constructor(init: DataMockInit = {}) {
    this[headersValue] = new HttpHeaders(init);
    this[payloadValue] = new HttpPayload(init);
    this[loremValue] = new Lorem(init);
    this[typesValue] = new Types(init.seed);
    this[randomValue] = new Random(init.seed);
  }

  seed(value?: number): void {
    this[headersValue].seed(value);
    this[payloadValue].seed(value);
    this[typesValue].seed(value);
    this[loremValue].seed(value);
    this[randomValue].seed(value);
  }

  /**
   * @param locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale?: DataMockLocale): void {
    this[headersValue].locale(locale);
    this[payloadValue].locale(locale);
    this[loremValue].locale(locale);
  }

  /**
   * Generates an HTTP response.
   */
  response(init: HttpResponseInit = {}): HttpResponseData {
    const types = this[typesValue];
    const ct = init.noBody ? undefined : this[headersValue].contentType();
    const body = init.noBody ? undefined : this[payloadValue].payload(ct);
    const headers = this[headersValue].headers('response', ct);
    const statusGroup = init.statusGroup ? init.statusGroup : types.number({ min: 2, max: 5 });
    const sCode = types.number({ min: 0, max: 99 }).toString();
    const code = Number(`${statusGroup}${sCode.padStart(2, '0')}`);
    const status = this[loremValue].word();
    const result: HttpResponseData = {
      status: code,
      statusText: status,
      headers,
    };
    if (!init.noBody) {
      result.payload = body;
    }
    return result;
  }

  /**
   * @param opts Generate data options
   */
  redirectStatus(opts: HttpResponseRedirectStatusInit = {}): HttpResponseStatusResult {
    const code = typeof opts.code === 'number' ? opts.code : this[randomValue].pickOne(this.redirectCodes);
    const messages = {
      301: 'Moved Permanently',
      302: 'Found',
      303: 'See Other',
      307: 'Temporary Redirect',
      308: 'Permanent Redirect',
    };
    // @ts-ignore
    const status = opts.status ? opts.status : messages[code];
    return {
      code,
      status,
    }
  }
}
