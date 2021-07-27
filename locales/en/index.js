import time from './time/index.js';
import syntax from './syntax/index.js';
import internet from './internet/index.js';
import person from './person/index.js';
import word from './word/index.js';

/** @typedef {import('../../locales/types').DataMockLocale} DataMockLocale */

const locale = /** @type DataMockLocale */ (Object.freeze({
  title: 'English',
  syntax,
  time,
  internet,
  person,
  word,
}));

export default locale;
