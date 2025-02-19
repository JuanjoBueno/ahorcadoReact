import {Config} from '../../config/Config';
import {HttpFetch} from './HttpFetch';

export class HttpFactory {
  static build() {
    switch (Config.wordAPI.type) {
      default:
        return new HttpFetch(Config.wordAPI);
    }
  }
}
