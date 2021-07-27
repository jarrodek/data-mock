import { assert } from '@esm-bundle/chai';
import { Random } from '../../index.js';

describe('Random', () => {
  const defaultPool = ['a', 'b', 'c', 'd', 'e', 'f'];

  describe('pick()', () => {
    /** @type Random */
    let random;

    before(() => {
      random = new Random();
    });

    it('returns a random array', () => {
      const result = random.pick();
      assert.typeOf(result, 'array', 'returns array');
      result.forEach(v => assert.include(defaultPool, v, 'has default pool value'));
    });

    it('respects the pool argument', () => {
      const result = random.pick(['a', 'b']);
      assert.typeOf(result, 'array', 'returns array');
      result.forEach(v => assert.include(['a', 'b'], v, 'has passed pool value'));
    });

    it('respects the count argument', () => {
      const result = random.pick(undefined, 3);
      assert.lengthOf(result, 3);
    });

    it('adjusts the count to the array size', () => {
      const result = random.pick(['a', 'b'], 10);
      assert.lengthOf(result, 2);
    });

    it('adjusts the count when below 0', () => {
      const result = random.pick(['a', 'b'], -5);
      assert.lengthOf(result, 0);
    });
  });

  describe('pickOne()', () => {
    /** @type Random */
    let random;

    before(() => {
      random = new Random();
    });

    it('returns a random value', () => {
      const result = random.pickOne();
      assert.include(defaultPool, result, 'has the default pool value')
    });

    it('returns one of the passed values', () => {
      const result = random.pickOne(['x', 'y', 'z']);
      assert.include(['x', 'y', 'z'], result, 'has the default pool value')
    });
  });
});
