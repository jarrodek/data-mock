import { DataMockLocale } from '../../../locales/types';
import { DataMockInit, HttpPayloadInit } from '../../../types';

/**
 * Generates date/time related values.
 */
export declare class HttpPayload {
  /**
   * @param init The library init options.
   */
  constructor(init?: DataMockInit);
  seed(value: number): void;
  /**
   * @param locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale?: DataMockLocale): void;
  /**
   * Randomly generates a boolean flag describing whether the request can
   * carry a payload.
   * 
   * @param {HttpPayloadInit=} init
   * @returns {boolean} `true` when the request can carry a payload and `false` otherwise.
   */
  isPayload(init?: HttpPayloadInit): boolean;

  /**
   * Generates a random payload data for given mime type.
   * 
   * @param {string=} mime The ime type. When not set it picks one.
   */
  payload(mime?: string): string;

  /**
   * Generates a random x-www-form-urlencoded payload.
   * @return The x-www-form-urlencoded payload.
   */
  urlEncoded(): string;

  /**
   * Generates random JSON data.
   * @return JSON payload
   */
  json(): string;

  /**
   * Generates random XML data.
   * @return XML payload
   */
  xml(): string;
}
