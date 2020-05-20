import axios, { CancelToken } from "axios";
import { CANCEL } from 'redux-saga';

export default class MainApi{
  mainApiRoute = 'https://5eb932babb17460016b3312b.mockapi.io/api/v1';

  get(url) {
    const source = CancelToken.source();
    const req = axios.get(url, {
      cancelToken: source.token
    });

    req[CANCEL] = () => source.cancel();
    return req;
  }

  post(url, payload) {
    const source = CancelToken.source();
    const req = axios.post(url, payload, {
      cancelToken: source.token
    });
    req[CANCEL] = () => source.cancel();

    return req;
  }

  uploader(url, payload, progressHandler) {
    const source = CancelToken.source();
    const req = axios.post(url, payload, {
      cancelToken: source.token,
      onUploadProgress: progressHandler
    });
    req[CANCEL] = () => source.cancel();

    return req;
  }
}