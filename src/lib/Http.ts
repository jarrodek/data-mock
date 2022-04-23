import { HttpHeaders } from "./http/HttpHeaders.js";
import { HttpPayload } from "./http/HttpPayload.js";
import { HttpResponse } from "./http/HttpResponse.js";
import { FormDataGenerator } from "./http/FormData.js";
import { Internet } from "./Internet.js";
import { Random } from "./Random.js";
import { DataMockInit, HttpRequestInit, HttpRequest, HttpOperationInit } from '../Types.js';
import { DataMockLocale } from '../../locales/Types.js';

export const randomValue = Symbol('randomValue');
export const internetValue = Symbol('internetValue');

export class Http {
  get payloadOperations(): string[] {
    return ['POST', 'PUT', 'DELETE', 'OPTIONS'];
  }

  get nonPayloadOperations(): string[] {
    return ['GET', 'HEAD'];
  }

  [internetValue]: Internet;
  [randomValue]: Random;
  headers: HttpHeaders;
  payload: HttpPayload;
  response: HttpResponse;
  formData: FormDataGenerator;

  /**
   * @param init The library init options.
   */
  constructor(init: DataMockInit={}) {
    this[internetValue] = new Internet(init);
    this[randomValue] = new Random(init.seed);

    this.headers = new HttpHeaders(init);
    this.payload = new HttpPayload(init);
    this.response = new HttpResponse(init);
    this.formData = new FormDataGenerator(init);
  }

  seed(value?: number): void {
    this[internetValue].seed(value);
    this[randomValue].seed(value);
    this.headers.seed(value);
    this.payload.seed(value);
    this.response.seed(value);
    this.formData.seed(value);
  }

  /**
   * @param locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale?: DataMockLocale): void {
    this.headers.locale(locale);
    this.payload.locale(locale);
    this.response.locale(locale);
    this.formData.locale(locale);
    this[internetValue].locale(locale);
  }

  /**
   * @returns Generates HTTP request,
   */
  request(init: HttpRequestInit = {}): HttpRequest {
    const withPayload = this.payload.isPayload(init.payload);
    const method = this.method({ ...init.method, withPayload});
    const contentType = withPayload ? this.headers.contentType() : undefined;
    const headers = this.headers.headers('request', {
      mime: contentType,
    });
    const result: HttpRequest = {
      url: this[internetValue].uri(),
      method,
      headers,
    };
    if (withPayload) {
      result.payload = this.payload.payload(contentType);
    }
    return result;
  }

  /**
   * Creates a random GET request.
   * @param {HttpRequestInit=} [init={}]
   */
  get(init: HttpRequestInit = {}): HttpRequest {
    const opts: HttpRequestInit = { ...init };
    opts.method = { ...(opts.method || {}), operation: 'GET' };
    opts.payload = { ...(opts.payload || {}), noPayload: true };
    return this.request(opts);
  }

  /**
   * Creates a random POST request.
   */
  post(init: HttpRequestInit = {}): HttpRequest {
    const opts: HttpRequestInit = { ...init };
    opts.method = { ...(opts.method || {}), operation: 'POST' };
    opts.payload = { ...(opts.payload || {}), force: true };
    return this.request(opts);
  }

  /**
   * Creates a random PUT request.
   */
  put(init: HttpRequestInit = {}): HttpRequest {
    const opts: HttpRequestInit = { ...init };
    opts.method = { ...(opts.method || {}), operation: 'PUT' };
    opts.payload = { ...(opts.payload || {}), force: true };
    return this.request(opts);
  }

  /**
   * Creates a random DELETE request.
   */
  delete(init: HttpRequestInit = {}): HttpRequest {
    const opts: HttpRequestInit = { ...init };
    opts.method = { ...(opts.method || {}), operation: 'DELETE' };
    return this.request(opts);
  }

  method(init: HttpOperationInit = {}): string {
    if (init.operation) {
      return init.operation;
    }
    if (init.pool) {
      return this[randomValue].pickOne(init.pool);
    }
    if (typeof init.withPayload === 'boolean') {
      const pool = init.withPayload ? this.payloadOperations : this.nonPayloadOperations;
      return this[randomValue].pickOne(pool);
    }
    return this[randomValue].pickOne(this.payloadOperations.concat(this.nonPayloadOperations));
  }
}
