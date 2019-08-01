import { User } from './user';

export interface ProfileState {
  user: User | null;
  loading: boolean;
  loginError: string | null;
  registerError: string | null;
}
export interface RootState {
  profile: ProfileState;
}
