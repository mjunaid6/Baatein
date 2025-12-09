import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';
import { messageService } from '../../services/messageService';
import { computeConversationId } from '../../utils/conversationId';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

export default function ChatWindow({ peer }) {
  const { user, token } = useAuth();
  const { send, on } = useSocket();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const convId = computeConversationId(user.internalId, peer.id);

  // Load past messages
  useEffect(() => {
    if (!peer) return;

    async function loadHistory() {
      setLoading(true);
      try {
        const history = await messageService.getConversation(convId, token);
        setMessages(history);
      } catch (e) {
        console.error('Failed to load conversation', e);
      }
      setLoading(false);
    }

    loadHistory();

    // Listen for incoming messages
    const unsub = on('message', (msg) => {
      const match =
        (msg.senderId === peer.id && msg.receiverId === user.internalId) ||
        (msg.senderId === user.internalId && msg.receiverId === peer.id);

      if (match) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => unsub();
  }, [peer, token]);

  // Send new message
  const handleSend = (text) => {
    const clientId = 'c_' + Math.random().toString(36).slice(2, 9);

    // Optimistic UI message
    const optimistic = {
      clientId,
      content: text,
      senderId: user.internalId,
      receiverId: peer.id,
      createdAt: new Date().toISOString(),
      status: 'SENT',
    };

    setMessages((prev) => [...prev, optimistic]);

    // Try WebSocket first
    const ok = send('send-message', {
      to: peer.id,
      content: text,
      clientId,
    });

    if (!ok) {
      messageService.sendMessageRest(peer.id, text, token).catch(() => {
        alert('Failed to send message');
      });
    }
  };

  return (
    <div className="flex flex-col flex-1 h-screen p-4">
      {/* Header */}
      <div className="border-b pb-3 mb-3">
        <div className="text-lg font-semibold">{peer.displayName || peer.username}</div>
        <div className="text-xs text-gray-500">{peer.publicCode}</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4 pr-2 space-y-2">
        {loading ? (
          <div className="text-gray-500">Loading chat…</div>
        ) : (
          messages.map((msg, idx) => (
            <MessageBubble
              key={msg.id || msg.clientId || idx}
              message={msg}
              isOwn={msg.senderId === user.internalId}
            />
          ))
        )}
      </div>

      {/* Input */}
      <MessageInput onSend={handleSend} />
    </div>
  );
}
