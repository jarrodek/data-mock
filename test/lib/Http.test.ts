/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-unresolved
import { assert } from '@esm-bundle/chai';
import sinon from 'sinon';
import { Http } from '../../src/lib/Http.js';

describe('Http', () => {
  describe('#payloadOperations', () => {
    let http: Http;

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
    let http: Http;

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
    let http: Http;

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
    let http: Http;

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
    let http: Http;

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
    let http: Http;

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
    let http: Http;

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
    let http: Http;

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

describe('Http.payload', () => {
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

describe('Http.response', () => {
  describe('response()', () => {
    let http: Http;
  
    beforeEach(() => {
      http = new Http();
    });

    [
      ['status', 'number'],
      ['statusText', 'string'],
      ['headers', 'string'],
      ['payload', 'string'],
    ].forEach(([prop, type]) => {
      it(`has the ${prop} property by default`, () => {
        const result = http.response.response();
        assert.typeOf(result[prop], type);
      });
    });

    it('ignores the payload when in options', () => {
      const result = http.response.response({ noBody: true });
      assert.isUndefined(result.payload);
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

describe('Http.formData', () => {
  describe('filePart()', () => {
    let http: Http;
  
    beforeEach(() => {
      http = new Http();
    });

    it('adds a part', () => {
      const fd = new FormData();
      http.formData.filePart(fd);
      let addedName: string;
      let addedFile: File;
      let size = 0;
      for (const [name, value] of fd.entries()) {
        size += 1;
        addedName = name;
        addedFile = value as File;
      }
      assert.equal(size, 1, 'has one file');
      assert.typeOf(addedName, 'string', 'has file name');
      assert.typeOf(addedFile, 'file', 'has the file');
      assert.isAbove(addedFile.size, 0, 'the file has a content');
      assert.isNotEmpty(addedFile.name, 'the file has the name');
    });
  });

  describe('textPart()', () => {
    let http: Http;
  
    beforeEach(() => {
      http = new Http();
    });

    it('adds a clear text part', () => {
      const fd = new FormData();
      http.formData.textPart(fd, { clearText: true });
      let addedName: string;
      let addedText: string;
      let size = 0;
      for (const [name, value] of fd.entries()) {
        size += 1;
        addedName = name;
        addedText = value as string;
      }
      assert.equal(size, 1, 'has one file');
      assert.typeOf(addedName, 'string', 'has file name');
      assert.typeOf(addedText, 'string', 'has the contents');
    });

    it('adds a blob text part', () => {
      const fd = new FormData();
      http.formData.textPart(fd, { textMime: 'application/json' });
      let addedName: string;
      let addedValue: Blob;
      let size = 0;
      for (const [name, value] of fd.entries()) {
        size += 1;
        addedName = name;
        addedValue = value as Blob;
      }
      assert.equal(size, 1, 'has one file');
      assert.typeOf(addedName, 'string', 'has file name');
      assert.typeOf(addedValue, 'file', 'has the contents');
    });
  });

  describe('form()', () => {
    let http: Http;
  
    beforeEach(() => {
      http = new Http();
    });

    it('returns the form', () => {
      const result = http.formData.form();
      assert.typeOf(result, 'FormData');
    });

    it('adds parts', () => {
      const fd = http.formData.form();
      let size = 0;
      for (const _ of fd.entries()) {
        size += 1;
      }
      assert.isAbove(size, 0);
    });

    it('adds file parts only', () => {
      const fd = http.formData.form({ filePart: true, parts: 5 });
      for (const [, file] of fd.entries()) {
        assert.typeOf(file, 'File');
      }
    });

    it('adds text parts only', () => {
      const fd = http.formData.form({ parts: 5, textPart: true, clearText: true });
      for (const [, file] of fd.entries()) {
        assert.typeOf(file, 'string');
      }
    });
  });
});
