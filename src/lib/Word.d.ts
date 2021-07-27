import { DataMockLocale } from '../../locales/types.js';
import { DataMockInit } from '../../types.js';

/**
 * A library that specializes in picking words from locale dictionary.
 */
export class Word {
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
   * @param size The length of the word. When not found it uses the whole pool defined in the lang dictionary.
   * @returns A randomly picked adjective.
   */
  adjective(size?: number): string;

  /**
   * @param size The length of the word. When not found it uses the whole pool defined in the lang dictionary.
   * @returns A randomly picked adverb.
   */
  adverb(size?: number): string;

  /**
   * @param size The length of the word. When not found it uses the whole pool defined in the lang dictionary.
   * @returns A randomly picked conjunction.
   */
  conjunction(size?: number): string;

  /**
   * @param size The length of the word. When not found it uses the whole pool defined in the lang dictionary.
   * @returns A randomly picked interjection.
   */
  interjection(size?: number): string;

  /**
   * @param size The length of the word. When not found it uses the whole pool defined in the lang dictionary.
   * @returns A randomly picked noun.
   */
  noun(size?: number): string;

  /**
   * @param size The length of the word. When not found it uses the whole pool defined in the lang dictionary.
   * @returns A randomly picked preposition.
   */
  preposition(size?: number): string;

  /**
   * @param size The length of the word. When not found it uses the whole pool defined in the lang dictionary.
   * @returns A randomly picked verb.
   */
  verb(size?: number): string;
}
