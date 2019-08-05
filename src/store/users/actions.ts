import { ActionTree } from 'vuex';
import UserService from '@/services/UserService';
import { UsersState, RootState } from '@/types/state';

const actions: ActionTree<UsersState, RootState> = {
  fetchUsers({ commit }) {
    return UserService.getUsers()
      .then(res => {
        const { users } = res.data;
        commit('fetchUsers', users);
        return Promise.resolve();
      })
      .catch(error => Promise.reject(error));
  },
  fetchUser({ commit }, payload: { id: string }) {
    const { id } = payload;

    return UserService.getUser(id)
      .then(res => {
        const { user } = res.data;
        commit('fetchUser', { id, user });
        return Promise.resolve();
      })
      .catch(error => Promise.reject(error));
  }
};

export default actions;
