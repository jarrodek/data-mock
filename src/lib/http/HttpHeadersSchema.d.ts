import { Internet } from "../Internet";
import { Lorem } from "../Lorem";
import { Random } from "../Random";
import { Time } from "../Time";
import { Types } from "../Types";

export interface GenerateInit {
  time: Time;
  random: Random;
  types: Types;
  lorem: Lorem;
  internet: Internet;
}

export interface IHeadersSchema {
  group: 'general' | 'caching' | 'conditional' | 'content' | 'cookies' | 'cors';
  request: boolean | string[];
  response: boolean | string[];
  generate: (init: GenerateInit) => string;
}

export declare const HeadersSchema: Record<string, IHeadersSchema>;
