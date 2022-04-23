import { assert } from '@esm-bundle/chai';
import sinon from 'sinon';
import Http from '../../src/lib/Http.js';

describe('Http', () => {
  describe('http.payload', () => {
    describe('isPayload()', () => {
      let http: Http;
    
      beforeEach(() => {
        http = new Http();
      });
  
      it('Returns a boolean', () => {
        const result = http.payload.isPayload();
        assert.typeOf(result, 'boolean');
      });
  
      it('Always returns false for noPayload', () => {
        const result = http.payload.isPayload({
          noPayload: true
        });
        assert.isFalse(result);
      });
  
      it('Always returns true for forcePayload', () => {
        const result = http.payload.isPayload({
          force: true
        });
        assert.isTrue(result);
      });
    });
  
    describe('urlEncoded()', () => {
      let http: Http;
    
      beforeEach(() => {
        http = new Http();
      });
  
      it('returns a string', () => {
        const result = http.payload.urlEncoded();
        assert.typeOf(result, 'string');
      });
  
      it('has at least one value', () => {
        const result = http.payload.urlEncoded();
        assert.notEqual(result.indexOf('='), -1);
      });
    });
  
    describe('json()', () => {
      let http: Http;
    
      beforeEach(() => {
        http = new Http();
      });
  
      it('Returns a string', () => {
        const result = http.payload.json();
        assert.typeOf(result, 'string');
      });
  
      it('Is valid JSON', () => {
        const result = http.payload.json();
        const data = JSON.parse(result);
        assert.typeOf(data, 'object');
      });
    });
  
    describe('xml()', () => {
      let http: Http;
    
      beforeEach(() => {
        http = new Http();
      });
  
      it('Returns a string', () => {
        const result = http.payload.xml();
        assert.typeOf(result, 'string');
      });
    });
  
    describe('payload()', () => {
      let http: Http;
    
      beforeEach(() => {
        http = new Http();
      });
  
      it('returns a string when no content type', () => {
        const result = http.payload.payload();
        assert.typeOf(result, 'string');
      });
  
      it('generates JSON data', () => {
        const spy = sinon.spy(http.payload, 'json');
        http.payload.payload('application/json');
        assert.isTrue(spy.called);
      });
  
      it('returns a string for application/json', () => {
        const result = http.payload.payload('application/json');
        assert.typeOf(result, 'string');
      });
  
      it('generates xml data', () => {
        const spy = sinon.spy(http.payload, 'xml');
        http.payload.payload('application/xml');
        assert.isTrue(spy.called);
      });
  
      it('returns a string for application/xml', () => {
        const result = http.payload.payload('application/xml');
        assert.typeOf(result, 'string');
      });
  
      it('generates url encoded data', () => {
        const spy = sinon.spy(http.payload, 'urlEncoded');
        http.payload.payload('application/x-www-form-urlencoded');
        assert.isTrue(spy.called);
      });
  
      it('returns a string for application/xml', () => {
        const result = http.payload.payload('application/x-www-form-urlencoded');
        assert.typeOf(result, 'string');
      });
  
      it('returns a string for image/svg+xml', () => {
        const result = http.payload.payload('image/svg+xml');
        assert.include(result, '<?xml version="1.0"?>');
      });
  
      it('returns a string for other types', () => {
        const result = http.payload.payload('text/plain');
        assert.typeOf(result, 'string');
      });
  
      it('returns random string for other types type', () => {
        const result = http.payload.payload('unknown');
        assert.isAbove(result.length, 1);
      });
    });
  
    describe('supportsPayload()', () => {
      [
        'application/x-www-form-urlencoded',
        'application/json',
        'application/xml',
        'image/svg+xml',
      ].forEach((mime) => {
        it(`returns true for ${mime}`, () => {
          const generator = new Http();
          const result = generator.payload.supportsPayload(mime);
          assert.isTrue(result);
        });
      });
  
      it(`returns true for no mime`, () => {
        const generator = new Http();
        const result = generator.payload.supportsPayload();
        assert.isTrue(result);
      });
  
      it(`returns false for unsupported mime`, () => {
        const generator = new Http();
        const result = generator.payload.supportsPayload('other');
        assert.isFalse(result);
      });
    });
  
    describe('svg()', () => {
      it(`returns an xml`, () => {
        const generator = new Http();
        const result = generator.payload.svg();
        assert.include(result, '<?xml version="1.0"?>');
      });
    });
  });
});
