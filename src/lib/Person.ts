import { Types } from './Types.js';
import { Random } from './Random.js';
import enLocale from '../../locales/en/index.js';
import { DataMockInit, PersonNameInit, Gender,  } from '../Types.js';
import { DataMockLocale, LocalePersonTitle } from '../../locales/Types.js';

const genderPool: Gender[] = ['male', 'female'];

export const randomValue = Symbol('randomValue');
export const typesValue = Symbol('typesValue');
export const localeValue = Symbol('localeValue');

export class Person {
  [typesValue]: Types;
  [randomValue]: Random;
  [localeValue]: DataMockLocale;

  /**
   * @param {DataMockInit=} init The library init options.
   */
  constructor(init: DataMockInit={}) {
    this[typesValue] = new Types(init.seed);
    this[randomValue] = new Random(init.seed);
    this[localeValue] = init.locale || enLocale;
  }

  seed(value?: number): void {
    this[randomValue].seed(value);
    this[typesValue].seed(value);
  }

  /**
   * @param locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale?: DataMockLocale): void {
    this[localeValue] = locale || enLocale;
  }

  /**
   * @param gender Person's gender to get the name from.
   * @returns Randomly picked first name for a person.
   */
  firstName(gender?: Gender): string {
    const { person } = this[localeValue];
    const names = person && person.firstName || enLocale.person!.firstName!;
    const safeGender = gender && genderPool.includes(gender) ? gender : this[randomValue].pickOne(genderPool);
    const pool = names[safeGender];
    return this[randomValue].pickOne(pool);
  }

  /**
   * @param gender Person's gender to get the last name from. It does nothing when the language does not make a distinction between male and female names.
   * @returns Randomly picked last name for a person.
   */
  lastName(gender?: Gender): string {
    const { person } = this[localeValue];
    const names = person && person.lastName || enLocale.person!.lastName!;
    if (Array.isArray(names.general) && names.general.length) {
      return this[randomValue].pickOne(names.general);
    }
    const safeGender = gender && genderPool.includes(gender) ? gender : this[randomValue].pickOne(genderPool);
    const pool = names[safeGender] as string[];
    return this[randomValue].pickOne(pool);
  }

  /**
   * @param gender Person's gender to get the middle name from.
   * @returns Randomly picked middle name for a person.
   */
  middleName(gender?: Gender): string {
    const { person } = this[localeValue];
    const names = person && person.middleName || person && person.firstName || enLocale.person!.firstName!;
    const safeGender: Gender = gender && genderPool.includes(gender) ? gender : this[randomValue].pickOne(genderPool);
    const pool = names[safeGender];
    return this[randomValue].pickOne(pool);
  }

  /**
   * @returns Randomly picked full name of a person.
   */
  name(init: PersonNameInit = {}): string {
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
  gender(binary?: boolean): string {
    const { person } = this[localeValue];
    const info = person && person.gender || enLocale.person!.gender!;
    if (binary) {
      return this[randomValue].pickOne(info.binary);
    }
    return this[randomValue].pickOne(info.pool);
  }

  /**
   * @param gender Person's gender to get the prefix from. It does nothing when the language does not make a distinction between male and female prefixes.
   * @returns Randomly picked prefix for a person.
   */
  prefix(gender?: Gender): string {
    const { person } = this[localeValue];
    const names = person && person.prefix || enLocale.person!.prefix!;
    if (Array.isArray(names.general) && names.general.length) {
      return this[randomValue].pickOne(names.general);
    }
    const safeGender = gender && genderPool.includes(gender) ? gender : this[randomValue].pickOne(genderPool);
    const pool = names[safeGender] as string[];
    return this[randomValue].pickOne(pool);
  }

  /**
   * @param gender Person's gender to get the suffix from. It does nothing when the language does not make a distinction between male and female suffix.
   * @returns Randomly picked suffix for a person.
   */
  suffix(gender?: Gender): string {
    const { person } = this[localeValue];
    const names = person && person.suffix || enLocale.person!.suffix!;
    if (Array.isArray(names.general) && names.general.length) {
      return this[randomValue].pickOne(names.general);
    }
    const safeGender = gender && genderPool.includes(gender) ? gender : this[randomValue].pickOne(genderPool);
    const pool = names[safeGender] as string[];
    return this[randomValue].pickOne(pool);
  }

  /**
   * @return Persons job title
   */
  jobTitle(): string {
    const desc = this.jobDescriptor();
    const area = this.jobArea();
    const type = this.jobType();
    return `${desc} ${area} ${type}`;
  }

  /**
   * @return Persons job descriptor
   */
  jobDescriptor(): string {
    const { person } = this[localeValue];
    const info = person && person.title || enLocale.person!.title!;
    return this[randomValue].pickOne(info.descriptor!);
  }

  /**
   * @return Persons job area
   */
  jobArea(): string {
    const { person } = this[localeValue];
    const info = person && person.title || enLocale.person!.title!;
    return this[randomValue].pickOne(info.level!);
  }

  /**
   * @return Persons job type
   */
  jobType(): string {
    const { person } = this[localeValue];
    const info = person && person.title || enLocale.person!.title! as LocalePersonTitle;
    return this[randomValue].pickOne(info.job || []);
  }
}
