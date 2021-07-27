import { assert } from '@esm-bundle/chai';
import { Http } from '../../index.js';

describe('Http', () => {
  describe('#payloadOperations', () => {
    /** @type Http */
    let http;

    beforeEach(() => {
      http = new Http();
    });

    it('returns an array of strings', () => {
      const { payloadOperations } = http;
      assert.typeOf(payloadOperations, 'array');
      assert.typeOf(payloadOperations[0], 'string');
    });
  });

  describe('#nonPayloadOperations', () => {
    /** @type Http */
    let http;

    beforeEach(() => {
      http = new Http();
    });

    it('returns an array of strings', () => {
      const { nonPayloadOperations } = http;
      assert.typeOf(nonPayloadOperations, 'array');
      assert.typeOf(nonPayloadOperations[0], 'string');
    });
  });

  describe('request()', () => {
    /** @type Http */
    let http;

    beforeEach(() => {
      http = new Http();
    });

    it('has the url', () => {
      const result = http.request();
      assert.typeOf(result.url, 'string');
    });

    it('has the method', () => {
      const result = http.request();
      assert.typeOf(result.method, 'string');
    });

    it('has the headers', () => {
      const result = http.request();
      assert.typeOf(result.headers, 'string');
    });

    it('forces the payload', () => {
      for (let i = 0; i < 100; i ++) {
        const result = http.request({ payload: { force: true, } });
        assert.typeOf(result.payload, 'string');
      }
    });

    it('never generates the payload', () => {
      for (let i = 0; i < 100; i ++) {
        const result = http.request({ payload: { noPayload: true, } });
        assert.isUndefined(result.payload);
      }
    });

    it('adds content type with payload', () => {
      for (let i = 0; i < 50; i ++) {
        const result = http.request({ payload: { force: true, } });
        assert.include(result.headers, 'content-type');
      }
    });
  });

  describe('get()', () => {
    /** @type Http */
    let http;

    beforeEach(() => {
      http = new Http();
    });

    it('always returns "GET"', () => {
      const result = new Array(20).fill(0).map(() => http.get().method);
      const compare = new Array(20).fill('GET');
      assert.deepEqual(result, compare);
    });

    it('never have payload', () => {
      const result = new Array(20).fill(0).map(() => http.get().payload);
      const compare = new Array(20).fill(undefined);
      assert.deepEqual(result, compare);
    });
  });

  describe('post()', () => {
    /** @type Http */
    let http;

    beforeEach(() => {
      http = new Http();
    });

    it('always returns "POST"', () => {
      const result = new Array(20).fill(0).map(() => http.post().method);
      const compare = new Array(20).fill('POST');
      assert.deepEqual(result, compare);
    });

    it('always have payload', () => {
      const result = new Array(20).fill(0).map(() => http.post().payload);
      const invalid = result.some(i => typeof i !== 'string' || !i);
      assert.isFalse(invalid);
    });
  });

  describe('put()', () => {
    /** @type Http */
    let http;

    beforeEach(() => {
      http = new Http();
    });

    it('always returns "PUT"', () => {
      const result = new Array(20).fill(0).map(() => http.put().method);
      const compare = new Array(20).fill('PUT');
      assert.deepEqual(result, compare);
    });

    it('always have payload', () => {
      const result = new Array(20).fill(0).map(() => http.put().payload);
      const invalid = result.some(i => typeof i !== 'string' || !i);
      assert.isFalse(invalid);
    });
  });

  describe('delete()', () => {
    /** @type Http */
    let http;

    beforeEach(() => {
      http = new Http();
    });

    it('always returns "DELETE"', () => {
      const result = new Array(20).fill(0).map(() => http.delete().method);
      const compare = new Array(20).fill('DELETE');
      assert.deepEqual(result, compare);
    });
  });

  describe('method()', () => {
    /** @type Http */
    let http;

    beforeEach(() => {
      http = new Http();
    });

    it('returns a string', () => {
      const result = http.method();
      assert.typeOf(result, 'string');
    });

    it('returns passed operation', () => {
      const result = http.method({ operation: 'Xterm' });
      assert.equal(result, 'Xterm');
    });

    it('returns one of the passed pool', () => {
      const result = http.method({ pool: ['Xterm'] });
      assert.equal(result, 'Xterm');
    });

    it('returns payload only operation', () => {
      const result = http.method({ withPayload: true });
      assert.include(http.payloadOperations, result);
    });

    it('returns non-payload only operation', () => {
      const result = http.method({ withPayload: false });
      assert.include(http.nonPayloadOperations, result);
    });

    it('returns any operation', () => {
      const result = http.method();
      assert.include(http.nonPayloadOperations.concat(http.payloadOperations), result);
    });
  });
});

describe('Http.headers', () => {
  describe('headers()', () => {
    /** @type Http */
    let http;
  
    beforeEach(() => {
      http = new Http();
    });
  
    it('returns a request string', () => {
      const result = http.headers.headers('request');
      assert.typeOf(result, 'string');
    });

    it('returns a response string', () => {
      const result = http.headers.headers('response');
      assert.typeOf(result, 'string');
    });

    it('returns a headers group', () => {
      const result = http.headers.headers('request', { group: 'cors', length: 1 });
      assert.include(result, 'origin: ');
    });

    it('throw when invalid configuration', () => {
      assert.throws(() => {
        http.headers.headers('request', { group: 'cors', length: 2 });
      });
    });

    it('produces multiple values', () => {
      const result = http.headers.headers('request', { group: 'cookies', length: 5 });
      assert.include(result, 'cookie: ');
      const value = result.split(': ')[1];
      const pairs = value.split('; ');
      assert.isAbove(pairs.length, 4);
    });
  });

  describe('link()', () => {
    /** @type Http */
    let http;
  
    beforeEach(() => {
      http = new Http();
    });
  
    it('returns a string', () => {
      const result = http.headers.link();
      assert.typeOf(result, 'string');
    });
  
    it('has the rel', () => {
      const result = http.headers.link();
      assert.include(result, 'rel="');
    });
  });
});
