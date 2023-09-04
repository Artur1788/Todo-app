import axios, { InternalAxiosRequestConfig } from 'axios';
import useToken from '../_hooks/useToken';

const Axios = axios.create({
  baseURL: 'http://localhost:3000',
});

Axios.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    config.headers['Content-Type'] = 'application/json';
    config.headers.Authorization = `Bearer ${useToken.getState().token}`;

    return config;
  },
  (error) => error
);

export default Axios;
