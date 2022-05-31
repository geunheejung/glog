import axios from 'axios';
import { authToken, authTokenHandleError } from './authToken';
import refresh from './refresh';

const instance = axios.create({
  timeout: 1000,
  withCredentials: true,
});

instance.interceptors.request.use(authToken, authTokenHandleError);

instance.interceptors.response.use(res => res, refresh);

export default instance;
