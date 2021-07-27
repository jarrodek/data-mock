import { DataMockLocale } from '../../../locales/types';
import { DataMockInit, HttpPayloadInit } from '../../../types';
import { Lorem } from '../Lorem';
import { Random } from '../Random';
import { Types } from '../Types';

export const randomValue: unique symbol;
export const typesValue: unique symbol;
export const loremValue: unique symbol;

/**
 * Generates date/time related values.
 */
export declare class HttpPayload {
  [randomValue]: Random;
  [typesValue]: Types;
  [loremValue]: Lorem;

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
