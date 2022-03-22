import { assert } from '@esm-bundle/chai';
import { Random } from '../../src/lib/Random.js';

describe('Random', () => {
  const defaultPool = ['a', 'b', 'c', 'd', 'e', 'f'];

  describe('pick()', () => {
    let random: Random;

    before(() => {
      random = new Random();
    });

    it('respects the pool argument', () => {
      const result = random.pick(['a', 'b']);
      assert.typeOf(result, 'array', 'returns array');
      result.forEach(v => assert.include(['a', 'b'], v, 'has passed pool value'));
    });

    it('respects the count argument', () => {
      const result = random.pick(['a', 'b', 'c', 'd'], 3);
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
    let random: Random;

    before(() => {
      random = new Random();
    });

    it('returns one of the passed values', () => {
      const result = random.pickOne(['x', 'y', 'z']);
      assert.include(['x', 'y', 'z'], result, 'has the default pool value')
    });
  });
});
