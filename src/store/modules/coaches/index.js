import getters from '@/store/modules/coaches/getters.js';
import mutations from '@/store/modules/coaches/mutations.js';
import actions from '@/store/modules/coaches/actions.js';

export default {
  namespaced: true,

  state() {
    return {
      lastFetch: null,
      coaches: [],
    };
  },

  getters: getters,

  mutations: mutations,

  actions: actions,
};
