import { DataMockLocale } from "../../locales/types.js";
import { DataMockInit, HttpOperationInit, HttpRequest, HttpRequestInit } from "../../types.js";
import { HttpHeaders } from "./http/HttpHeaders.js";
import { HttpPayload } from "./http/HttpPayload.js";
import { HttpResponse } from "./http/HttpResponse.js";
import { Internet } from "./Internet.js";
import { Random } from "./Random.js";

export const randomValue: unique symbol;
export const internetValue: unique symbol;

export declare class Http {
  get payloadOperations(): string[];

  get nonPayloadOperations(): string[];

  [randomValue]: Random;
  [internetValue]: Internet;

  headers: HttpHeaders;
  payload: HttpPayload;
  response: HttpResponse;

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
   * @returns Generated HTTP request,
   */
  request(init?: HttpRequestInit): HttpRequest;

  /**
   * Creates a random GET request.
   */
  get(init?: HttpRequestInit): HttpRequest;

  /**
   * Creates a random POST request.
   */
  post(init?: HttpRequestInit): HttpRequest;

  /**
   * Creates a random PUT request.
   */
  put(init?: HttpRequestInit): HttpRequest;

  /**
   * Creates a random DELETE request.
   */
  delete(init?: HttpRequestInit): HttpRequest;
  method(init?: HttpOperationInit): string;
}
