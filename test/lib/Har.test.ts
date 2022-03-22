// eslint-disable-next-line import/no-unresolved
import { assert } from '@esm-bundle/chai';
// import { Har } from '../../src/lib/Har.js';
import { Har } from '../../index.js';

describe('Har', () => {
  describe('timing()', () => {
    let har: Har;

    beforeEach(() => {
      har = new Har();
    });

    [
      'blocked', 'connect', 'receive', 'send', 'wait', 'dns',
    ].forEach((name) => {
      it(`has ${name} property`, () => {
        const result = har.timing();
        assert.typeOf(result[name], 'number');
      });
    });

    it('has no ssl property by default', () => {
      const result = har.timing();
      assert.isUndefined(result.ssl);
    });

    it('adds ssl property', () => {
      const result = har.timing({ ssl: true });
      assert.typeOf(result.ssl, 'number');
    });
  });

  describe('version()', () => {
    let har: Har;

    beforeEach(() => {
      har = new Har();
    });

    it('returns HAR version', () => {
      const result = har.version();
      assert.equal(result, '1.2');
    });
  });

  describe('creator()', () => {
    let har: Har;

    beforeEach(() => {
      har = new Har();
    });

    it('returns creator info', () => {
      const result = har.creator();
      assert.typeOf(result, 'object', 'returns an object');
      assert.typeOf(result.name, 'string', 'name is set');
      assert.typeOf(result.version, 'string', 'version is set');
      assert.typeOf(result.comment, 'string', 'comment is set');
    });
  });

  describe('browser()', () => {
    let har: Har;

    beforeEach(() => {
      har = new Har();
    });

    it('returns browser info', () => {
      const result = har.browser();
      assert.typeOf(result, 'object', 'returns an object');
      assert.typeOf(result.name, 'string', 'name is set');
      assert.typeOf(result.version, 'string', 'version is set');
      assert.typeOf(result.comment, 'string', 'comment is set');
    });
  });
});
