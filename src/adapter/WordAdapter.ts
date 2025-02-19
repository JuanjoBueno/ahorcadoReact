import {Word} from '../entities/Word';
import {HttpError} from './http/HttpError';
import {HttpFactory} from './http/HttpFactory';

export class WordAdapter {
  static async getWord(): Promise<Word | HttpError> {
    const http = HttpFactory.build();

    const word = await http.getWord();

    if (word instanceof HttpError)
      return {
        palabra: 'Error obteniendo la palabra',
      };

    return word;
  }
}
