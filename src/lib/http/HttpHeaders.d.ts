import { DataMockLocale } from '../../../locales/types.js';
import { DataMockInit, HttpHeadersInit } from '../../../types.js';
import { Internet } from '../Internet.js';
import { Lorem } from '../Lorem.js';
import { Random } from '../Random.js';
import { Time } from '../Time.js';
import { Types } from '../Types.js';
import { GenerateInit } from './HttpHeadersSchema.js';

export const randomValue: unique symbol;
export const internetValue: unique symbol;
export const typesValue: unique symbol;
export const timeValue: unique symbol;
export const loremValue: unique symbol;
export const getInit: unique symbol;
export const collectHeaders: unique symbol;

export declare class HttpHeaders {
  [randomValue]: Random;
  [internetValue]: Internet;
  [typesValue]: Types;
  [timeValue]: Time;
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
  contentType(): string;

  /**
   * Generates a list of request or response headers.
   * 
   * Note, invalid configuration may lead to an infinity loop. This may happen when pool is set with the size
   * that exceed pool size and the pool contains headers that have only singular values.
   * 
   * @param type Either `request` or `response`
   */
  headers(type: 'request'|'response', init?: HttpHeadersInit): string;

  /**
   * @returns A value for the `location` header
   */
  link(): string;

  [getInit](): GenerateInit;
  /** 
   * Note, the returned value may contain duplicates. In such case the generated list of headers 
   * is the same as size but a header can have multiple values.
   * 
   * Note, invalid configuration may lead to an infinity loop. This may happen when pool is set with the size
   * that exceed pool size and the pool contains headers that have only singular values.
   * 
   * @param type Either `request` or `response`
   * @param size The number of requests to return.
   * @param group The name of the headers group
   * @param pool The pool of header names to choose from.
   * @param noMulti 
   * @returns The list of header names from the `HeadersSchema` object to use.
   */
  [collectHeaders](type: 'request'|'response', size: number, group?: string, pool?: string[], noMulti?: boolean): string[];
}
