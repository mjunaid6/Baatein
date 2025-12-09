import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { adminService } from '../../services/adminService';

/**
 * UserRow
 * Shows a user + admin controls
 *
 * Controls:
 *  - Send message (popup)
 *  - Deactivate user
 */

export default function UserRow({ user, refresh }) {
  const { token } = useAuth();
  const [showMsgBox, setShowMsgBox] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  async function sendMessage() {
    if (!message.trim()) return alert('Enter a message');
    setSending(true);
    try {
      await adminService.messageUser(user.id, message.trim(), token);
      alert('Message sent!');
      setMessage('');
      setShowMsgBox(false);
    } catch (err) {
      alert('Failed: ' + err.message);
    }
    setSending(false);
  }

  async function deactivate() {
    if (!confirm('Deactivate this user?')) return;
    try {
      await adminService.deactivateUser(user.id, token);
      refresh();
    } catch (err) {
      alert('Failed to deactivate: ' + err.message);
    }
  }

  return (
    <div className="p-3 bg-white rounded shadow-sm border flex flex-col gap-2">
      <div className="flex justify-between">
        <div>
          <div className="font-medium">{user.displayName || user.username}</div>
          <div className="text-xs text-gray-500">{user.publicCode}</div>
        </div>

        <div className="text-xs text-gray-500">
          {user.isActive ? 'Active' : 'Inactive'}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-1">
        <button
          className="px-2 py-1 bg-blue-600 text-white rounded text-sm"
          onClick={() => setShowMsgBox(!showMsgBox)}
        >
          Message
        </button>

        <button
          className="px-2 py-1 bg-red-600 text-white rounded text-sm"
          onClick={deactivate}
        >
          Deactivate
        </button>
      </div>

      {/* Message Box */}
      {showMsgBox && (
        <div className="mt-2 flex flex-col gap-2">
          <textarea
            className="border p-2 rounded w-full text-sm"
            rows="3"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button
            className="bg-green-600 text-white py-1 rounded text-sm"
            disabled={sending}
            onClick={sendMessage}
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
      )}
    </div>
  );
}
