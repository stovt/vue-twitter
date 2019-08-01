import { ActionTree } from 'vuex';
import UserService from '@/services/UserService';
import { ProfileState, RootState } from '@/types/state';
import router from '@/router';

const actions: ActionTree<ProfileState, RootState> = {
  login({ commit }, payload: { email: string; password: string }) {
    commit('login');

    const { email, password } = payload;

    UserService.login(email, password)
      .then(res => {
        const user = res.data;
        localStorage.setItem('user', JSON.stringify(user));
        commit('loginSuccessful', user);
        router.push('/');
      })
      .catch(error => {
        UserService.handleError(error, message => commit('loginError', message));
      });
  },
  register(
    { commit },
    payload: { firstName: string; lastName: string; email: string; password: string }
  ) {
    commit('register');

    const { firstName, lastName, email, password } = payload;

    UserService.register(firstName, lastName, email, password)
      .then(user => {
        commit('registerSuccessful', user);
        router.push({ path: 'login', query: { fromRegister: 'true' } });
      })
      .catch(error => {
        UserService.handleError(error, message => commit('registerError', message));
      });
  },
  logout({ commit }) {
    UserService.logout();
    commit('logout');
    router.push('/login');
  }
};

export default actions;
