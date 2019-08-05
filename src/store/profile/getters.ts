import { GetterTree } from 'vuex';
import { ProfileState, RootState } from '@/types/state';

const getters: GetterTree<ProfileState, RootState> = {
  fullName(state): string {
    const firstName = (state && state.firstName) || '';
    const lastName = (state && state.lastName) || '';
    return `${firstName} ${lastName}`;
  }
};

export default getters;
