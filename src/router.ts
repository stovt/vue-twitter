import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './views/HomePage.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/RegisterPage.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import(/* webpackChunkName: "logout" */ './views/LogoutPage.vue')
    },
    {
      path: '/tweets',
      name: 'tweets',
      component: () => import(/* webpackChunkName: "tweets" */ './views/TweetsPage.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "users" */ './views/UsersPage.vue')
    },
    {
      path: '/users/:id',
      name: 'user',
      component: () => import(/* webpackChunkName: "user" */ './views/UserPage.vue')
    },
    { path: '*', redirect: '/' }
  ]
});

/*
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = UserService.loggedIn();

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  if (!authRequired && loggedIn) {
    return next('/');
  }

  return next();
});
*/

export default router;
