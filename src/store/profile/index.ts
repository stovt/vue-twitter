import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { ProfileState, RootState } from '@/types/state';

const localUser = localStorage.getItem('user');
const user = localUser ? JSON.parse(localUser) : null;

export const state: ProfileState = user || null;

const profile: Module<ProfileState, RootState> = {
  state,
  getters,
  actions,
  mutations
};

export default profile;
