import getters from '@/store/modules/requests/getters.js';
import mutations from '@/store/modules/requests/mutations.js';
import actions from '@/store/modules/requests/actions.js';

export default {
  namespaced: true,

  state() {
    return {
      requests: [],
    };
  },

  getters: getters,

  mutations: mutations,

  actions: actions,
};
