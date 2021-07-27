import { DataMockLocale } from '../../locales/types.js';
import { DataMockInit, InternetEmailInit, InternetUsernameInit } from '../../types.js';
import { Person } from './Person.js';
import { Random } from './Random.js';
import { Types } from './Types.js';
import { Word } from './Word.js';

export const randomValue: unique symbol;
export const typesValue: unique symbol;
export const localeValue: unique symbol;
export const wordValue: unique symbol;
export const personValue: unique symbol;

/**
 * A library that specializes in generating internet related values.
 */
export declare class Internet {
  [randomValue]: Random;
  [typesValue]: Types;
  [wordValue]: Word;
  [personValue]: Person;
  [localeValue]: DataMockLocale;

  /**
   * @param init The library init options.
   */
  constructor(init?: DataMockInit);
  seed(value: number): void;
  /**
   * @param locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale?: DataMockLocale): void;
  /**
   * @return A random URL for an avatar.
   */
  avatar(): string;

  /**
   * @returns generated user email
   */
  email(init?: InternetEmailInit): string;

  /**
   * @returns Generated email for an example domain.
   */
  exampleEmail(init?: InternetUsernameInit): string;

  /**
   * @returns Generated username.
   */
  userName(init?: InternetUsernameInit): string;

  /**
   * @returns Pick a protocol.
   */
  protocol(): string;

  /**
   * @param withPayload Whether the request can have a payload (body) or not. When not set it returns one of all possible.
   * @returns Pick on of a default HTTP methods.
   */
  httpMethod(withPayload?: boolean): string;

  /** 
   * @returns A random URI.
   */
  uri(): string;

  /** 
   * @returns A random domain.
   */
  domain(): string;

  /** 
   * @returns A random name for a domain.
   */
  domainName(): string;

  /** 
   * @returns A random suffix for a domain.
   */
  domainSuffix(): string;

  /** 
   * @returns A random IP address 
   */
  ip(): string;

  /** 
   * @returns A random v6 IP address 
   */
  ipv6(): string;

  /** 
   * @returns A random port number;
   */
  port(): number;

  color(red?: number, green?: number, blue?: number): string;

  /**
   * @returns A web browser name.
   */
  browser(): string;
}
