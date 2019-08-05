import Vue from 'vue';
import { MutationTree } from 'vuex';
import { User, Users } from '@/types/user';
import { UsersState } from '@/types/state';

const mutations: MutationTree<UsersState> = {
  fetchUsers(state, payload: Users) {
    state.all = payload;
  },
  fetchUser(state, payload: { id: number; user: User }) {
    const { id, user } = payload;

    Vue.set(state.byId, id, user);
  }
};

export default mutations;
