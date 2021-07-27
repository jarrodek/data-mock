import enLocale from '../locales/en/index.js';
import { Types } from './lib/Types.js';
import { Lorem } from './lib/Lorem.js';
import { Person } from './lib/Person.js';
import { Internet } from './lib/Internet.js';
import { Random } from './lib/Random.js';
import { Time } from './lib/Time.js';
import { Word } from './lib/Word.js';
import { Http } from './lib/Http.js';

/** @typedef {import('../types').DataMockInit} DataMockInit */
/** @typedef {import('../locales/types').DataMockLocale} DataMockLocale */

export const localeValue = Symbol('localeValue');

export class DataMock {
  // /** 
  //  * The current locale to use.
  //  * @type {DataMockLocale}
  //  */
  // #locale;

  /**
   * @param {DataMockInit=} init The library init options.
   */
  constructor(init={}) {
    this[localeValue] = init.locale || enLocale;
    /**
     * Base types generator.
     * @type {Types}
     */
    this.types = new Types(init.seed);
    /**
     * Person things generator.
     * @type {Person}
     */
    this.person = new Person({ ...init, locale: this[localeValue]});
    /**
     * Internet things generator.
     * @type {Internet}
     */
    this.internet = new Internet({ ...init, locale: this[localeValue]});
    /**
     * Text generator.
     * @type {Lorem}
     */
    this.lorem = new Lorem({ ...init, locale: this[localeValue]});
    /**
     * Random things.
     * @type {Random}
     */
    this.random = new Random();
    /**
     * Random things.
     * @type {Time}
     */
    this.time = new Time({ ...init, locale: this[localeValue]});
    /**
     * Words picker.
     * @type {Word}
     */
    this.word = new Word({ ...init, locale: this[localeValue]});
    /**
     * Words picker.
     * @type {Http}
     */
    this.http = new Http({ ...init, locale: this[localeValue]});
  }

  /**
   * @param {number=} value
   */
  seed(value) {
    this.types.seed(value);
    this.person.seed(value);
    this.internet.seed(value);
    this.lorem.seed(value);
    this.random.seed(value);
    this.time.seed(value);
    this.word.seed(value);
    this.http.seed(value);
  }

  /**
   * @param {DataMockLocale=} locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale) {
    this[localeValue] = locale || enLocale;
    this.person.locale(locale);
    this.word.locale(locale);
    this.http.locale(locale);
    this.internet.locale(locale);
    this.lorem.locale(locale);
  }
}
