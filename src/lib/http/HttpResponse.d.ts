import { DataMockLocale } from '../../../locales/types';
import { DataMockInit, HttpResponseData, HttpResponseInit } from '../../../types';
import { Lorem } from '../Lorem';
import { Types } from '../Types';
import { HttpHeaders } from './HttpHeaders';
import { HttpPayload } from './HttpPayload';

export const typesValue: unique symbol;
export const headersValue: unique symbol;
export const payloadValue: unique symbol;
export const loremValue: unique symbol;

/**
 * Generates HTTP response data.
 */
export declare class HttpResponse {
  [headersValue]: HttpHeaders;
  [payloadValue]: HttpPayload;
  [loremValue]: Lorem;
  [typesValue]: Types;
  
  /**
   * @param init The library init options.
   */
  constructor(init?: DataMockInit);
  seed(value?: number): void;

  /**
   * @param locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale?: DataMockLocale): void;

  /**
   * Generates an HTTP response.
   */
  response(init?: HttpResponseInit): HttpResponseData;
}
