import axios from 'axios';
import { QueryFunctionContext } from 'react-query';

export const enum StorageKey {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
  UserId = 'userId',
}

export const enum QueryKey {
  Login = 'login',
  User = 'user',
}

export const enum ApiKey {
  Login = '/login',
  Logout = '/logout',
  User = '/user',
}

export interface IAuth {
  accessToken: string;
  refreshToken: string;
  userId: string;
}
export interface ILogin {
  id: string;
  pw: string;
}

export interface IUser {
  id: string;
  nickname: string;
}

export const login = (payload: ILogin) => {
  return axios.post<IAuth>(ApiKey.Login, payload);
};

export const logout = (userId: string) => {
  return axios.post(ApiKey.Logout, { userId });
};

export const user = ({ queryKey }: QueryFunctionContext<string[]>) => {
  try {
    const [, id] = queryKey;
    const { value } = storageItem(StorageKey.AccessToken);
    axios.defaults.headers.common[`Authorization`] = `Bearer ${value}`;
    return axios.get<IUser>(`${ApiKey.User}/${id}`);
  } catch (err) {
    throw Error('Error');
  }
};

export const storageItem = (
  key: Partial<StorageKey>,
  value?: string,
  ms?: number
) => {
  if (!value) return JSON.parse(localStorage.getItem(key) as string) || {};

  const item = {
    value,
    expiry: ms,
  };

  window.localStorage.setItem(key, JSON.stringify(item));
};
