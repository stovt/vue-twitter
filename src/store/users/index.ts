import { Module } from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { UsersState, RootState } from '@/types/state';

export const state: UsersState = {
  all: [],
  byId: {}
};

const users: Module<UsersState, RootState> = {
  state,
  getters,
  actions,
  mutations
};

export default users;
