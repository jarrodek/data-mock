import { TypeBooleanInit, TypeCharacterInit, TypeDateTimeInit, TypeFalsyInit, TypeHashInit, TypeNumberInit } from '../../types.js';
import { MersenneTwister } from './MersenneTwister.js';
import { Random } from './Random.js';

export const randomValue: unique symbol;
export const mtValue: unique symbol;

/**
 * A class that generates different base data types.
 */
export declare class Types {
  [randomValue]: Random;
  [mtValue]: MersenneTwister;

  constructor(seed?: number);
  seed(value: number): void;

  /**
   * Generates a pseudo-random number.
   * @param init When passed a number it generates an integer in a range from [0, init]
   * @returns initA pseudo-random number.
   */
  number(init?: number|TypeNumberInit): number;

  /**
   * Generates a pseudo-random floating point number.
   * @param init When passed a number it generates an float with this precision
   * @returns initA pseudo-random floating point number.
   */
  float(init?: number|TypeNumberInit): number;
  
  /**
   * @param init When passed a number it generates an date in a range from [since 1. Jan 1970 UTC, init]
   * @returns A random date in a range.
   */
  datetime(init?: number|TypeDateTimeInit): Date;

  /**
   * @param size The size of the random string.
   * @param pool The set of characters to use.
   * @returns The generated random string
   */
  string(size?: number, pool?: string): string;

  character(init?: TypeCharacterInit): string;

  /**
   * @returns initGenerates a random UUID v4 (rfc4122) string.
   */
  uuid(): string;

  /**
   * Generates a random hash value.
   */
  hash(init?: TypeHashInit): string;

  /**
   * @param init When number it is the likelihood of receiving a true or false value back. 
   * @returns {boolean} A random boolean value.
   */
  boolean(init?: number|TypeBooleanInit): boolean;

  /**
   * Produces a falsy value.
   */
  falsy(init?: TypeFalsyInit): any;

  /**
   * @param size The size of the generated hexadecimal string
   * @returns initA random hexadecimal string.
   */
  hexaDecimal(size?: number): string;
}
