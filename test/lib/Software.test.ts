// eslint-disable-next-line import/no-unresolved
import { assert } from '@esm-bundle/chai';
import { Software } from '../../src/lib/Software.js';

describe('Software()', () => {
  describe('version()', () => {
    let software: Software;

    before(() => {
      software = new Software();
    });

    it('returns a string', () => {
      const result = software.version();
      assert.typeOf(result, 'string');
    });

    it('returns a default semVer version', () => {
      const result = software.version();
      const parts = result.split('.');
      assert.lengthOf(parts, 3, 'has major, minor, and patch parts');
      const major = Number(parts[0]);
      const minor = Number(parts[1]);
      const patch = Number(parts[2]);
      assert.isFalse(Number.isNaN(major), 'major is a number');
      assert.isFalse(Number.isNaN(minor), 'minor is a number');
      assert.isFalse(Number.isNaN(patch), 'patch is a number');
      assert.isAbove(major, -1, 'major is >= 0');
      assert.isBelow(major, 101, 'major is <= 100');
      assert.isAbove(minor, -1, 'minor is >= 0');
      assert.isBelow(minor, 101, 'minor is <= 100');
      assert.isAbove(patch, -1, 'patch is >= 0');
      assert.isBelow(patch, 101, 'patch is <= 100');
    });

    it('returns a major version only', () => {
      const result = software.version({ format: 'major' });
      const parts = result.split('.');
      assert.lengthOf(parts, 1, 'has major part only');
      const major = Number(result);
      assert.isFalse(Number.isNaN(major), 'major is a number');
      assert.isAbove(major, -1, 'major is >= 0');
      assert.isBelow(major, 101, 'major is <= 100');
    });

    it('returns a major and minor only version', () => {
      const result = software.version({ format: 'majorMinor' });
      const parts = result.split('.');
      assert.lengthOf(parts, 2, 'has major and minor parts');
      const major = Number(parts[0]);
      const minor = Number(parts[1]);
      assert.isFalse(Number.isNaN(major), 'major is a number');
      assert.isFalse(Number.isNaN(minor), 'minor is a number');
      assert.isAbove(major, -1, 'major is >= 0');
      assert.isBelow(major, 101, 'major is <= 100');
      assert.isAbove(minor, -1, 'minor is >= 0');
      assert.isBelow(minor, 101, 'minor is <= 100');
    });

    it('throws for unknown format', () => {
      assert.throws(() => {
        // @ts-ignore
        software.version({ format: 'other' });
      });
    });
  });

  describe('majorVersion()', () => {
    let software: Software;

    before(() => {
      software = new Software();
    });

    it('returns a string', () => {
      const result = software.majorVersion();
      assert.typeOf(result, 'string');
    });

    it('returns the passed version', () => {
      const result = software.majorVersion({ major: 100 });
      assert.equal(result, '100');
    });

    it('respects the min value', () => {
      let min = Number.POSITIVE_INFINITY;
      for (let i = 0; i < 50; i++) {
        const result = Number(software.majorVersion({ major: { min: 25 } }));
        if (result < min) {
          min = result;
        }
      }
      assert.isAbove(min, 24);
    });

    it('respects the max value', () => {
      let max = Number.NEGATIVE_INFINITY;
      for (let i = 0; i < 50; i++) {
        const result = Number(software.majorVersion({ major: { max: 25 } }));
        if (result > max) {
          max = result;
        }
      }
      assert.isBelow(max, 26);
    });
  });

  describe('majorMinorVersion()', () => {
    let software: Software;

    before(() => {
      software = new Software();
    });

    it('returns a string with 2 versions', () => {
      const result = software.majorMinorVersion();
      assert.typeOf(result, 'string');
      const parts = result.split('.');
      assert.lengthOf(parts, 2, 'has 2 version');
    });

    it('returns the passed major version', () => {
      const result = software.majorMinorVersion({ major: 100 });
      assert.equal(result.split('.')[0], '100');
    });

    it('returns the passed minor version', () => {
      const result = software.majorMinorVersion({ minor: 100 });
      assert.equal(result.split('.')[1], '100');
    });

    it('respects the minor min value', () => {
      let min = Number.POSITIVE_INFINITY;
      for (let i = 0; i < 50; i++) {
        const version = software.majorMinorVersion({ minor: { min: 25 } });
        const result = Number(version.split('.')[1]);
        if (result < min) {
          min = result;
        }
      }
      assert.isAbove(min, 24);
    });

    it('respects the minor max value', () => {
      let max = Number.NEGATIVE_INFINITY;
      for (let i = 0; i < 50; i++) {
        const version = software.majorMinorVersion({ minor: { max: 25 } });
        const result = Number(version.split('.')[1]);
        if (result > max) {
          max = result;
        }
      }
      assert.isBelow(max, 26);
    });
  });

  describe('symVersion()', () => {
    let software: Software;

    before(() => {
      software = new Software();
    });

    it('returns a string with 3 versions', () => {
      const result = software.symVersion();
      assert.typeOf(result, 'string');
      const parts = result.split('.');
      assert.lengthOf(parts, 3, 'has 3 version');
    });

    it('returns the passed major version', () => {
      const result = software.symVersion({ major: 100 });
      assert.equal(result.split('.')[0], '100');
    });

    it('returns the passed minor version', () => {
      const result = software.symVersion({ minor: 100 });
      assert.equal(result.split('.')[1], '100');
    });

    it('returns the passed patch version', () => {
      const result = software.symVersion({ patch: 100 });
      assert.equal(result.split('.')[2], '100');
    });

    it('respects the patch min value', () => {
      let min = Number.POSITIVE_INFINITY;
      for (let i = 0; i < 50; i++) {
        const version = software.symVersion({ patch: { min: 25 } });
        const result = Number(version.split('.')[2]);
        if (result < min) {
          min = result;
        }
      }
      assert.isAbove(min, 24);
    });

    it('respects the patch max value', () => {
      let max = Number.NEGATIVE_INFINITY;
      for (let i = 0; i < 50; i++) {
        const version = software.symVersion({ patch: { max: 25 } });
        const result = Number(version.split('.')[2]);
        if (result > max) {
          max = result;
        }
      }
      assert.isBelow(max, 26);
    });
  });

  describe('preVersion()', () => {
    let software: Software;

    before(() => {
      software = new Software();
    });

    it('returns a string with 3 versions', () => {
      const result = software.preVersion();
      assert.typeOf(result, 'string');
      const parts = result.split('.');
      assert.lengthOf(parts, 3, 'has 3 version');
    });

    it('has the pre-release suffix', () => {
      const result = software.preVersion();
      const suffix = result.split('-')[1];
      assert.include(['pre', 'alpha', 'beta', 'dev'], suffix);
    });
  });
});
