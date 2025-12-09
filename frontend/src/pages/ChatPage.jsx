import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import FriendsSidebar from '../components/friends/FriendsSidebar';
import ChatWindow from '../components/chat/ChatWindow';
import AdminPanel from '../components/admin/AdminPanel';

export default function ChatPage() {
  const { user } = useAuth();
  const [peer, setPeer] = useState(null);

  return (
    <div className="flex h-screen">
      {/* Friends */}
      <FriendsSidebar onSelectConversation={(f) => setPeer(f)} />

      {/* Chat Area */}
      {peer ? (
        <ChatWindow peer={peer} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select a friend to start chatting
        </div>
      )}

      {/* Admin Sidebar */}
      {user?.role === 'ADMIN' && (
        <div className="w-80 border-l p-4 bg-white overflow-y-auto">
          <AdminPanel />
        </div>
      )}
    </div>
  );
}
