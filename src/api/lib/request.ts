import axios from 'axios';
import { API_BASE_URL, ERROR_NETWORK } from '@/constant';
import _ from 'lodash';

const request = axios.create({
  timeout: 60000,
  baseURL: API_BASE_URL
});

// 异常拦截处理器
const errorHandler = (err: any) => {
  if (!err) {
    return Promise.reject(new Error(ERROR_NETWORK));
  }
  if (err.response) {
    const data = err.response.data;

    if (data) {
      err.message = data.msg || ERROR_NETWORK;
      err.code = data.code || 1;
    }

    if (!err.message) {
      err.message = ERROR_NETWORK;
    }

    if (err.message.indexOf('timeout') !== -1) {
      err.message = ERROR_NETWORK;
    }

    if (!err.code) {
      err.code = 1;
    }

    if (!err.status) {
      err.status = err.response.status;
    }

    if (!(err instanceof Error)) {
      const error = new Error(err.message) as any;
      error.response = err.response;
      error.request = err.request;
      error.status = err.status;
      err.stack && (error.stack = err.stack);
      err = error;
    }
  }
  return Promise.reject(err);
};

request.interceptors.request.use(undefined, errorHandler);

request.interceptors.response.use((res) => {
  const data = res.data;
  if (!data) {
    return data;
  }
  if (data && data.code) {
    const error = new Error(data.msg || ERROR_NETWORK) as any;
    error.response = res;
    error.request = res.request;
    error.code = data.code || 1;
    throw error;
  }
  return data.data;
}, errorHandler);

export default request;