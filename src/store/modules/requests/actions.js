export default {
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;

    const response = await fetch(
      `https://find-a-coach-dfbb6-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch requests.');
    }

    const requests = Object.entries(responseData).map(
      ([requestId, requestObj]) => ({
        id: requestId,
        coachId: coachId,
        ...requestObj,
      })
    );

    context.commit('setRequests', requests);
  },

  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://find-a-coach-dfbb6-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to send request');
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },
};
