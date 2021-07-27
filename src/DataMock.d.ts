import { Types } from './lib/Types.js';
import { Lorem } from './lib/Lorem.js';
import { Person } from './lib/Person.js';
import { Internet } from './lib/Internet.js';
import { Random } from './lib/Random.js';
import { Time } from './lib/Time.js';
import { Word } from './lib/Word.js';
import { Http } from './lib/Http.js';
import { DataMockInit } from '../types.js';
import { DataMockLocale } from '../locales/types.js';

export declare class DataMock {
  /**
   * Base types generator.
   */
  types: Types;
  /**
  * Person things generator.
  */
  person: Person;
  /**
  * Internet things generator.
  */
  internet: Internet;
  /**
  * Text generator.
  */
  lorem: Lorem;
  /**
  * Random things.
  */
  random: Random;
  /**
  * Random things.
  */
  time: Time;
  /**
  * Words picker.
  */
  word: Word;
  /**
  * Words picker.
  */
  http: Http;

  /**
   * @param init The library init options.
   */
  constructor(init?: DataMockInit);
  seed(value: number): void;
  /**
   * @param locale The locale to set. When nothing is passed then it uses the default locale.
   */
  locale(locale?: DataMockLocale): void;
}
