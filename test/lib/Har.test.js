// eslint-disable-next-line import/no-unresolved
import { assert } from '@esm-bundle/chai';
import { Har } from '../../index.js';

describe('Har', () => {
  describe('timing()', () => {
    /** @type Har */
    let har;

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
});
