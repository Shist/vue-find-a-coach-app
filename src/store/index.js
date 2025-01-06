import { createStore } from 'vuex';
import coachesModule from '@/store/modules/coaches';
import requestsModule from '@/store/modules/requests';

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
  },

  state() {
    return {
      userId: 'c3',
    };
  },

  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
