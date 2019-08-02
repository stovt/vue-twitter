import { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

const requestHandler = (config: AxiosRequestConfig) => {
  const localUser = localStorage.getItem('user');
  const user = localUser ? JSON.parse(localUser) : null;

  if (user && user.token) {
    // eslint-disable-next-line
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
};
const errorRequestHandler = (error: any) => Promise.reject(error);

const responseHandler = (
  res: AxiosResponse<{
    success: boolean;
    message?: string;
  }>
) => {
  if (res.data.success) return res;
  if (res.data.message) return Promise.reject(res.data.message);
  return Promise.reject();
};

const errorResponseHandler = (error: any) => {
  if (error && error.response) {
    return Promise.reject(error.response.statusText);
  }
  if (error && error.message) {
    return Promise.reject(error.message);
  }
  return Promise.reject(new Error('Oops.. Something went wrong :('));
};

export default function setup(instance: AxiosInstance) {
  instance.interceptors.request.use(requestHandler, errorRequestHandler);
  instance.interceptors.response.use(responseHandler, errorResponseHandler);
}
