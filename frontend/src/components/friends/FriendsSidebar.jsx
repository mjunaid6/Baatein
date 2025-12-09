import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';
import { friendService } from '../../services/friendService';
import FriendListItem from './FriendListItem';
import FriendRequests from './FriendRequests';

export default function FriendsSidebar({ onSelectConversation }) {
  const { user, token } = useAuth();
  const socket = useSocket();

  const [friends, setFriends] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [code, setCode] = useState('');
  const [loadingAdd, setLoadingAdd] = useState(false);

  // Fetch friends + requests on load
  useEffect(() => {
    if (!user || !token) return;
    loadUserData();

    // real-time incoming friend request
    const unsubReq = socket.on('friend-request', (data) => {
      setIncoming((prev) => [data, ...prev]);
    });

    // real-time friend accepted
    const unsubAccept = socket.on('friend-accepted', () => {
      loadUserData();
    });

    return () => {
      unsubReq();
      unsubAccept();
    };
  }, [user, token]);

  async function loadUserData() {
    try {
      const me = await friendService.getMe(token);
      setFriends(me.friends || []);
      setIncoming(me.friendRequests?.incoming || []);
      setOutgoing(me.friendRequests?.outgoing || []);
    } catch (err) {
      console.error('Failed loading user info:', err);
    }
  }

  async function handleAddFriend(e) {
    e.preventDefault();
    if (!code || code.length !== 6) {
      alert('Enter a valid 6-character code');
      return;
    }
    setLoadingAdd(true);
    try {
      await friendService.sendRequest(code, token);

      // Optimistic outgoing
      setOutgoing((prev) => [
        { toCode: code, status: 'PENDING', createdAt: new Date().toISOString() },
        ...prev,
      ]);

      setCode('');
    } catch (err) {
      alert('Error sending request: ' + err.message);
    }
    setLoadingAdd(false);
  }

  return (
    <div className="w-80 min-h-screen p-4 bg-gray-50 border-r overflow-y-auto">
      {/* User */}
      <div className="mb-4">
        <div className="font-semibold text-lg">{user.displayName || user.username}</div>
        <div className="text-sm text-gray-500">
          Code: <span className="font-mono">{user.publicCode}</span>
        </div>
      </div>

      {/* Add Friend */}
      <form onSubmit={handleAddFriend} className="mb-5">
        <label className="text-sm font-medium">Add friend by code</label>
        <div className="flex gap-2 mt-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={6}
            className="flex-1 border p-2 rounded"
            placeholder="A1B2C3"
          />
          <button
            className="bg-blue-600 text-white px-3 rounded"
            disabled={loadingAdd}
          >
            {loadingAdd ? '...' : 'Add'}
          </button>
        </div>
      </form>

      {/* Friend Requests */}
      <FriendRequests
        incoming={incoming}
        outgoing={outgoing}
        refresh={loadUserData}
      />

      {/* Friends List */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-2">Friends</h4>
        <ul className="space-y-2">
          {friends.map((f) => (
            <li key={f.id}>
              <FriendListItem friend={f} onClick={() => onSelectConversation(f)} />
            </li>
          ))}
          {friends.length === 0 && (
            <div className="text-xs text-gray-500">No friends yet</div>
          )}
        </ul>
      </div>
    </div>
  );
}
