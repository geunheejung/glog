import axios from 'axios';
import moment from 'moment';
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
  SignUp = '/signUp',
  Login = '/login',
  Logout = '/logout',
  User = '/user',
  Refresh = '/refresh',
}

interface ISignUp {
  nickname: string;
  email: string;
  pw: string;
}

interface IAuth {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

interface ILogin {
  email: string;
  pw: string;
}

interface IUser {
  id: string;
  nickname: string;
}

const signUp = (payload: ISignUp) => {
  return Send.post(ApiKey.SignUp, payload);
};

const login = (payload: ILogin) => {
  return Send.post<IAuth>(ApiKey.Login, payload);
};

const logout = () => {
  const userId = storageItem(StorageKey.UserId);
  return Send.post(ApiKey.Logout, { userId });
};

const user = async () => {
  const userId = storageItem(StorageKey.UserId);

  if (!userId) return;

  return await Send.get<IUser>(`${ApiKey.User}/${userId}`);
};

const storageItem = (
  key: Partial<StorageKey>,
  value?: string | number
): string => {
  if (!value) return window.localStorage.getItem(key) as string;

  window.localStorage.setItem(key, value.toString());
  return '';
};

const updateToken = (accessToken: string) => {
  storageItem(StorageKey.AccessToken, accessToken);
  storageItem(StorageKey.Expired, moment().add(1, 'h').valueOf());
};

export {
  signUp,
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
  updateToken,
};
