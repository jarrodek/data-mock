import { assert } from '@esm-bundle/chai';
import { Word } from '../../src/lib/Word.js';
import en from '../../locales/en/index.js';

describe('Word', () => {
  describe('adjective()', () => {
    /** @type Word */
    let word;

    beforeEach(() => {
      word = new Word();
    });

    it('returns a string', () => {
      const result = word.adjective();
      assert.typeOf(result, 'string');
    });

    it('returns a default language value', () => {
      const result = word.adjective();
      assert.include(en.word.adjective, result);
    });

    it('returns a language value', () => {
      word.locale({
        title: 'test',
        word: {
          adjective: ['Test'],
        }
      });
      const result = word.adjective();
      assert.equal(result, 'Test');
    });

    it('fallbacks to the default when language does not support', () => {
      word.locale({
        title: 'test',
        word: {
        }
      });
      const result = word.adjective();
      assert.include(en.word.adjective, result);
    });

    it('returns a word with a size', () => {
      const result = word.adjective(6);
      assert.lengthOf(result, 6);
    });
  });

  describe('adverb()', () => {
    /** @type Word */
    let word;

    beforeEach(() => {
      word = new Word();
    });

    it('returns a string', () => {
      const result = word.adverb();
      assert.typeOf(result, 'string');
    });

    it('returns a default language value', () => {
      const result = word.adverb();
      assert.include(en.word.adverb, result);
    });

    it('returns a language value', () => {
      word.locale({
        title: 'test',
        word: {
          adverb: ['Test'],
        }
      });
      const result = word.adverb();
      assert.equal(result, 'Test');
    });

    it('fallbacks to the default when language does not support', () => {
      word.locale({
        title: 'test',
        word: {
        }
      });
      const result = word.adverb();
      assert.include(en.word.adverb, result);
    });

    it('returns a word with a size', () => {
      const result = word.adverb(6);
      assert.lengthOf(result, 6);
    });
  });

  describe('conjunction()', () => {
    /** @type Word */
    let word;

    beforeEach(() => {
      word = new Word();
    });

    it('returns a string', () => {
      const result = word.conjunction();
      assert.typeOf(result, 'string');
    });

    it('returns a default language value', () => {
      const result = word.conjunction();
      assert.include(en.word.conjunction, result);
    });

    it('returns a language value', () => {
      word.locale({
        title: 'test',
        word: {
          conjunction: ['Test'],
        }
      });
      const result = word.conjunction();
      assert.equal(result, 'Test');
    });

    it('fallbacks to the default when language does not support', () => {
      word.locale({
        title: 'test',
        word: {
        }
      });
      const result = word.conjunction();
      assert.include(en.word.conjunction, result);
    });

    it('returns a word with a size', () => {
      const result = word.conjunction(6);
      assert.lengthOf(result, 6);
    });
  });

  describe('interjection()', () => {
    /** @type Word */
    let word;

    beforeEach(() => {
      word = new Word();
    });

    it('returns a string', () => {
      const result = word.interjection();
      assert.typeOf(result, 'string');
    });

    it('returns a default language value', () => {
      const result = word.interjection();
      assert.include(en.word.interjection, result);
    });

    it('returns a language value', () => {
      word.locale({
        title: 'test',
        word: {
          interjection: ['Test'],
        }
      });
      const result = word.interjection();
      assert.equal(result, 'Test');
    });

    it('fallbacks to the default when language does not support', () => {
      word.locale({
        title: 'test',
        word: {
        }
      });
      const result = word.interjection();
      assert.include(en.word.interjection, result);
    });

    it('returns a word with a size', () => {
      const result = word.interjection(6);
      assert.lengthOf(result, 6);
    });
  });

  describe('noun()', () => {
    /** @type Word */
    let word;

    beforeEach(() => {
      word = new Word();
    });

    it('returns a string', () => {
      const result = word.noun();
      assert.typeOf(result, 'string');
    });

    it('returns a default language value', () => {
      const result = word.noun();
      assert.include(en.word.noun, result);
    });

    it('returns a language value', () => {
      word.locale({
        title: 'test',
        word: {
          noun: ['Test'],
        }
      });
      const result = word.noun();
      assert.equal(result, 'Test');
    });

    it('fallbacks to the default when language does not support', () => {
      word.locale({
        title: 'test',
        word: {
        }
      });
      const result = word.noun();
      assert.include(en.word.noun, result);
    });

    it('returns a word with a size', () => {
      const result = word.noun(6);
      assert.lengthOf(result, 6);
    });
  });

  describe('preposition()', () => {
    /** @type Word */
    let word;

    beforeEach(() => {
      word = new Word();
    });

    it('returns a string', () => {
      const result = word.preposition();
      assert.typeOf(result, 'string');
    });

    it('returns a default language value', () => {
      const result = word.preposition();
      assert.include(en.word.preposition, result);
    });

    it('returns a language value', () => {
      word.locale({
        title: 'test',
        word: {
          preposition: ['Test'],
        }
      });
      const result = word.preposition();
      assert.equal(result, 'Test');
    });

    it('fallbacks to the default when language does not support', () => {
      word.locale({
        title: 'test',
        word: {
        }
      });
      const result = word.preposition();
      assert.include(en.word.preposition, result);
    });

    it('returns a word with a size', () => {
      const result = word.preposition(6);
      assert.lengthOf(result, 6);
    });
  });

  describe('verb()', () => {
    /** @type Word */
    let word;

    beforeEach(() => {
      word = new Word();
    });

    it('returns a string', () => {
      const result = word.verb();
      assert.typeOf(result, 'string');
    });

    it('returns a default language value', () => {
      const result = word.verb();
      assert.include(en.word.verb, result);
    });

    it('returns a language value', () => {
      word.locale({
        title: 'test',
        word: {
          verb: ['Test'],
        }
      });
      const result = word.verb();
      assert.equal(result, 'Test');
    });

    it('fallbacks to the default when language does not support', () => {
      word.locale({
        title: 'test',
        word: {
        }
      });
      const result = word.verb();
      assert.include(en.word.verb, result);
    });

    it('returns a word with a size', () => {
      const result = word.verb(6);
      assert.lengthOf(result, 6);
    });
  });
});
