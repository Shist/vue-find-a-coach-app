import getters from '@/store/modules/auth/getters.js';
import mutations from '@/store/modules/auth/mutations.js';
import actions from '@/store/modules/auth/actions.js';

export default {
  namespaced: true,

  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
    };
  },

  getters: getters,

  mutations: mutations,

  actions: actions,
};
