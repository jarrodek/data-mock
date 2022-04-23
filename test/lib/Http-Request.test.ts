import { assert } from '@esm-bundle/chai';
import Http from '../../src/lib/Http.js';

describe('Http', () => {
  describe('http.request', () => {

    describe('#payloadOperations', () => {
      let http: Http;
  
      beforeEach(() => {
        http = new Http();
      });
  
      it('returns an array of strings', () => {
        const { payloadOperations } = http.request;
        assert.typeOf(payloadOperations, 'array');
        assert.typeOf(payloadOperations[0], 'string');
      });
    });
  
    describe('#nonPayloadOperations', () => {
      let http: Http;
  
      beforeEach(() => {
        http = new Http();
      });
  
      it('returns an array of strings', () => {
        const { nonPayloadOperations } = http.request;
        assert.typeOf(nonPayloadOperations, 'array');
        assert.typeOf(nonPayloadOperations[0], 'string');
      });
    });
  
    describe('request()', () => {
      let http: Http;
  
      beforeEach(() => {
        http = new Http();
      });
  
      it('has the url', () => {
        const result = http.request.request();
        assert.typeOf(result.url, 'string');
      });
  
      it('has the method', () => {
        const result = http.request.request();
        assert.typeOf(result.method, 'string');
      });
  
      it('has the headers', () => {
        const result = http.request.request();
        assert.typeOf(result.headers, 'string');
      });
  
      it('forces the payload', () => {
        for (let i = 0; i < 100; i ++) {
          const result = http.request.request({ payload: { force: true, } });
          assert.typeOf(result.payload, 'string');
        }
      });
  
      it('never generates the payload', () => {
        for (let i = 0; i < 100; i ++) {
          const result = http.request.request({ payload: { noPayload: true, } });
          assert.isUndefined(result.payload);
        }
      });
  
      it('adds content type with payload', () => {
        for (let i = 0; i < 50; i ++) {
          const result = http.request.request({ payload: { force: true, } });
          assert.include(result.headers, 'content-type');
        }
      });
    });
  
    describe('get()', () => {
      let http: Http;
  
      beforeEach(() => {
        http = new Http();
      });
  
      it('always returns "GET"', () => {
        const result = new Array(20).fill(0).map(() => http.request.get().method);
        const compare = new Array(20).fill('GET');
        assert.deepEqual(result, compare);
      });
  
      it('never have payload', () => {
        const result = new Array(20).fill(0).map(() => http.request.get().payload);
        const compare = new Array(20).fill(undefined);
        assert.deepEqual(result, compare);
      });
    });
  
    describe('post()', () => {
      let http: Http;
  
      beforeEach(() => {
        http = new Http();
      });
  
      it('always returns "POST"', () => {
        const result = new Array(20).fill(0).map(() => http.request.post().method);
        const compare = new Array(20).fill('POST');
        assert.deepEqual(result, compare);
      });
  
      it('always have payload', () => {
        const result = new Array(20).fill(0).map(() => http.request.post().payload);
        const invalid = result.some(i => typeof i !== 'string' || !i);
        assert.isFalse(invalid);
      });
    });
  
    describe('put()', () => {
      let http: Http;
  
      beforeEach(() => {
        http = new Http();
      });
  
      it('always returns "PUT"', () => {
        const result = new Array(20).fill(0).map(() => http.request.put().method);
        const compare = new Array(20).fill('PUT');
        assert.deepEqual(result, compare);
      });
  
      it('always have payload', () => {
        const result = new Array(20).fill(0).map(() => http.request.put().payload);
        const invalid = result.some(i => typeof i !== 'string' || !i);
        assert.isFalse(invalid);
      });
    });
  
    describe('delete()', () => {
      let http: Http;
  
      beforeEach(() => {
        http = new Http();
      });
  
      it('always returns "DELETE"', () => {
        const result = new Array(20).fill(0).map(() => http.request.delete().method);
        const compare = new Array(20).fill('DELETE');
        assert.deepEqual(result, compare);
      });
    });
  
    describe('method()', () => {
      let http: Http;
  
      beforeEach(() => {
        http = new Http();
      });
  
      it('returns a string', () => {
        const result = http.request.method();
        assert.typeOf(result, 'string');
      });
  
      it('returns passed operation', () => {
        const result = http.request.method({ operation: 'Xterm' });
        assert.equal(result, 'Xterm');
      });
  
      it('returns one of the passed pool', () => {
        const result = http.request.method({ pool: ['Xterm'] });
        assert.equal(result, 'Xterm');
      });
  
      it('returns payload only operation', () => {
        const result = http.request.method({ withPayload: true });
        assert.include(http.request.payloadOperations, result);
      });
  
      it('returns non-payload only operation', () => {
        const result = http.request.method({ withPayload: false });
        assert.include(http.request.nonPayloadOperations, result);
      });
  
      it('returns any operation', () => {
        const result = http.request.method();
        assert.include(http.request.nonPayloadOperations.concat(http.request.payloadOperations), result);
      });
    });
  });
});
