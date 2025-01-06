export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const response = await fetch(
      `https://find-a-coach-dfbb6-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to register!');
    }

    context.commit('registerCoach', { ...coachData, id: userId });
  },

  async loadCoaches(context) {
    const response = await fetch(
      'https://find-a-coach-dfbb6-default-rtdb.europe-west1.firebasedatabase.app/coaches.json'
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch!');
    }

    const coaches = Object.entries(responseData).map(([coachId, coachObj]) => ({
      id: coachId,
      ...coachObj,
    }));

    context.commit('setCoaches', coaches);
  },
};
