import { Browser, Creator } from 'har-format';
import { DataMockLocale } from '../../locales/types.js';
import { DataMockInit, HarTiming, HarTimingInit } from '../../types.js';
import { Internet } from './Internet.js';
import { Lorem } from './Lorem.js';
import { Random } from './Random.js';
import { Software } from './Software.js';
import { Time } from './Time.js';
import { Types } from './Types.js';

export const typesValue: unique symbol;
export const randomValue: unique symbol;
export const loremValue: unique symbol;
export const internetValue: unique symbol;
export const timeValue: unique symbol;
export const softwareValue: unique symbol;

/**
 * Generates data related to the HAR specification.
 */
export declare class Har {
  [typesValue]: Types;
  [randomValue]: Random;
  [loremValue]: Lorem;
  [internetValue]: Internet;
  [timeValue]: Time;
  [softwareValue]: Software;

  seed(value?: number): void;
  /**
   * @param locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale?: DataMockLocale): void;

  /**
   * @param init The library init options.
   */
  constructor(init?: DataMockInit);

  /**
   * Generates random HAR timing object.
   */
  timing(init?: HarTimingInit): HarTiming;

  /**
   * @return The version of the HAR spec.
   */
  version(): string;

  /**
   * @returns the HAR's creator info.
   */
  creator(): Creator;

  /**
   * @returns the HAR's browser info.
   */
  browser(): Browser;
}
