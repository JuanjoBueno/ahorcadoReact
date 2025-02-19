import axios from 'axios';
import {Http} from './Http';
import {HttpError} from './HttpError';
import {Word} from '../../entities/Word';

export class HttpAxios extends Http {
  async getWord(): Promise<Word | HttpError> {
    try {
      console.log('URL usada:', this.url);

      const data = await axios.get('https://api.themoviedb.org/3/movie');
      console.log('datos:', data);
      return data.data;
    } catch (error) {
      return new HttpError(`${error}`);
    }
  }
}
