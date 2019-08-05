import { ActionTree } from 'vuex';
import UserService from '@/services/UserService';
import { ProfileState, RootState } from '@/types/state';
import router from '@/router';

const actions: ActionTree<ProfileState, RootState> = {
  login({ commit }, payload: { email: string; password: string }) {
    const { email, password } = payload;

    return UserService.login(email, password)
      .then(res => {
        const user = res.data;
        localStorage.setItem('user', JSON.stringify(user));
        commit('login', user);
        router.push('/');
        return Promise.resolve();
      })
      .catch(error => Promise.reject(error));
  },
  register(
    omitStore,
    payload: { firstName: string; lastName: string; email: string; password: string }
  ) {
    const { firstName, lastName, email, password } = payload;

    return UserService.register(firstName, lastName, email, password)
      .then(() => {
        router.push({ path: 'login', query: { fromRegister: 'true' } });
        return Promise.resolve();
      })
      .catch(error => Promise.reject(error));
  },
  logout({ commit }) {
    UserService.logout();
    commit('logout');
    router.push('/login');
  }
};

export default actions;
