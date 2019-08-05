import { MutationTree } from 'vuex';
import { User } from '@/types/user';
import { ProfileState } from '@/types/state';

const mutations: MutationTree<ProfileState> = {
  login(state, payload: User) {
    state = payload;
  },
  logout(state) {
    state = null;
  }
};

export default mutations;
