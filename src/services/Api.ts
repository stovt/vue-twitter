import axios from 'axios';
import { API_BASE_URL } from '@/config';
import interceptorsSetup from './helpers/interceptors';

const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

interceptorsSetup(instance);

export default () => instance;
