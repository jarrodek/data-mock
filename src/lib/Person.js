import { Types } from './Types.js';
import { Random } from './Random.js';
import enLocale from '../../locales/en/index.js';

/** @typedef {import('../../types').DataMockInit} DataMockInit */
/** @typedef {import('../../types').PersonNameInit} PersonNameInit */
/** @typedef {import('../../types').Gender} Gender */
/** @typedef {import('../../locales/types').DataMockLocale} DataMockLocale */

const genderPool = /** @type Gender[] */ (['male', 'female']);

export const randomValue = Symbol('randomValue');
export const typesValue = Symbol('typesValue');
export const localeValue = Symbol('localeValue');

export class Person {
  // #types;

  // #locale;

  // #random;

  /**
   * @param {DataMockInit=} init The library init options.
   */
  constructor(init={}) {
    // this.#types = new Types(init.seed);
    // this.#random = new Random(init.seed);
    // this.#locale = init.locale || enLocale;
    this[typesValue] = new Types(init.seed);
    this[randomValue] = new Random(init.seed);
    this[localeValue] = init.locale || enLocale;
  }

  /**
   * @param {number=} value
   */
  seed(value) {
    this[randomValue].seed(value);
    this[typesValue].seed(value);
  }

  /**
   * @param {DataMockLocale=} locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale) {
    this[localeValue] = locale || enLocale;
  }

  /**
   * @param {Gender=} gender Person's gender to get the name from.
   * @returns {string} Randomly picked first name for a person.
   */
  firstName(gender) {
    const names = this[localeValue].person.firstName || enLocale.person.firstName;
    const safeGender = genderPool.includes(gender) ? gender : this[randomValue].pickOne(genderPool);
    const pool = names[safeGender];
    return this[randomValue].pickOne(pool);
  }

  /**
   * @param {Gender=} gender Person's gender to get the last name from. It does nothing when the language does not make a distinction between male and female names.
   * @returns {string} Randomly picked last name for a person.
   */
  lastName(gender) {
    const names = this[localeValue].person.lastName || enLocale.person.lastName;
    if (Array.isArray(names.general) && names.general.length) {
      return this[randomValue].pickOne(names.general);
    }
    const safeGender = genderPool.includes(gender) ? gender : this[randomValue].pickOne(genderPool);
    const pool = names[safeGender];
    return this[randomValue].pickOne(pool);
  }

  /**
   * @param {Gender=} gender Person's gender to get the middle name from.
   * @returns {string} Randomly picked middle name for a person.
   */
  middleName(gender) {
    const names = this[localeValue].person.middleName || this[localeValue].person.firstName || enLocale.person.firstName;
    const safeGender = /** @type Gender */ (genderPool.includes(gender) ? gender : this[randomValue].pickOne(genderPool));
    const pool = names[safeGender];
    return this[randomValue].pickOne(pool);
  }

  /**
   * @param {PersonNameInit=} [init={}]
   * @returns {string} Randomly picked full name of a person.
   */
  name(init={}) {
    const { firstName, lastName, gender } = init;
    const parts = [];
    if (this[typesValue].boolean({ likelihood: 10 })) {
      parts.push(this.prefix(gender));
    }
    parts.push(firstName || this.firstName(gender));
    parts.push(lastName || this.lastName(gender));
    if (this[typesValue].boolean({ likelihood: 10 })) {
      parts.push(this.suffix(gender));
    }
    return parts.join(' ');
  }

  /**
   * @param {boolean} binary Whether to pick from the two main genders.
   */
  gender(binary) {
    const info = this[localeValue].person.gender || enLocale.person.gender;
    if (binary) {
      return this[randomValue].pickOne(info.binary);
    }
    return this[randomValue].pickOne(info.pool);
  }

  /**
   * @param {Gender} gender Person's gender to get the prefix from. It does nothing when the language does not make a distinction between male and female prefixes.
   * @returns {string} Randomly picked prefix for a person.
   */
  prefix(gender) {
    const names = this[localeValue].person.prefix || enLocale.person.prefix;
    if (Array.isArray(names.general) && names.general.length) {
      return this[randomValue].pickOne(names.general);
    }
    const safeGender = genderPool.includes(gender) ? gender : this[randomValue].pickOne(genderPool);
    const pool = names[safeGender];
    return this[randomValue].pickOne(pool);
  }

  /**
   * @param {Gender} gender Person's gender to get the suffix from. It does nothing when the language does not make a distinction between male and female suffix.
   * @returns {string} Randomly picked suffix for a person.
   */
  suffix(gender) {
    const names = this[localeValue].person.suffix || enLocale.person.suffix;
    if (Array.isArray(names.general) && names.general.length) {
      return this[randomValue].pickOne(names.general);
    }
    const safeGender = genderPool.includes(gender) ? gender : this[randomValue].pickOne(genderPool);
    const pool = names[safeGender];
    return this[randomValue].pickOne(pool);
  }

  /**
   * @return {string} Persons job title
   */
  jobTitle() {
    const desc = this.jobDescriptor();
    const area = this.jobArea();
    const type = this.jobType();
    return `${desc} ${area} ${type}`;
  }

  /**
   * @return {string} Persons job descriptor
   */
  jobDescriptor() {
    const info = this[localeValue].person.title || enLocale.person.title;
    return this[randomValue].pickOne(info.descriptor);
  }

  /**
   * @return {string} Persons job area
   */
  jobArea() {
    const info = this[localeValue].person.title || enLocale.person.title;
    return this[randomValue].pickOne(info.level);
  }

  /**
   * @return {string} Persons job type
   */
  jobType() {
    const info = this[localeValue].person.title || enLocale.person.title;
    return this[randomValue].pickOne(info.job);
  }
}
