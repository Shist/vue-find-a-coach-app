let tokenLifeTimer;

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

    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    tokenLifeTimer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
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
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 60000) {
      return;
    }

    tokenLifeTimer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
      });
    }
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(tokenLifeTimer);

    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },

  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setDidAutoLogout');
  },

  async signup(context, payload) {
    await context.dispatch('authRequest', {
      ...payload,
      mode: 'signUp',
    });
  },
};
