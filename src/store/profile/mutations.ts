import { MutationTree } from 'vuex';
import { User } from '@/types/user';
import { ProfileState } from '@/types/state';

const mutations: MutationTree<ProfileState> = {
  login(state) {
    state.loginError = null;
    state.loading = true;
    state.user = null;
  },
  loginSuccessful(state, payload: User) {
    state.loginError = null;
    state.loading = false;
    state.user = payload;
  },
  loginError(state, error: string) {
    state.loginError = error;
    state.loading = false;
    state.user = null;
  },
  register(state) {
    state.registerError = null;
    state.loading = true;
    state.user = null;
  },
  registerSuccessful(state, payload: User) {
    state.registerError = null;
    state.loading = false;
    state.user = payload;
  },
  registerError(state, error: string) {
    state.registerError = error;
    state.loading = false;
    state.user = null;
  },
  logout(state) {
    state.user = null;
  }
};

export default mutations;
