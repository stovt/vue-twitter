import { GetterTree } from 'vuex';
import { UsersState, RootState } from '@/types/state';

const getters: GetterTree<UsersState, RootState> = {
  users(state) {
    return state.all
      .map(user => ({
        ...user,
        fullName: `${user.firstName} ${user.lastName}`
      }))
      .sort((a, b) => {
        if (a.fullName < b.fullName) return -1;
        if (a.fullName > b.fullName) return 1;
        return 0;
      });
  },
  userById: state => (id: string) => {
    return state.byId[id] ? state.byId[id] : null;
  }
};

export default getters;
