import { createStore } from 'vuex';
import authModule from '@/store/modules/auth';
import coachesModule from '@/store/modules/coaches';
import requestsModule from '@/store/modules/requests';

const store = createStore({
  modules: {
    auth: authModule,
    coaches: coachesModule,
    requests: requestsModule,
  },
});

export default store;
