import axios from 'axios';

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
  nickname: string;
}

export const login = (payload: ILogin) => {
  return axios.post<IAuth>(ApiKey.Login, payload);
};

export const user = (id: string) => {
  const { value } = storageItem(StorageKey.AccessToken);
  axios.defaults.headers.common[`Authorization`] = `Bearer ${value}`;
  return axios.get<IUser>(`${ApiKey.User}/${id}`);
};

export const storageItem = (
  key: Partial<StorageKey>,
  value?: string,
  ms?: number
) => {
  if (!value) return JSON.parse(localStorage.getItem(key) as string);

  const item = {
    value,
    expiry: ms,
  };

  window.localStorage.setItem(key, JSON.stringify(item));
};
