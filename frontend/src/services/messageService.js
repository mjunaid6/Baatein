import { api } from './api';

export const messageService = {
  getConversation: (conversationId, token, limit = 50) => {
    return api(`/messages/conversation/${conversationId}?limit=${limit}`, { token });
  },

  sendMessageRest: (to, content, token) => {
    return api('/messages/send', {
      method: 'POST',
      token,
      body: { to, content },
    });
  },
};
