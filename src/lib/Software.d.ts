import { DataMockInit, TypeVersionInit } from "../../types.js";
import { Random } from "./Random.js";
import { Types } from "./Types.js";

export const typesValue: unique symbol;
export const randomValue: unique symbol;

export declare class Software {
  [typesValue]: Types;
  [randomValue]: Random;

  /**
   * @param init The library init options.
   */
  constructor(init?: DataMockInit);
  seed(value?: number): void;

  /**
   * @returns The version name.
   */
  version(init?: TypeVersionInit): string;

  /**
   * @returns Semantic versioning version name.
   */
  symVersion(init?: TypeVersionInit): string;

  /**
   * @returns Major and minor only version name.
   */
  majorMinorVersion(init?: TypeVersionInit): string;

  /**
   * @returns Major only version name.
   */
  majorVersion(init?: TypeVersionInit): string;

  /**
   * @returns The pre-release version name.
   */
  preVersion(init?: TypeVersionInit): string;
}
