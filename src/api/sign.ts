import axios from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

export const enum QueryKey {
  Login = 'login',
}

export const enum ApiKey {
  Login = '/login',
}

interface IUser {
  id: string;
}

interface ILogin {
  id: string;
  pw: string;
}

export const login = (payload: ILogin) => {
  console.log(payload);

  return axios.post<IUser>(ApiKey.Login, payload);
};
