// eslint-disable-next-line import/no-unresolved
import { assert } from '@esm-bundle/chai';
import { Time } from '../../src/lib/Time.js';
import en from '../../locales/en/index.js';

describe('Time()', () => {
  describe('midnight()', () => {
    let time: Time;

    before(() => {
      time = new Time();
    });

    it('returns a number', () => {
      const result = time.midnight(Date.now());
      assert.typeOf(result, 'number');
    });

    it('sets milliseconds to 0', () => {
      const result = time.midnight(Date.now());
      const d = new Date(result);
      assert.equal(d.getMilliseconds(), 0);
    });

    it('sets seconds to 0', () => {
      const result = time.midnight(Date.now());
      const d = new Date(result);
      assert.equal(d.getSeconds(), 0);
    });

    it('sets minutes to 0', () => {
      const result = time.midnight(Date.now());
      const d = new Date(result);
      assert.equal(d.getMinutes(), 0);
    });

    it('sets hours to 0', () => {
      const result = time.midnight(Date.now());
      const d = new Date(result);
      assert.equal(d.getHours(), 0);
    });
  });

  describe('weekday()', () => {
    let time: Time;

    before(() => {
      time = new Time();
    });

    it('returns a number between 1 and 7 inclusive', () => {
      let max = Number.NEGATIVE_INFINITY;
      let min = Number.POSITIVE_INFINITY;
      for (let i = 0; i < 24; i++) {
        const result = time.weekday();
        if (result > max) {
          max = result;
        }
        if (result < min) {
          min = result;
        }
      }
      assert.isAbove(min, 0, 'is >= 1');
      assert.isBelow(min, 8, 'is <= 7');
    });

    it('respects min and max', () => {
      let max = Number.NEGATIVE_INFINITY;
      let min = Number.POSITIVE_INFINITY;
      for (let i = 0; i < 24; i++) {
        const result = time.weekday({ min: 3, max: 4 });
        if (result > max) {
          max = result;
        }
        if (result < min) {
          min = result;
        }
      }
      assert.isAbove(min, 2, 'is >= 3');
      assert.isBelow(min, 5, 'is <= 4');
    });

    it('throws when min < 1', () => {
      assert.throws(() => {
        time.weekday({ min: 0 });
      });
    });

    it('throws when max > 7', () => {
      assert.throws(() => {
        time.weekday({ max: 8 });
      });
    });

    it('throws when min > max', () => {
      assert.throws(() => {
        time.weekday({ min: 7, max: 6 });
      });
    });
  });

  describe('weekdayName()', () => {
    /** @type Time */
    let time: Time;

    before(() => {
      time = new Time();
    });

    it('returns a weekday name from the locale', () => {
      for (let i = 0; i < 24; i++) {
        const result = time.weekdayName();
        assert.include(en.time.weekday.names, result);
      }
    });

    it('returns a weekday name as an abbr from the locale', () => {
      for (let i = 0; i < 24; i++) {
        const result = time.weekdayName({ abbr: true });
        assert.include(en.time.weekday.abbr, result);
      }
    });

    it('returns from the default locale', () => {
      time.locale({
        title: 'Test',
        time: {
          weekday: undefined,
        }
      });
      for (let i = 0; i < 24; i++) {
        const result = time.weekdayName({ abbr: true });
        assert.include(en.time.weekday.abbr, result);
      }
    });

    it('returns from the custom locale', () => {
      const names = ['n1','n2','n3','n4','n5','n6','n7'];
      time.locale({
        title: 'Test',
        time: {
          weekday: {
            abbr: ['a1','a2','a3','a4','a5','a6','a7'],
            names,
          },
        }
      });
      for (let i = 0; i < 24; i++) {
        const result = time.weekdayName();
        assert.include(names, result);
      }
    });
  });

  describe('dateOnly()', () => {
    /** @type Time */
    let time: Time;

    before(() => {
      time = new Time();
    });

    it('returns a date format', () => {
      const result = time.dateOnly();
      assert.match(result, /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
    });
  });

  describe('timeOnly()', () => {
    /** @type Time */
    let time: Time;

    before(() => {
      time = new Time();
    });

    it('returns a time format', () => {
      const result = time.timeOnly();
      assert.match(result, /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/);
    });
  });

  describe('dateTime()', () => {
    /** @type Time */
    let time: Time;

    before(() => {
      time = new Time();
    });

    it('returns the rfc3339 format', () => {
      const result = time.dateTime('rfc3339');
      assert.match(result, /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z$/);
    });

    it('returns the rfc2616 format', () => {
      const result = time.dateTime('rfc2616');
      assert.match(result, /^[^,]+, [0-9]{1,2} \w+ [0-9]{4} [0-9]{1,2}:[0-9]{2}:[0-9]{2} GMT$/);
    });
  });

  describe('dateTimeOnly()', () => {
    /** @type Time */
    let time: Time;

    before(() => {
      time = new Time();
    });

    it('returns a date + time format', () => {
      const result = time.dateTimeOnly();
      assert.match(result, /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/);
    });
  });
});
