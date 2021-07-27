export declare class Random {
  constructor(seed?: number);
  seed(value: number): void;
  /**
   * Picks an number of random elements in a random order from an array.
   * @param source The source array. When not set a hexadecimal string part is used. 
   * @param count The size of the returned set.
   */
  pick<T>(source?: T[], count?: number): T[];

  /**
   * Picks an random element from the source array.
   * 
   * @param source The source array. When not set a hexadecimal string part is used. 
   */
  pickOne<T>(source?: T[]): T;
}
