import { api } from './api';

export const adminService = {
  getAllUsers: (token) => api('/admin/users', { token }),

  messageUser: (userId, content, token) => {
    return api(`/admin/users/${userId}/message`, {
      method: 'POST',
      token,
      body: { content },
    });
  },

  deactivateUser: (userId, token) => {
    return api(`/admin/users/${userId}/deactivate`, {
      method: 'POST',
      token,
    });
  },
};
