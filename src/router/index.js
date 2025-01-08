import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from '@/pages/coaches/CoachesList.vue';
import store from '@/store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: () => import('@/pages/coaches/CoachDetails.vue'),
      props: true,
      children: [
        {
          path: 'contact',
          component: () => import('@/pages/requests/ContactCoach.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/register',
      component: () => import('@/pages/coaches/CoachRegistration.vue'),
      meta: { isAuthRequired: true },
    },
    {
      path: '/requests',
      component: () => import('@/pages/requests/RequestsReceived.vue'),
      meta: { isAuthRequired: true },
    },
    {
      path: '/auth',
      component: () => import('@/pages/auth/UserAuth.vue'),
      meta: { isUnauthRequired: true },
    },
    { path: '/:notFound(.*)', component: () => import('@/pages/NotFound.vue') },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.isAuthRequired && !store.getters['auth/isAuthenticated']) {
    next('/auth');
  } else if (
    to.meta.isUnauthRequired &&
    store.getters['auth/isAuthenticated']
  ) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
