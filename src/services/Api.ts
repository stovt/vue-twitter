import axios from 'axios';
import { API_BASE_URL } from '@/config';

const authHeader = () => {
  const localUser = localStorage.getItem('user');
  const user = localUser ? JSON.parse(localUser) : null;

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

export default () =>
  axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...authHeader()
    }
  });
