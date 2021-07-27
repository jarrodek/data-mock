import { Random } from "./Random.js";
import { Types } from "./Types.js";

/** @typedef {import('../../types').DataMockInit} DataMockInit */
/** @typedef {import('../../types').TypeVersionInit} TypeVersionInit */

export const typesValue = Symbol('typesValue');
export const randomValue = Symbol('randomValue');

export class Software {
  /**
   * @param {DataMockInit=} init The library init options.
   */
  constructor(init={}) {
    // this.#types = new Types(init.seed);
    this[typesValue] = new Types(init.seed);
    this[randomValue] = new Random(init.seed);
  }

  /**
   * @param {number=} value
   */
  seed(value) {
    this[typesValue].seed(value);
    this[randomValue].seed(value);
  }

  /**
   * @param {TypeVersionInit} [init={}]
   * @returns {string} The version name.
   */
  version(init={}) {
    const { format='symVer' } = init;
    switch (format) {
      case 'symVer': return this.symVersion(init);
      case 'major': return this.majorVersion(init);
      case 'majorMinor': return this.majorMinorVersion(init);
      default: throw new RangeError(`Invalid version format: ${format}`);
    }
  }

  /**
   * @param {TypeVersionInit} [init={}]
   * @returns {string} Semantic versioning version name.
   */
  symVersion(init = {}) {
    const { patch={} } = init;
    const result = this.majorMinorVersion(init);
    /** @type number */
    let patchValue;
    if (typeof patch === 'number') {
      patchValue = patch;
    } else {
      const { min=0, max=100 } = patch;
      patchValue = this[typesValue].number({ min, max });
    }
    return `${result}.${patchValue}`;
  }

  /**
   * @param {TypeVersionInit} [init={}]
   * @returns {string} Major and minor only version name.
   */
  majorMinorVersion(init = {}) {
    const { minor={} } = init;
    /** @type number */
    let minorValue;
    if (typeof minor === 'number') {
      minorValue = minor;
    } else {
      const { min=0, max=100 } = minor;
      minorValue = this[typesValue].number({ min, max });
    }
    const major = this.majorVersion(init);
    return `${major}.${minorValue}`;
  }

  /**
   * @param {TypeVersionInit} [init={}]
   * @returns {string} Major only version name.
   */
  majorVersion(init = {}) {
    const { major={} } = init;
    /** @type number */
    let majorValue;
    if (typeof major === 'number') {
      majorValue = major;
    } else {
      const { min=0, max=100 } = major;
      majorValue = this[typesValue].number({ min, max });
    }
    return `${majorValue}`;
  }

  /**
   * @param {TypeVersionInit} [init={}]
   * @returns {string} The pre-release version name.
   */
  preVersion(init={}) {
    const version = this.version(init);
    const suffixes = ['pre', 'alpha', 'beta', 'dev'];
    const suffix = this[randomValue].pickOne(suffixes);
    return `${version}-${suffix}`;
  }
}
