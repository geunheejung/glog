import { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import { CookieKey, storageItem, StorageKey } from './sign';

const checkExpired = (): boolean => {
  const refreshToken = Cookies.get(CookieKey.RefreshToken);
  const expired = storageItem(StorageKey.Expired) as string;

  const isExpired = moment(parseInt(expired)).diff(moment()) < 0;

  debugger;

  return !!(isExpired && refreshToken);
};

const authToken = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  if (!config?.headers)
    throw new Error(
      `Expected 'config' and 'config.headers' not to be undefined`
    );

  const token = storageItem(StorageKey.AccessToken);

  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
};

const authTokenHandleError = (err: any) => {
  Cookies.remove(CookieKey.RefreshToken);
};

export { authToken, authTokenHandleError, checkExpired };
