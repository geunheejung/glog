import Cookies from 'js-cookie';
import moment from 'moment';
import { checkExpired } from './authToken';
import { ApiKey, CookieKey, StorageKey } from './sign';
import Send from 'api/send';

const refresh = async (error: any) => {
  const {
    config,
    response: { status },
  } = error;

  const refreshToken = Cookies.get(CookieKey.RefreshToken);

  debugger;

  if (status === 401 && checkExpired()) {
    debugger;
    const { data } = await Send.post(ApiKey.Refresh, { refreshToken });
    const token = data.data.accessToken;

    localStorage.setItem(StorageKey.AccessToken, token);
    localStorage.setItem(
      StorageKey.Expired,
      moment().add(1, 'hour').format('yyyy-MM-DD HH:mm:ss')
    );

    config.headers['Authorization'] = `Bearer ${token}`;
  }

  throw error;
};

export default refresh;
