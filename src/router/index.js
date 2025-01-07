import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from '@/pages/coaches/CoachesList.vue';
import CoachDetails from '@/pages/coaches/CoachDetails.vue';
import ContactCoach from '@/pages/requests/ContactCoach.vue';
import CoachRegistration from '@/pages/coaches/CoachRegistration.vue';
import RequestsReceived from '@/pages/requests/RequestsReceived.vue';
import UserAuth from '@/pages/auth/UserAuth.vue';
import NotFound from '@/pages/NotFound.vue';
import store from '@/store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [{ path: 'contact', component: ContactCoach, props: true }],
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { isAuthRequired: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { isAuthRequired: true },
    },
    { path: '/auth', component: UserAuth, meta: { isUnauthRequired: true } },
    { path: '/:notFound(.*)', component: NotFound },
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
