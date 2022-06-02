import axios from 'axios';
import { requestThen } from 'api/interceptions/request';
import { responseCatch } from 'api/interceptions/response';

export const enum Options {
  AUTHORIZATION = 'Authorization',
  BEARER = 'Bearer',
}

export const setAuthorizationToken = (token: string) => {
  axios.defaults.headers.common[
    Options.AUTHORIZATION
  ] = `${Options.BEARER} ${token}`;
};

const instance = axios.create({
  withCredentials: true,
});

instance.interceptors.request.use(requestThen, err => Promise.reject(err));

instance.interceptors.response.use(res => res, responseCatch);

export default instance;
