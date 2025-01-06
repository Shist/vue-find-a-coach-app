export default {
  setCoaches(state, payload) {
    state.coaches = payload;
  },

  setFetchTimeStamp(state) {
    state.lastFetch = new Date().getTime();
  },

  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
};
