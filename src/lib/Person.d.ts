import { DataMockLocale } from '../../locales/types';
import { DataMockInit, Gender, PersonNameInit } from '../../types';
import { Random } from './Random';
import { Types } from './Types';

export const randomValue: unique symbol;
export const typesValue: unique symbol;
export const localeValue: unique symbol;

export declare class Person {
  [randomValue]: Random;
  [typesValue]: Types;
  [localeValue]: DataMockLocale;

  /**
   * @param init The library init options.
   */
  constructor(init?: DataMockInit);
  seed(value: number): void;
  /**
   * @param locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale?: DataMockLocale): void;

  /**
   * @param gender Person's gender to get the name from.
   * @returns Randomly picked first name for a person.
   */
  firstName(gender?: Gender): string;

  /**
   * @param gender Person's gender to get the last name from. It does nothing when the language does not make a distinction between male and female names.
   * @returns Randomly picked last name for a person.
   */
  lastName(gender?: Gender): string;

  /**
   * @param gender Person's gender to get the middle name from.
   * @returns Randomly picked middle name for a person.
   */
  middleName(gender?: Gender): string;

  /**
   * @returns Randomly picked full name of a person.
   */
  name(init?: PersonNameInit): string;

  /**
   * @param binary Whether to pick from the two main genders.
   */
  gender(binary?: boolean): string;

  /**
   * @param gender Person's gender to get the prefix from. It does nothing when the language does not make a distinction between male and female prefixes.
   * @returns Randomly picked prefix for a person.
   */
  prefix(gender?: Gender): string;

  /**
   * @param gender Person's gender to get the suffix from. It does nothing when the language does not make a distinction between male and female suffix.
   * @returns Randomly picked suffix for a person.
   */
  suffix(gender?: Gender): string;

  /**
   * @return Persons job title
   */
  jobTitle(): string;

  /**
   * @return Persons job descriptor
   */
  jobDescriptor(): string;

  /**
   * @return Persons job area
   */
  jobArea(): string;

  /**
   * @return Persons job type
   */
  jobType(): string;
}
