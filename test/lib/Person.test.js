import { assert } from '@esm-bundle/chai';
import { Person } from '../../index.js';
import en from '../../locales/en/index.js';

describe('Person', () => {
  describe('firstName()', () => {
    /** @type Person */
    let person;

    before(() => {
      person = new Person();
    });

    it('returns a string', () => {
      const result = person.firstName();
      assert.typeOf(result, 'string');
    });

    it('returns a male name', () => {
      const result = person.firstName('male');
      assert.include(en.person.firstName.male, result);
    });

    it('returns a female name', () => {
      const result = person.firstName('female');
      assert.include(en.person.firstName.female, result);
    });

    it('ignores invalid gender value', () => {
      // @ts-ignore
      const result = person.firstName('females');
      assert.typeOf(result, 'string');
    });
  });

  describe('lastName()', () => {
    /** @type Person */
    let person;

    beforeEach(() => {
      person = new Person();
    });

    it('returns a string', () => {
      const result = person.lastName();
      assert.typeOf(result, 'string');
    });

    it('returns a male name', () => {
      person.locale({
        title: 'test',
        person: {
          lastName: {
            male: ['Test'],
          },
        },
      });
      const result = person.lastName('male');
      assert.equal(result, 'Test');
    });

    it('returns a female name', () => {
      person.locale({
        title: 'test',
        person: {
          lastName: {
            female: ['Test'],
          },
        },
      });
      const result = person.lastName('female');
      assert.equal(result, 'Test');
    });

    it('ignores invalid gender value', () => {
      // @ts-ignore
      const result = person.lastName('females');
      assert.typeOf(result, 'string');
    });
  });

  describe('middleName()', () => {
    /** @type Person */
    let person;

    before(() => {
      person = new Person();
    });

    it('returns a string', () => {
      const result = person.middleName();
      assert.typeOf(result, 'string');
    });

    it('returns a male name', () => {
      const result = person.middleName('male');
      assert.include(en.person.firstName.male, result);
    });

    it('returns a female name', () => {
      const result = person.middleName('female');
      assert.include(en.person.firstName.female, result);
    });

    it('ignores invalid gender value', () => {
      // @ts-ignore
      const result = person.middleName('females');
      assert.typeOf(result, 'string');
    });
  });

  describe('name()', () => {
    /** @type Person */
    let person;

    before(() => {
      person = new Person();
    });

    it('returns a string', () => {
      const result = person.name();
      assert.typeOf(result, 'string');
    });

    it('respects the first name', () => {
      const result = person.name({ firstName: 'Pawel' });
      assert.include(result, 'Pawel');
    });

    it('respects the last name', () => {
      const result = person.name({ lastName: 'Uchida-Psztyc' });
      assert.include(result, 'Uchida-Psztyc');
    });
  });

  describe('gender()', () => {
    /** @type Person */
    let person;

    before(() => {
      person = new Person();
    });

    it('returns a string', () => {
      const result = person.gender();
      assert.typeOf(result, 'string');
    });

    it('returns a binary gender', () => {
      const result = person.gender(true);
      assert.include(['Male', 'Female'], result);
    });
  });

  describe('prefix()', () => {
    /** @type Person */
    let person;

    before(() => {
      person = new Person();
    });

    it('returns a string', () => {
      const result = person.prefix();
      assert.typeOf(result, 'string');
    });

    it('returns a general prefix', () => {
      const result = person.prefix();
      assert.include(["Mr.", "Mrs.", "Ms.", "Miss", "Dr."], result);
    });

    it('returns a male prefix', () => {
      person.locale({
        title: 'test',
        person: {
          prefix: {
            male: ['Test'],
          },
        },
      });
      const result = person.prefix('male');
      assert.equal(result, 'Test');
    });

    it('returns a female prefix', () => {
      person.locale({
        title: 'test',
        person: {
          prefix: {
            female: ['Test'],
          },
        },
      });
      const result = person.prefix('female');
      assert.equal(result, 'Test');
    });
  });

  describe('suffix()', () => {
    /** @type Person */
    let person;

    before(() => {
      person = new Person();
    });

    it('returns a string', () => {
      const result = person.suffix();
      assert.typeOf(result, 'string');
    });

    it('returns a general suffix', () => {
      const result = person.suffix();
      assert.include(["Jr.", "Sr.", "I", "II", "III", "IV", "V", "MD", "DDS", "PhD", "DVM"], result);
    });

    it('returns a male suffix', () => {
      person.locale({
        title: 'test',
        person: {
          suffix: {
            male: ['Test'],
          },
        },
      });
      const result = person.suffix('male');
      assert.equal(result, 'Test');
    });

    it('returns a female suffix', () => {
      person.locale({
        title: 'test',
        person: {
          suffix: {
            female: ['Test'],
          },
        },
      });
      const result = person.suffix('female');
      assert.equal(result, 'Test');
    });
  });

  describe('jobDescriptor()', () => {
    /** @type Person */
    let person;

    before(() => {
      person = new Person();
    });

    it('returns a default language value', () => {
      const result = person.jobDescriptor();
      assert.typeOf(result, 'string', 'returns a string');
      assert.include(en.person.title.descriptor, result);
    });

    it('returns a language value', () => {
      person.locale({
        title: 'test',
        person: {
          title: {
            descriptor: ['Test'],
          },
        },
      });
      const result = person.jobDescriptor();
      assert.equal(result, 'Test');
    });
  });

  describe('jobArea()', () => {
    /** @type Person */
    let person;

    before(() => {
      person = new Person();
    });

    it('returns a default language value', () => {
      const result = person.jobArea();
      assert.typeOf(result, 'string', 'returns a string');
      assert.include(en.person.title.level, result);
    });

    it('returns a language value', () => {
      person.locale({
        title: 'test',
        person: {
          title: {
            level: ['Test'],
          },
        },
      });
      const result = person.jobArea();
      assert.equal(result, 'Test');
    });
  });

  describe('jobType()', () => {
    /** @type Person */
    let person;

    before(() => {
      person = new Person();
    });

    it('returns a default language value', () => {
      const result = person.jobType();
      assert.typeOf(result, 'string', 'returns a string');
      assert.include(en.person.title.job, result);
    });

    it('returns a language value', () => {
      person.locale({
        title: 'test',
        person: {
          title: {
            job: ['Test'],
          },
        },
      });
      const result = person.jobType();
      assert.equal(result, 'Test');
    });
  });

  describe('jobTitle()', () => {
    /** @type Person */
    let person;

    before(() => {
      person = new Person();
    });

    it('returns a string value', () => {
      const result = person.jobTitle();
      assert.typeOf(result, 'string', 'returns a string');
    });

    it('returns a language value', () => {
      person.locale({
        title: 'test',
        person: {
          title: {
            descriptor: ['Dynamic'],
            level: ['Marketing'],
            job: ['Director'],
          },
        },
      });
      const result = person.jobTitle();
      assert.equal(result, 'Dynamic Marketing Director');
    });
  });
});
