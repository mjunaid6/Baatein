import { api } from './api';

export const authService = {
  register: (username, displayName, password) => {
    return api('/auth/register', {
      method: 'POST',
      body: { username, displayName, password },
    });
  },

  login: (usernameOrEmail, password) => {
    return api('/auth/login', {
      method: 'POST',
      body: { usernameOrEmail, password },
    });
  },

  refresh: (refreshToken) => {
    return api('/auth/refresh', {
      method: 'POST',
      body: { refreshToken },
    });
  },
};
