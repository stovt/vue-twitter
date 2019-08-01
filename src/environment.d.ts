export {}; // ensure this is a module

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      VUE_APP_API_BASE_URL: string;
    }
  }
}
