import {useEffect} from 'react';
import {Word} from '../../entities/Word';
import {Http} from './Http';
import {HttpError} from './HttpError';

export class HttpFetch extends Http {
  async getWord(): Promise<Word | HttpError> {
    try {
      console.log('URL usada:', this.url);
      const data = await fetch(this.url);
      console.log('data:', data);
      const json: Word = await data.json();
      return json;
    } catch (error) {
      return new HttpError(`${error}`);
    }
  }
}
