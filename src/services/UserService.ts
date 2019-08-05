import jwtDecode from 'jwt-decode';
import Api from '@/services/Api';

export default {
  login(email: string, password: string) {
    return Api().post('/auth/signin', undefined, {
      headers: {
        Authorization: `Basic ${btoa(`${email}:${password}`)}`
      }
    });
  },
  register(firstName: string, lastName: string, email: string, password: string) {
    return Api().post('/auth/signup', {
      firstName,
      lastName,
      email,
      password
    });
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
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  },
  checkAuth() {
    const loggedIn = this.loggedIn();
    if (!loggedIn) this.logout();
  },
  getUsers() {
    return Api().get('/users/get/all');
  },
  getUser(id: string) {
    return Api().get(`/users/get/${id}`);
  }
};
