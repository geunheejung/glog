import { QueryFunctionContext } from 'react-query';
import Send from './send';

const enum StorageKey {
  UserId = 'userId',
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
  Expired = 'expired',
}

const enum CookieKey {
  RefreshToken = 'refreshToken',
}

const enum QueryKey {
  Login = 'login',
  User = 'user',
}

const enum ApiKey {
  Login = '/login',
  Logout = '/logout',
  User = '/user',
  Refresh = '/refresh',
}

interface IAuth {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

interface ILogin {
  id: string;
  pw: string;
}

interface IUser {
  id: string;
  nickname: string;
}

const login = (payload: ILogin) => {
  return Send.post<IAuth>(ApiKey.Login, payload);
};

const logout = (userId: string) => {
  return Send.post(ApiKey.Logout, { userId });
};

const user = ({ queryKey }: QueryFunctionContext<string[]>) => {
  const [, id] = queryKey;
  return Send.get<IUser>(`${ApiKey.User}/${id}`);
};

const storageItem = (key: Partial<StorageKey>, value?: string | number) => {
  if (!value) return window.localStorage.getItem(key);

  window.localStorage.setItem(key, value.toString());
};

export {
  StorageKey,
  CookieKey,
  QueryKey,
  ApiKey,
  IAuth,
  ILogin,
  IUser,
  login,
  logout,
  user,
  storageItem,
};
