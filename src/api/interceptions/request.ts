import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import { CookieKey, storageItem, StorageKey } from 'api/sign';
import { setAuthorizationToken } from 'api/send';

const checkExpired = (): boolean => {
  const refreshToken = Cookies.get(CookieKey.RefreshToken);
  const expired = storageItem(StorageKey.Expired);

  const isExpired = moment(parseInt(expired)).diff(moment()) < 0;

  return !!(isExpired && refreshToken);
};

const requestThen = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  if (!config?.headers)
    throw new Error(
      `Expected 'config' and 'config.headers' not to be undefined`
    );

  const token = storageItem(StorageKey.AccessToken) as string;

  setAuthorizationToken(token);
  config.headers.Authorization = `Bearer ${token}`;

  return config;
};

export { requestThen, checkExpired };
