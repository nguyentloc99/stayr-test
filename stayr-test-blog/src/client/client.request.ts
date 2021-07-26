import { Injectable } from '@nestjs/common';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
} from 'axios';
import { stringify } from 'query-string';

export const CANCEL_KEY = 'CANCEL_KEY';

const { CancelToken } = axios;

export interface PromiseWithCancel<R> extends Promise<R> {
  [CANCEL_KEY]?: () => void;
}

@Injectable()
export class Request {
  api: AxiosInstance;

  constructor(baseUrl: string) {
    this.api = axios.create({
      withCredentials: false,
      baseURL: baseUrl || '',
      headers: {
        'Content-Type': 'application/json',
      },
      paramsSerializer: (params) => {
        return stringify(params, { arrayFormat: 'comma' });
      },
    });
  }

  setToken = (token: string) => {
    this.api.defaults.headers.common.Authorization = token
      ? `Bearer ${token}`
      : '';
  };

  get = <T = any>(
    url: string,
    config: AxiosRequestConfig = {},
  ): PromiseWithCancel<T> => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<T> = this.api
      .get(url, apiConfig)
      .then(mapData)
      .catch(mapError);
    request[CANCEL_KEY] = () => cancel();
    return request;
  };

  post = <T = any>(
    url: string,
    body?: any,
    config: AxiosRequestConfig = {},
  ) => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<T> = this.api
      .post(url, body, apiConfig)
      .then(mapData)
      .catch(mapError);
    request[CANCEL_KEY] = () => cancel();
    return request;
  };

  put = <T = any>(url: string, body?: any, config: AxiosRequestConfig = {}) => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<T> = this.api
      .put(url, body, apiConfig)
      .then(mapData)
      .catch(mapError);
    request[CANCEL_KEY] = () => cancel();
    return request;
  };

  patch = <T = any>(
    url: string,
    body?: any,
    config: AxiosRequestConfig = {},
  ) => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<T> = this.api
      .patch(url, body, apiConfig)
      .then(mapData)
      .catch(mapError);
    request[CANCEL_KEY] = () => cancel();
    return request;
  };

  delete = <T = any>(
    url: string,
    config: AxiosRequestConfig = {},
  ): PromiseWithCancel<T> => {
    let cancel: Canceler;
    const apiConfig = {
      params: {
        ...config.params,
      },
      ...config,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    };
    const request: PromiseWithCancel<T> = this.api
      .delete(url, apiConfig)
      .then(mapData)
      .catch(mapError);
    request[CANCEL_KEY] = () => cancel();
    return request;
  };
}

function mapData(res: AxiosResponse<any>) {
  return res.data;
}

function mapError(err: AxiosError<any>) {
  throw err;
}
