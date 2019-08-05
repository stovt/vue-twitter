import { MutationTree } from 'vuex';
import { User } from '@/types/user';
import { ProfileState } from '@/types/state';

const mutations: MutationTree<ProfileState> = {
  login(state, payload: User) {
    state.user = payload;
  },
  logout(state) {
    state.user = null;
  }
};

export default mutations;
