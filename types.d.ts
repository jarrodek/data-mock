import { DataMockLocale } from "./locales/types";

export interface DataMockInit {
  /**
   * The locale to use. By default it loads the `en` locale.
   */
  locale?: DataMockLocale;
  seed?: number;
}

export interface TypeNumberInit {
  /**
   * The minimal value to generate (inclusive).
   */
  min?: number;
  /**
   * The maximal value to generate (inclusive).
   */
  max?: number;
  /**
   * The precision of the generated number.
   */
  precision?: number;
}

export interface TypeDateTimeInit {
  /**
   * The minimal timestamp to generate (inclusive).
   */
  min?: number;
  /**
   * The maximal timestamp to generate (inclusive).
   */
  max?: number;
}

export interface TypeBooleanInit {
  /**
   * The likelihood of receiving a true or false value back.
   */
  likelihood?: number;
}

export interface TypeFalsyInit {
  /**
   * The pool of falsy values to pick from.
   */
  pool?: any[];
}

export interface TypeCharacterInit {
  /**
   * The casing of the character.
   */
  casing?: 'lower' | 'upper';
  /**
   * The pool of characters to pick from. When set it ignores `alpha`, `numeric`, and `symbols`.
   */
  pool?: string;
  /**
   * Whether to include alpha characters in the pool.
   */
  alpha?: boolean;
  /**
   * Whether to include numeric characters in the pool.
   */
  numeric?: boolean;
  /**
   * Whether to include symbol characters in the pool.
   */
  symbols?: boolean;
}

export interface TypeHashInit {
  /**
   * The casing of the character.
   */
  casing?: 'lower' | 'upper';
  /**
   * The number of characters in the hash.
   */
  length?: number;
}

export interface LoremSyllableInit {
  /**
   * The number of characters in the word.
   */
  length?: number;
  /**
   * Whether to capitalize the text.
   */
  capitalize?: boolean;
}

export interface LoremWordInit extends LoremSyllableInit {
  /**
   * The number of syllables in the word.
   * Cannot be combined with `length`.
   */
  syllables?: number;
}

export interface LoremSentenceInit {
  /**
   * The number of words in the sentence.
   */
  words?: number;
  /**
   * The punctuation mark at the end of the sentence.
   * When set to `false` it does not add the punctuation mark.
   */
  punctuation?: string | boolean;
}

export interface LoremSentencesInit {
  /**
   * The number of sentences in the result.
   */
  size?: number;
}

export interface LoremParagraphInit {
  /**
   * The number of sentences in the result.
   */
  sentences?: number;
  /**
   * Whether to separate the sentences with a line break or a space.
   * Default to space.
   */
  lineBreak?: boolean;
}

export interface LoremParagraphsInit {
  /**
   * The number of paragraph in the result.
   */
  size?: number;
  /**
   * The separator to use. Default to `\r\n`.
   */
  separator?: string;
}

export interface TimeHourInit {
  /**
   * Whether to use 24hr clock.
   */
  twentyFour?: boolean;
  /**
   * The minimum hour
   */
  min?: number;
  /**
   * The maximum hour
   */
  max?: number;
}

export interface TimeMinuteInit {
  /**
   * The minimum minute
   */
  min?: number;
  /**
   * The maximum minute
   */
  max?: number;
}

export interface TimeMonthInit {
  /**
   * The minimum month, 1-based [1, 12]
   */
  min?: number;
  /**
   * The maximum month, 1-based [1, 12]
   */
  max?: number;
}

export interface TimeMonthNameInit extends TimeMonthInit {
  /**
   * Whether to returns abbreviation rather than the full name.
   */
  abbr?: boolean;
}

export interface TimeWeekdayInit {
  /**
   * The minimum day, 1-based [1, 7]
   */
  min?: number;
  /**
   * The maximum day, 1-based [1, 7]
   */
  max?: number;
}

export interface TimeWeekdayNameInit extends TimeWeekdayInit {
  /**
   * Whether to returns abbreviation rather than the full name.
   */
  abbr?: boolean;
}

export interface InternetUsernameInit extends PersonName {

}

export interface InternetEmailInit extends InternetUsernameInit {

  /**
   * Provider name.
   */
  provider?: string;
}

export interface PersonName {
  /**
   * User's first name
   */
  firstName?: string;
  /**
   * User's last name
   */
  lastName?: string;
}

export interface PersonNameInit extends PersonName {
  gender?: Gender;
}

export type Gender = 'male' | 'female';

export interface HttpPayloadInit {
  /**
   * If set the request will not have payload
   */
  noPayload?: boolean;
  /**
   * The request will always have a payload. The `noPayload` property takes precedence over this setting.
   */
  force?: boolean;
}

export interface HttpOperationInit {
  /**
   * The list of operations to list from.
   */
  pool?: string[];
  /**
   * When set it will pick operation name from the pool of operations that can carry a payload or not.
   * When not sat at all it will pick a random operation.
   */
  withPayload?: boolean;
  /**
   * When set it returns this value as the operation name (HTTP method).
   */
  operation?: string;
}

export interface HttpHeadersInit { 
  /**
   * THe pool of header names to use.
   */
  pool?: string[];
  /**
   * The number of headers to generate. Do not mix with `min` and `max`.
   */
  length?: number;
  /**
   * The minimal number of headers.
   * @default 0
   */
  min?: number;
  /**
   * The maximum number of headers.
   * @default 10
   */
  max?: number;
  /**
   * The content type value to add.
   */
  mime?: string;
  /**
   * The name of the headers group to include.
   */
  group?: 'general' | 'caching' | 'conditional' | 'content' | 'cookies' | 'cors';
  /**
   * The list of headers may contain a header with the generated multiple values. Each value counts towards the size limit.
   * When this is set this generates the unique number of headers with single values.
   * This does not apply to some content related headers which always have single values.
   */
  noMulti?: boolean;
}

export interface HttpRequestInit {
  headers?: HttpHeadersInit;
  payload?: HttpPayloadInit;
  method?: HttpOperationInit;
}

export interface HttpRequest {
  /**
   * The generated request URL.
   */
  url: string;
  /**
   * The generated request method.
   */
  method: string;
  /**
   * The generated list of HTTP headers.
   */
  headers?: string;
  /**
   * The generated request message.
   */
  payload?: string;
}

export interface HarTiming {
  blocked: number;
  connect: number;
  receive: number;
  send: number;
  wait: number;
  dns: number;
  ssl?: number;
}

export interface HarTimingInit {
  ssl?: boolean;
}
