import {Config} from '../../config/Config';
import {HttpAxios} from './HttpAxios';
import {HttpFetch} from './HttpFetch';

export class HttpFactory {
  static build() {
    switch (Config.wordAPI.type) {
      case 'axios':
        return new HttpAxios(Config.wordAPI);
      default:
        return new HttpFetch(Config.wordAPI);
    }
  }
}
