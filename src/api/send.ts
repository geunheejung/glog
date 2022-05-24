import axios from 'axios';
import { authToken, authTokenHandleError } from './authToken';

const instance = axios.create({
  timeout: 1000,
  withCredentials: true,
});

instance.interceptors.request.use(authToken, authTokenHandleError);

export default instance;
