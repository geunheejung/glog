import { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import { ApiKey, CookieKey, storageItem, StorageKey } from './sign';
import Send from './send';

const authToken = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  if (!config?.headers) {
    throw new Error(
      `Expected 'config' and 'config.headers' not to be undefined`
    );
  }

  const refreshToken = Cookies.get(CookieKey.RefreshToken);
  let token = storageItem(StorageKey.AccessToken);
  const expired = storageItem(StorageKey.Expired);

  if (moment(expired).diff(moment()) < 0 && refreshToken) {
    const headers = { refresh: refreshToken };
    const { data } = await Send.post(ApiKey.Refresh, {}, { headers });

    token = data.data.accessToken;
    localStorage.setItem(StorageKey.AccessToken, data.data.accessToken);
    localStorage.setItem(
      StorageKey.Expired,
      moment().add(1, 'hour').format('yyyy-MM-DD HH:mm:ss')
    );
  }

  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
};

const authTokenHandleError = (err: any) => {
  Cookies.remove(CookieKey.RefreshToken);
};

export { authToken, authTokenHandleError };
