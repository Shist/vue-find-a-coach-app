export default {
  async authRequest(context, payload) {
    const method = payload.mode;
    const API_KEY = import.meta.env.VITE_API_KEY;

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=${API_KEY}`,
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
            'Failed to authenticate. Check your login data.',
        );
      }
    }

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },

  async login(context, payload) {
    await context.dispatch('authRequest', {
      ...payload,
      mode: 'signInWithPassword',
    });
  },

  tryAutoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
        tokenExpiration: null,
      });
    }
  },

  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },

  async signup(context, payload) {
    await context.dispatch('authRequest', {
      ...payload,
      mode: 'signUp',
    });
  },
};
