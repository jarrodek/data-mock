import { DataMockInit, HarTiming, HarTimingInit } from '../../types.js';
import { Types } from './Types.js';

export const typesValue: unique symbol;

/**
 * Generates data related to the HAR specification.
 */
export declare class Har {
  [typesValue]: Types;

  /**
   * @param init The library init options.
   */
  constructor(init?: DataMockInit);

  /**
   * Generates random HAR timing object.
   */
  timing(init?: HarTimingInit): HarTiming;
}
