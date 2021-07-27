import { HttpHeaders } from "./http/HttpHeaders.js";
import { HttpPayload } from "./http/HttpPayload.js";
import { Internet } from "./Internet.js";
import { Random } from "./Random.js";

/** @typedef {import('../../types').DataMockInit} DataMockInit */
/** @typedef {import('../../types').HttpRequestInit} HttpRequestInit */
/** @typedef {import('../../types').HttpRequest} HttpRequest */
/** @typedef {import('../../types').HttpOperationInit} HttpOperationInit */
/** @typedef {import('../../locales/types').DataMockLocale} DataMockLocale */

export const randomValue = Symbol('randomValue');
export const internetValue = Symbol('internetValue');

export class Http {
  // #internet;

  // #random;

  get payloadOperations() {
    return ['POST', 'PUT', 'DELETE', 'OPTIONS'];
  }

  get nonPayloadOperations() {
    return ['GET', 'HEAD'];
  }

  /**
   * @param {DataMockInit=} init The library init options.
   */
  constructor(init={}) {
    // this.#internet = new Internet(init);
    // this.#random = new Random();
    this[internetValue] = new Internet(init);
    this[randomValue] = new Random(init.seed);

    this.headers = new HttpHeaders(init);
    this.payload = new HttpPayload(init);
  }

  /**
   * @param {number=} value
   */
  seed(value) {
    this[internetValue].seed(value);
    this[randomValue].seed(value);
    this.headers.seed(value);
    this.payload.seed(value);
  }

  /**
   * @param {DataMockLocale=} locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale) {
    this.headers.locale(locale);
    this.payload.locale(locale);
    this[internetValue].locale(locale);
  }

  /**
   * @param {HttpRequestInit=} [init={}]
   * @returns {HttpRequest} Generates HTTP request,
   */
  request(init={}) {
    const withPayload = this.payload.isPayload(init.payload);
    const method = this.method({ ...init.method, withPayload});
    const contentType = withPayload ? this.headers.contentType() : undefined;
    const headers = this.headers.headers('request', {
      mime: contentType,
    });
    const result = {
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
  get(init={}) {
    const opts = { ...init };
    opts.method = { ...(opts.method || {}), operation: 'GET' };
    opts.payload = { ...(opts.payload || {}), noPayload: true };
    return this.request(opts);
  }

  /**
   * Creates a random POST request.
   * @param {HttpRequestInit=} [init={}]
   */
  post(init={}) {
    const opts = { ...init };
    opts.method = { ...(opts.method || {}), operation: 'POST' };
    opts.payload = { ...(opts.payload || {}), force: true };
    return this.request(opts);
  }

  /**
   * Creates a random PUT request.
   * @param {HttpRequestInit=} [init={}]
   */
  put(init={}) {
    const opts = { ...init };
    opts.method = { ...(opts.method || {}), operation: 'PUT' };
    opts.payload = { ...(opts.payload || {}), force: true };
    return this.request(opts);
  }

  /**
   * Creates a random DELETE request.
   * @param {HttpRequestInit=} [init={}]
   */
  delete(init={}) {
    const opts = { ...init };
    opts.method = { ...(opts.method || {}), operation: 'DELETE' };
    return this.request(opts);
  }

  /**
   * @param {HttpOperationInit=} [init={}]
   * @returns {string} 
   */
  method(init={}) {
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
