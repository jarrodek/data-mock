import { DataMockLocale } from '../../locales/types.js';
import { DataMockInit, TimeHourInit, TimeMinuteInit, TimeMonthInit, TimeMonthNameInit, TimeWeekdayInit, TypeDateTimeInit } from '../../types.js';
import { Types } from './Types.js';

export const typesValue: unique symbol;
export const localeValue: unique symbol;

/**
 * Generates date/time related values.
 */
export declare  class Time {
  [typesValue]: Types;
  [localeValue]: DataMockLocale;

  /**
   * @param init The library init options.
   */
  constructor(init?: DataMockInit);
  seed(value: number): void;
  /**
   * @param init When passed a number it generates an date in a range from [since 1. Jan 1970 UTC, init]
   * @returns A random date in a range.
   */
  date(init?: TypeDateTimeInit): Date;

  /**
   * @returns Randomly selected `am` or `pm` value.
   */
  amPm(): string;

  /**
   * @param init When passed a number it generates an date in a range from [since 1. Jan 1970 UTC, init]
   * @returns A timestamp for the generated date.
   */
  timestamp(init?: TypeDateTimeInit): number;

  /**
   * Note, in 24hr clock the generated value for an hour that is less than 10 will be missing zero in the fist position.
   * @returns The value for an hour. 
   */
  hour(init?: TimeHourInit): number;

  /**
   * Note, the generated value that is less than 10 will be missing zero in the fist position.
   * @returns The value for a minute. 
   */
  minute(init?: TimeMinuteInit): number;

  /**
   * @return Random value for milliseconds.
   */
  millisecond(): number;

  /**
   * @return Random value for seconds.
   */
  second(): number;

  /**
   * @returns The number of the month, 1-based.
   */
  month(init?: TimeMonthInit): number;

  /**
   * @returns Name of the month.
   */
  monthName(init?: TimeMonthNameInit): string;

  /**
   * @param abbr Whether to returns abbreviated values.
   * @returns The list of month names.
   */
  months(abbr?: boolean): string[];

  /**
   * @param abbr Whether to returns abbreviated values.
   * @returns The list of week day names.
   */
  weekdays(abbr?: boolean): string[];

  /**
   * @returns The number of the weekday, 1-based.
   */
  weekday(init?: TimeWeekdayInit): number;

  /**
   * @returns The name of the weekday. Note, `en` locale starts the week on Monday.
   */
  weekdayName(init?: TimeMonthNameInit): string;
}
