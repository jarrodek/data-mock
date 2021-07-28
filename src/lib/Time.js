import { Types } from './Types.js';
import enLocale from '../../locales/en/index.js';

/** @typedef {import('../../types').DataMockInit} DataMockInit */
/** @typedef {import('../../types').TypeDateTimeInit} TypeDateTimeInit */
/** @typedef {import('../../types').TimeHourInit} TimeHourInit */
/** @typedef {import('../../types').TimeMinuteInit} TimeMinuteInit */
/** @typedef {import('../../types').TimeMonthInit} TimeMonthInit */
/** @typedef {import('../../types').TimeMonthNameInit} TimeMonthNameInit */
/** @typedef {import('../../types').TimeWeekdayInit} TimeWeekdayInit */
/** @typedef {import('../../locales/types').DataMockLocale} DataMockLocale */

export const typesValue = Symbol('typesValue');
export const localeValue = Symbol('localeValue');

/**
 * Generates date/time related values.
 */
export class Time {
  // #types;

  // #locale;

  /**
   * @param {DataMockInit=} init The library init options.
   */
  constructor(init={}) {
    // this.#types = new Types(init.seed);
    // this.#locale = init.locale || enLocale;
    this[typesValue] = new Types(init.seed);
    this[localeValue] = init.locale || enLocale;
  }

  /**
   * @param {number=} value
   */
  seed(value) {
    this[typesValue].seed(value);
  }

  /**
   * @param {DataMockLocale=} locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale) {
    this[localeValue] = locale || enLocale;
  }

  /**
   * @link {Types.datetime()}
   * @param {TypeDateTimeInit=} init When passed a number it generates an date in a range from [since 1. Jan 1970 UTC, init]
   * @returns {Date} A random date in a range.
   */
  date(init) {
    return this[typesValue].datetime(init);
  }

  /**
   * @returns {string} Randomly selected `am` or `pm` value.
   */
  amPm() {
    return this[typesValue].boolean() ? 'am' : 'pm';
  }

  /**
   * @param {TypeDateTimeInit=} init When passed a number it generates an date in a range from [since 1. Jan 1970 UTC, init]
   * @returns {number} A timestamp for the generated date.
   */
  timestamp(init) {
    const d = this[typesValue].datetime(init);
    return d.getTime() / 1000;
  }

  /**
   * Note, in 24hr clock the generated value for an hour that is less than 10 will be missing zero in the fist position.
   * @param {TimeHourInit} [init={}]
   * @returns {number} The value for an hour. 
   */
  hour(init={}) {
    const opts = { ...init };
    if (typeof opts.min !== 'number') {
      opts.min = opts.twentyFour ? 0 : 1;
    }
    if (typeof opts.max !== 'number') {
      opts.max = opts.twentyFour ? 23 : 12;
    }
    if (opts.min < 0) {
      throw new RangeError(`Provided value ${opts.min} for min is less than 0.`);
    }
    if ((opts.max > 23 && opts.twentyFour) || (opts.max > 12 && !opts.twentyFour)) {
      throw new RangeError(`Provided value ${opts.max} for max is greater than ${opts.twentyFour ? 23 : 12}.`);
    }
    if (opts.min > opts.max) {
      throw new RangeError(`The min value (${opts.min}) cannot be greater than max value (${opts.max}).`);
    }
    return this[typesValue].number({ min: opts.min, max: opts.max });
  }

  /**
   * Note, the generated value that is less than 10 will be missing zero in the fist position.
   * @param {TimeMinuteInit} [init={}]
   * @returns {number} The value for a minute. 
   */
  minute(init={}) {
    const { min = 0, max = 59 } = init;
    if (min < 0) {
      throw new RangeError(`Provided value ${min} for min is less than 0.`);
    }
    if (max > 59) {
      throw new RangeError(`Provided value ${max} for max is greater than 59.`);
    }
    if (min > max) {
      throw new RangeError(`The min value (${min}) cannot be greater than max value (${max}).`);
    }
    return this[typesValue].number({ min, max });
  }

  /**
   * @return {number} Random value for milliseconds.
   */
  millisecond() {
    return this[typesValue].number({ max: 999 });
  }

  /**
   * @return {number} Random value for seconds.
   */
  second() {
    return this[typesValue].number({ max: 59 });
  }

  /**
   * @param {TimeMonthInit=} [init={}]
   * @returns {number} The number of the month, 1-based.
   */
  month(init={}) {
    const { min = 1, max = 12 } = init;
    if (min < 1) {
      throw new RangeError(`Provided value ${min} for min is less than 0.`);
    }
    if (max > 12) {
      throw new RangeError(`Provided value ${max} for max is greater than 12.`);
    }
    if (min > max) {
      throw new RangeError(`The min value (${min}) cannot be greater than max value (${max}).`);
    }
    return this[typesValue].number({ min, max });
  }

  /**
   * @param {TimeMonthNameInit=} init
   * @returns {string} Name of the month.
   */
  monthName(init={}) {
    const index = this.month(init);
    const items = this.months(init.abbr);
    return items[index -1];
  }

  /**
   * @param {boolean=} abbr Whether to returns abbreviated values.
   * @returns {string[]} The list of month names.
   */
  months(abbr=false) {
    const dictionary = this[localeValue].time && this[localeValue].time.month || enLocale.time.month;
    return abbr ? dictionary.abbr : dictionary.names;
  }

  /**
   * @param {boolean=} abbr Whether to returns abbreviated values.
   * @returns {string[]} The list of week day names.
   */
  weekdays(abbr=false) {
    const dictionary = this[localeValue].time && this[localeValue].time.weekday || enLocale.time.weekday;
    return abbr ? dictionary.abbr : dictionary.names;
  }

  /**
   * @param {TimeWeekdayInit=} [init={}]
   * @returns {number} The number of the weekday, 1-based.
   */
  weekday(init={}) {
    const { min = 1, max = 7 } = init;
    if (min < 1) {
      throw new RangeError(`Provided value ${min} for min is less than 0.`);
    }
    if (max > 7) {
      throw new RangeError(`Provided value ${max} for max is greater than 7.`);
    }
    if (min > max) {
      throw new RangeError(`The min value (${min}) cannot be greater than max value (${max}).`);
    }
    return this[typesValue].number({ min, max });
  }

  /**
   * @param {TimeMonthNameInit=} init
   * @returns {string} The name of the weekday. Note, `en` locale starts the week on Monday.
   */
  weekdayName(init={}) {
    const index = this.weekday(init);
    const items = this.weekdays(init.abbr);
    return items[index -1];
  }

  /**
   * Sets a midnight on the timestamp.
   * @param {number=} time The timestamp to use. When not set it computes the midnight of today.
   * @returns {number} The timestamp of the midnight of the given time.
   */
  midnight(time = Date.now()) {
    const now = new Date(time);
    now.setHours(0, 0, 0, 0);
    return now.getTime();
  }
}
