import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

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
