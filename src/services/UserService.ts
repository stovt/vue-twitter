import jwtDecode from 'jwt-decode';
import { AxiosResponse } from 'axios';
import Api from '@/services/Api';

export default {
  login(email: string, password: string) {
    return Api()
      .post('/auth/signin', undefined, {
        headers: {
          Authorization: `Basic ${btoa(`${email}:${password}`)}`
        }
      })
      .then(this.checkStatus)
      .then(this.checkResData);
  },
  register(firstName: string, lastName: string, email: string, password: string) {
    return Api()
      .post('/auth/signup', {
        firstName,
        lastName,
        email,
        password
      })
      .then(this.checkStatus)
      .then(this.checkResData);
  },
  loggedIn() {
    const localUser = localStorage.getItem('user');
    const token = localUser ? JSON.parse(localUser).token : null;

    return !!token && !this.isTokenExpired(token);
  },
  logout() {
    localStorage.removeItem('user');
  },
  isTokenExpired(token: string) {
    try {
      const decodedToken = jwtDecode<{ exp: number }>(token);
      if (decodedToken.exp < Date.now() / 1000) {
        this.logout();
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  },
  checkStatus(res: AxiosResponse) {
    if (res.status >= 200 && res.status < 300) {
      // Success status lies between 200 to 300
      return Promise.resolve(res);
    }
    return Promise.reject(new Error(res.statusText));
  },
  checkResData(
    res: AxiosResponse<{
      success: boolean;
      message?: string;
    }>
  ) {
    if (res.data.success) return Promise.resolve(res);
    if (res.data.message) {
      return Promise.reject(new Error(res.data.message));
    }
    return Promise.reject();
  },
  handleError(error: any, callback: (message: string) => void) {
    if (error && error.response) {
      callback(error.response.statusText);
    } else if (error && error.message) {
      callback(error.message);
    } else {
      callback('Oops.. Something went wrong :(');
    }
  }
};
