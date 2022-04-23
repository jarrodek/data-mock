import { assert } from '@esm-bundle/chai';
import Http from '../../src/lib/Http.js';

describe('Http', () => {
  describe('http.response', () => {
    describe('response()', () => {
      let http: Http;
    
      beforeEach(() => {
        http = new Http();
      });
  
      [
        ['status', 'number'],
        ['statusText', 'string'],
        ['headers', 'string'],
        // ['payload', 'string'],
      ].forEach(([prop, type]) => {
        it(`has the ${prop} property by default`, () => {
          const result = http.response.response();
          assert.typeOf(result[prop], type);
        });
      });
  
      it('ignores the payload when in options', () => {
        const result = http.response.response({ payload: { noPayload: true }});
        assert.isUndefined(result.payload);
      });

      it('has the payload when forced', () => {
        const result = http.response.response({ payload: { force: true }});
        assert.ok(result.payload)
      });
  
      it('has the specific response group', () => {
        let result = http.response.response({ statusGroup: 2 });
        assert.isAbove(result.status, 199);
        assert.isBelow(result.status, 300);
        result = http.response.response({ statusGroup: 3 });
        assert.isAbove(result.status, 299);
        assert.isBelow(result.status, 400);
      });
    });
  
    describe('redirectStatus()', () => {
      let http: Http;
    
      beforeEach(() => {
        http = new Http();
      });
  
      it('returns a valid status code', () => {
        const result = http.response.redirectStatus();
        assert.typeOf(result.code, 'number', 'code is a number');
        assert.include(http.response.redirectCodes, result.code, 'code is a redirect code');
      });
  
      it('uses the passed code', () => {
        const result = http.response.redirectStatus({ code: 999 });
        assert.equal(result.code, 999);
      });
  
      it('returns the status', () => {
        const result = http.response.redirectStatus();
        assert.typeOf(result.status, 'string', 'status is a string');
      });
  
      it('returns the passed status', () => {
        const result = http.response.redirectStatus({ status: 'test' });
        assert.equal(result.status, 'test');
      });
    });
  });
});
