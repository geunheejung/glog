import axios from 'axios';

export const enum StorageKey {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken',
}

export const enum QueryKey {
  Login = 'login',
  User = 'user',
}

export const enum ApiKey {
  Login = '/login',
  User = '/user',
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
}

export const login = (payload: ILogin) => {
  return axios.post<IAuth>(ApiKey.Login, payload);
};

export const user = (id: string) => {
  return axios.get<IUser>(`${ApiKey.User}/${id}`).then(res => res);
};

export const storageItem = (key: Partial<StorageKey>, value?: string) => {
  if (!value) return window.localStorage.getItem(key);

  window.localStorage.setItem(key, value);
};
