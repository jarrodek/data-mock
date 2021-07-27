import { DataMockLocale } from '../../locales/types.js';
import { DataMockInit, LoremParagraphInit, LoremParagraphsInit, LoremSentenceInit, LoremSentencesInit, LoremSyllableInit, LoremWordInit } from '../../types.js';

/**
 * A library that specializes in generating string values.
 */
export declare class Lorem {
  /**
   * @param init The library init options.
   */
  constructor(init?: DataMockInit);
  seed(value: number): void;

  /**
   * @param locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale?: DataMockLocale): void;

  word(init?: LoremWordInit): string;

  /**
   * @param input The word to capitalize.
   * @returns Capitalized word.
   */
  capitalize(input: string): string;

  /**
   * @returns A space separated list of words.
   */
  words(length?: number): string;

  /**
   * @returns A sentence of words separated with a space.
   */
  sentence(init?: LoremSentenceInit): string;

  /** 
   * @returns Generates sentences.
   */
  sentences(init?: LoremSentencesInit|number): string;

  /** 
   * @param count The number of words in the slug.
   * @returns {string}
   */
  slug(count?: number): string;

  /** 
   * @param init When number then it is a number of sentences in the paragraph.
   * @returns A paragraph of sentences.
   */
  paragraph(init?: LoremParagraphInit|number): string;

  /** 
   * @returns A number of paragraphs.
   */
  paragraphs(init?: LoremParagraphsInit): string;

  /**
   * @returns A syllable or a number of syllables.
   */
  syllable(init?: LoremSyllableInit): string;

  /** 
   * @returns A random text based on a random lorem method
   */
  lorem(): string;
}
