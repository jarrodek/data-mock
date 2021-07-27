import { assert } from '@esm-bundle/chai';
import { Types } from '../../index.js';

describe('Types', () => {
  describe('number()', () => {
    /** @type Types */
    let types;

    before(() => {
      types = new Types();
    });

    it('generates a number', () => {
      const result = types.number();
      assert.typeOf(result, 'number');
    });

    it('respects the "max" option', () => {
      const result = types.number({ max: 5 });
      assert.isBelow(result, 6);
    });

    it('uses number argument as max', () => {
      const result = types.number(5);
      assert.isBelow(result, 6);
    });

    it('respects the "min" option', () => {
      const result = types.number({ min: 5 });
      assert.isAbove(result, 4);
    });

    it('respects the range', () => {
      const opts = { min: 11, max: 22 };

      for (let i = 0; i < 100; i++) {
        const result = types.number(opts);
        assert.ok(result >= opts.min);
        assert.ok(result <= opts.max);
      }
    });

    it('respects the "precision" option', () => {
      const opts = { min: 0, max: 1.5, precision: 0.5 };
      let results = new Array(1024).fill(0).map(() => types.number(opts));
      results = results.reduce((unique, item) => (unique.includes(item) ? unique : [...unique, item]), []);
      results.sort();
      assert.equal(results[0], 0, 'has 0');
      assert.include(results, 0.5, 'has 0.5');
      assert.include(results, 1.0, 'has 1.0');
      assert.equal(results[results.length - 1], 1.5, 'has 1.5');
    });
  });

  describe('float()', () => {
    /** @type Types */
    let types;

    before(() => {
      types = new Types();
    });

    it('uses the default precision', () => {
      const number = types.float();
      assert.strictEqual(number, Number(number.toFixed(2)));
    });

    it('respects the precision value', () => {
      const number = types.float(0.001);
      assert.strictEqual(number, Number(number.toFixed(3)));
    });

    it('respects the max option', () => {
      const opts = { max: 10 };
      assert.ok(types.float(opts) <= opts.max);
    });

    it('respects the min option', () => {
      const opts = { max: 0 };
      assert.ok(types.float(opts) === 0);
    });

    it('includes negative minimum', () => {
      const opts = { min: -100, max: 0 };
      assert.ok(types.float(opts) <= opts.max);
    });

    it('returns a random number between a range', () => {
      const options = { min: 22, max: 33 };
      for (let i = 0; i < 5; i++) {
        const result = types.float(options);
        assert.ok(result >= options.min);
        assert.ok(result <= options.max);
      }
    });

    it('respects the "precision" option', () => {
      const opts = { min: 0, max: 1.5, precision: 0.5 };
      let results = new Array(1024).fill(0).map(() => types.float(opts));
      results = results.reduce((unique, item) => (unique.includes(item) ? unique : [...unique, item]), []);
      results.sort();
      assert.equal(results[0], 0, 'has 0');
      assert.include(results, 0.5, 'has 0.5');
      assert.include(results, 1.0, 'has 1.0');
      assert.equal(results[results.length - 1], 1.5, 'has 1.5');
    });
  });

  describe('datetime()', () => {
    /** @type Types */
    let types;

    before(() => {
      types = new Types();
    });

    it('returns a date object', () => {
      const result = types.datetime();
      assert.typeOf(result.getTime(), 'number', 'has getTime()');
      assert.isFalse(Number.isNaN(result.getTime()), 'is not NaN');
    });

    it('respects the max time', () => {
      const max = new Date().getTime();
      const result = types.datetime({ max }).getTime();
      
      assert.isBelow(result, max);
    });

    it('respects the max as a init argument', () => {
      const max = new Date().getTime();
      const result = types.datetime(max).getTime();
      
      assert.isBelow(result, max);
    });

    it('respects the max time', () => {
      const min = new Date().getTime();
      const result = types.datetime({ min }).getTime();
      
      assert.isAbove(result, min);
    });
  });

  describe('string()', () => {
    /** @type Types */
    let types;

    beforeEach(() => {
      types = new Types();
    });

    it('generates a random string', () => {
      const result = types.string();
      assert.typeOf(result, 'string', 'is a string');
      assert.lengthOf(result, 10, 'has 10 characters');
    });

    it('respects the seed value', () => {
      types.seed(100);
      const result = types.string();
      assert.equal(result, 'ciOVWbrHAI');
    });

    it('respects the size argument', () => {
      const result = types.string(20);
      assert.lengthOf(result, 20);
    });

    it('respects the pool argument', () => {
      const result = types.string(50, 'abc');
      assert.match(result, /[abc]/);
    });
  });

  describe('character()', () => {
    /** @type Types */
    let types;

    before(() => {
      types = new Types();
    });

    it('returns a single character', () => {
      const result = types.character();
      assert.typeOf(result, 'string', 'returns a string');
      assert.lengthOf(result, 1, 'has a single character');
    });

    it('returns alpha character only', () => {
      for (let i = 0; i < 50; i++) {
        const result = types.character({ alpha: true });
        assert.match(result, /[A-Za-z]/);
      }
    });

    it('returns lowercase alpha character only', () => {
      for (let i = 0; i < 50; i++) {
        const result = types.character({ alpha: true, casing: 'lower' });
        assert.match(result, /[a-z]/);
      }
    });

    it('returns uppercase alpha character only', () => {
      for (let i = 0; i < 50; i++) {
        const result = types.character({ alpha: true, casing: 'upper' });
        assert.match(result, /[A-Z]/);
      }
    });

    it('returns numeric character only', () => {
      for (let i = 0; i < 50; i++) {
        const result = types.character({ numeric: true });
        assert.match(result, /[0-9]/);
      }
    });

    it('returns symbol character only', () => {
      for (let i = 0; i < 50; i++) {
        const result = types.character({ symbols: true });
        assert.match(result, /[!@#$%^&*()[\]]/);
      }
    });

    it('returns symbol and alpha character only', () => {
      const results = new Array(50).fill(0).map(() => types.character({ symbols: true, alpha: true } ));
      const hasAlpha = results.some(i => i.match(/[A-Za-z]/));
      const hasSymbol = results.some(i => i.match(/[!@#$%^&*()[\]]/));
      assert.isTrue(hasAlpha, 'has alpha character');
      assert.isTrue(hasSymbol, 'has symbol character');
    });

    it('returns numeric and alpha character only', () => {
      const results = new Array(50).fill(0).map(() => types.character({ numeric: true, alpha: true } ));
      const hasAlpha = results.some(i => i.match(/[A-Za-z]/));
      const hasNumeric = results.some(i => i.match(/[0-9]/));
      assert.isTrue(hasAlpha, 'has alpha character');
      assert.isTrue(hasNumeric, 'has numeric character');
    });
  });

  describe('uuid()', () => {
    /** @type Types */
    let types;

    before(() => {
      types = new Types();
    });

    it('generates a valid UUID', () => {
      const result = types.uuid();
      const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
      assert.ok(pattern.test(result));
    });
  });

  describe('hexaDecimal()', () => {
    /** @type Types */
    let types;

    before(() => {
      types = new Types();
    });

    it('returns a single hex character', () => {
      const hex = types.hexaDecimal();
      assert.ok(hex.match(/^(0x)[0-9a-f]{1}$/i));
    });

    it('generates a random hex string', () => {
      const hex = types.hexaDecimal(5);
      assert.ok(hex.match(/^(0x)[0-9a-f]+$/i));
    });
  });

  describe('hash()', () => {
    /** @type Types */
    let types;

    before(() => {
      types = new Types();
    });

    it('uses the default pool', () => {
      const results = new Array(50).fill(0).map(() => types.hash());
      const invalid = results.some(i => !i.match(/[0-9a-f]/));
      assert.isFalse(invalid, 'all results are valid');
    });

    it('uses the upper case pool', () => {
      const results = new Array(50).fill(0).map(() => types.hash({ casing: 'upper' }));
      const invalid = results.some(i => !i.match(/[0-9A-F]/));
      assert.isFalse(invalid, 'all results are valid');
    });

    it('uses the default size', () => {
      const result = types.hash();
      assert.lengthOf(result, 40);
    });

    it('uses the passed length', () => {
      const result = types.hash({ length: 8 });
      assert.lengthOf(result, 8);
    });
  });

  describe('boolean()', () => {
    /** @type Types */
    let types;

    before(() => {
      types = new Types();
    });

    it('returns a boolean value', () => {
      const result = types.boolean();
      assert.strictEqual(typeof result, 'boolean');
    });

    it('returns a boolean value with seeding', ()=> {
      types.seed(1);
      const result = types.boolean();
      assert.strictEqual(result, false);
    });

    it('respects the likelihood argument (30%)', () => {
      let trueCount = 0;
      new Array(1000).fill(0).forEach(() => {
        if (types.boolean({ likelihood: 30 })) {
          trueCount++;
        }
      });
      // Expect it to average around 300
      assert.isAbove(trueCount, 200);
      assert.isBelow(trueCount, 400);
    });

    it('respects the likelihood argument (99%)', () => {
      let trueCount = 0;
      new Array(1000).fill(0).forEach(() => {
        if (types.boolean({ likelihood: 99 })) {
          trueCount++;
        }
      });
      // Expect it to average around 990
      assert.isAbove(trueCount, 900);
    });

    it('throws when likelihood below 0', () => {
      assert.throws(() => {
        types.boolean({ likelihood: -1 })
      });
    });

    it('throws when likelihood above 100', () => {
      assert.throws(() => {
        types.boolean({ likelihood: 101 })
      });
    });
  });

  describe('falsy()', () => {
    /** @type Types */
    let types;

    before(() => {
      types = new Types();
    });

    it('returns a falsy value', () => {
      const values = new Array(100).fill(0).map(() => !!types.falsy());
      const compare = new Array(100).fill(false);
      assert.deepStrictEqual(values, compare);
    });
  });
});
