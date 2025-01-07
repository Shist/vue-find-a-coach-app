export default {
  login() {},

  async signup(context, payload) {
    const API_KEY = import.meta.env.VITE_API_KEY;

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      },
    );

    const responseData = await response.json();

    if (!response.ok) {
      if (responseData?.error?.message === 'EMAIL_EXISTS') {
        throw new Error('User with such email already exists.');
      } else {
        throw new Error(
          responseData.message ||
            'Failed to authenticate. Check your login data.'
        );
      }
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
};
