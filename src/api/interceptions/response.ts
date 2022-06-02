import axios from 'axios';
import Cookies from 'js-cookie';
import { checkExpired } from './request';
import {
  ApiKey,
  CookieKey,
  storageItem,
  StorageKey,
  updateToken,
} from 'api/sign';
import { setAuthorizationToken } from 'api/send';

const refreshToken = async () => {
  const refreshToken = (await Cookies.get(CookieKey.RefreshToken)) as string;
  return axios.post(ApiKey.Refresh, {}, { headers: { refresh: refreshToken } });
};

const responseCatch = async (error: any) => {
  const {
    config,
    response: { status },
  } = error;

  const originalToken = await storageItem(StorageKey.AccessToken);

  if ((originalToken && status === 401) || checkExpired()) {
    setAuthorizationToken(originalToken);

    const { data } = await refreshToken();
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      data.data;

    Cookies.set(CookieKey.RefreshToken, newRefreshToken, { expires: 7 });
    updateToken(newAccessToken);

    config.headers.Authorization = `Bearer ${newAccessToken}`;

    return axios(config);
  }

  return Promise.reject(error);
};

export { responseCatch };
