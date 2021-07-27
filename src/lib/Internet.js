import { Types } from './Types.js';
import { Random } from './Random.js';
import enLocale from '../../locales/en/index.js';
import { Person } from './Person.js';
import { HEX_POOL, slug } from './Utils.js';
import { Word } from './Word.js';

/** @typedef {import('../../types').DataMockInit} DataMockInit */
/** @typedef {import('../../types').InternetEmailInit} InternetEmailInit */
/** @typedef {import('../../types').InternetUsernameInit} InternetUsernameInit */
/** @typedef {import('../../locales/types').DataMockLocale} DataMockLocale */

export const randomValue = Symbol('randomValue');
export const typesValue = Symbol('typesValue');
export const localeValue = Symbol('localeValue');
export const wordValue = Symbol('wordValue');
export const personValue = Symbol('personValue');

/**
 * A library that specializes in generating internet related values.
 */
export class Internet {
  // #types;

  // #locale;

  // #person;

  // #random;

  // #word;

  /**
   * @param {DataMockInit=} init The library init options.
   */
  constructor(init={}) {
    // this.#types = new Types(init.seed);
    // this.#random = new Random(init.seed);
    // this.#person = new Person(init);
    // this.#word = new Word(init);
    // this.#locale = init.locale || enLocale;
    this[typesValue] = new Types(init.seed);
    this[randomValue] = new Random(init.seed);
    this[personValue] = new Person(init);
    this[wordValue] = new Word(init);
    this[localeValue] = init.locale || enLocale;
  }

  /**
   * @param {number=} value
   */
  seed(value) {
    this[randomValue].seed(value);
    this[typesValue].seed(value);
    this[personValue].seed(value);
    this[wordValue].seed(value);
  }

  /**
   * @param {DataMockLocale=} locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale) {
    this[localeValue] = locale || enLocale;
    this[personValue].locale(locale);
    this[wordValue].locale(locale);
  }

  /**
   * @return {string} A random URL for an avatar.
   */
  avatar() {
    const pool = this[localeValue].internet && this[localeValue].internet.avatar || enLocale.internet.avatar;
    const pic = this[randomValue].pickOne(pool);
    return `https://cdn.fakercloud.com/avatars/${pic}`;
  }

  /**
   * @param {InternetEmailInit=} [init={}]
   * @returns {string} generated user email
   */
  email(init={}) {
    const pool = this[localeValue].internet && this[localeValue].internet.email.free || enLocale.internet.email.free;
    const provider = init.provider || this[randomValue].pickOne(pool);
    const username = this.userName(init);
    const result = `${username}@${provider}`;
    return slug(result);
  }

  /**
   * @param {InternetUsernameInit=} [init={}]
   * @returns {string} Generated email for an example domain.
   */
  exampleEmail(init={}) {
    const pool = this[localeValue].internet && this[localeValue].internet.email.example || enLocale.internet.email.example;
    const provider = this[randomValue].pickOne(pool);
    return this.email({ ...init, provider });
  }

  /**
   * @param {InternetUsernameInit=} [init={}]
   * @returns {string} Generated username.
   */
  userName(init={}) {
    const { firstName=this[personValue].firstName(), lastName=this[personValue].lastName() } = init;
    let result;
    switch (this[typesValue].number(2)) {
      case 0:
        result = firstName + this[typesValue].number(99);
        break;
      case 1:
        result = firstName + this[randomValue].pickOne([".", "_"]) + lastName;
        break;
      case 2:
        result = firstName + this[randomValue].pickOne([".", "_"]) + lastName + this[typesValue].number(99);
        break;
      default: 
    }
    result = result.toString().replace(/'/g, "");
    result = result.replace(/ /g, "");
    return result;
  }

  /**
   * @returns {string} Pick a protocol.
   */
  protocol() {
    const pool = ['http','https'];
    return this[randomValue].pickOne(pool);
  }

  /**
   * @param {boolean=} withPayload Whether the request can have a payload (body) or not. When not set it returns one of all possible.
   * @returns {string} Pick on of a default HTTP methods.
   */
  httpMethod(withPayload) {
    const payload = ['POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];
    const nonPayload = ['GET', 'HEAD'];
    if (typeof withPayload === 'boolean') {
      const pool = withPayload ? payload : nonPayload;
      return this[randomValue].pickOne(pool);
    }
    return this[randomValue].pickOne(payload.concat(nonPayload));
  }

  /** 
   * @returns {string} A random URI.
   */
  uri() {
    const protocol = this.protocol();
    const domain = this.domain();
    return `${protocol}://${domain}`;
  }

  /** 
   * @returns {string} A random domain.
   */
  domain() {
    const name = this.domainName();
    const suffix = this.domainSuffix();
    return `${name}.${suffix}`;
  }

  /** 
   * @returns {string} A random name for a domain.
   */
  domainName() {
    const adjective = this[wordValue].adjective();
    const noun = this[wordValue].noun();
    const name = `${adjective}-${noun}`;
    return name.replace(/([\\~#&*{}/:<>?|"'])/ig, '').toLowerCase();
  }

  /** 
   * @returns {string} A random suffix for a domain.
   */
  domainSuffix() {
    const pool = this[localeValue].internet.domain.suffix || enLocale.internet.domain.suffix;
    return this[randomValue].pickOne(pool);
  }

  /** 
   * @returns {string} A random IP address 
   */
  ip() {
    const randNum = () => (this[typesValue].number(255)).toFixed(0);
    const result = [];
    for (let i = 0; i < 4; i++) {
      result[i] = randNum();
    }
    return result.join('.');
  }

  /** 
   * @returns {string} A random v6 IP address 
   */
  ipv6() {
    const pool = HEX_POOL.split('');
    const randHash = () => (this[randomValue].pick(pool, 4).join(''));
    const result = [];
    for (let i = 0; i < 8; i++) {
      result[i] = randHash();
    }
    return result.join(':');
  }

  /** 
   * @returns {number} A random port number;
   */
  port() {
    return this[typesValue].number({ min: 0, max: 65535 });
  }

  /** 
   * @param {number=} red
   * @param {number=} green
   * @param {number=} blue
   */
  color(red=0, green=0, blue=0) {
    // based on awesome response: http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
    const redValue = Math.floor((this[typesValue].number(256) + red) / 2);
    const greenValue = Math.floor((this[typesValue].number(256) + green) / 2);
    const blueValue = Math.floor((this[typesValue].number(256) + blue) / 2);
    let redStr = redValue.toString(16);
    if (redStr.length === 1) {
      redStr = `0${redStr}`;
    }
    let greenStr = greenValue.toString(16);
    if (greenStr.length === 1) {
      greenStr = `0${greenStr}`;
    }
    let blueStr = blueValue.toString(16);
    if (blueStr.length === 1) {
      blueStr = `0${blueStr}`;
    }
    return `#${redStr}${greenStr}${blueStr}`;
  }

  /**
   * @returns {string} A web browser name.
   */
  browser() {
    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Internet Explorer', 'Opera', 'SeaMonkey'];
    return this[randomValue].pickOne(browsers);
  }
}
