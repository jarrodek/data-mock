import { DataMockLocale } from '../../../locales/types.js';
import { DataMockInit, HttpHeadersInit } from '../../../types.js';

export declare class HttpHeaders {
  /**
   * @param {DataMockInit=} init The library init options.
   */
  constructor(init?: DataMockInit);
  seed(value: number): void;
  /**
   * @param locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale?: DataMockLocale): void;
  contentType(): string;

  /**
   * Generates a list of request or response headers.
   * 
   * Note, invalid configuration may lead to an infinity loop. This may happen when pool is set with the size
   * that exceed pool size and the pool contains headers that have only singular values.
   * 
   * @param {'request'|'response'} type Either `request` or `response`
   * @param {HttpHeadersInit=} init
   */
  headers(type: 'request'|'response', init?: HttpHeadersInit): string;

  /**
   * @returns A value for the `location` header
   */
  link(): string;
}
