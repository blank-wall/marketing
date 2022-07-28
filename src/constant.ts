export const ERROR_NETWORK = '您的网络似乎有些问题';

export const APP_DEBUG = import.meta.env.APP_ENV !== 'prod';

export const API_BASE_URL = import.meta.env.NODE_ENV === 'development' ? location.origin : import.meta.env.VITE_APP_BASE_RUL;
