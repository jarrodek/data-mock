import { assert } from '@esm-bundle/chai';
import Http from '../../src/lib/Http.js';

describe('Http', () => {
  describe('http.headers', () => {
    describe('headers()', () => {
      let http: Http;
    
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
      let http: Http;
    
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
  
    describe('contentType()', () => {
      let http: Http;
    
      beforeEach(() => {
        http = new Http();
      });
  
      it('returns a string', () => {
        const result = http.headers.contentType();
        assert.typeOf(result, 'string');
      });
    });
  });
});
