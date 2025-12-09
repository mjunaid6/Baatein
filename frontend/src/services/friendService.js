import { api } from './api';

export const friendService = {
  getMe: (token) => api('/users/me', { token }),

  sendRequest: (code, token) => {
    return api('/friends/request', {
      method: 'POST',
      body: { code },
      token,
    });
  },

  acceptRequest: (requestId, token) => {
    return api(`/friends/requests/${requestId}/accept`, {
      method: 'POST',
      token,
    });
  },

  rejectRequest: (requestId, token) => {
    return api(`/friends/requests/${requestId}/reject`, {
      method: 'POST',
      token,
    });
  },

  getFriends: (token) => {
    return api('/friends/list', { token });
  },
};
