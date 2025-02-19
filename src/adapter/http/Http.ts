import {Word} from '../../entities/Word';
import {HttpError} from './HttpError';

interface Config {
  url: string;
}

export interface IWord {
  getWord(): Promise<Word | HttpError>;
}
export abstract class Http implements IWord {
  protected url: string;

  constructor({url}: Config) {
    this.url = url;
  }
  abstract getWord(): Promise<Word | HttpError>;
}
