import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { friendService } from '../../services/friendService';

/**
 * FriendRequests Component
 * Handles:
 * - Incoming requests (accept / reject)
 * - Outgoing requests (pending)
 */

export default function FriendRequests({ incoming, outgoing, refresh }) {
  const { token } = useAuth();

  async function accept(id) {
    await friendService.acceptRequest(id, token);
    refresh();
  }

  async function reject(id) {
    await friendService.rejectRequest(id, token);
    refresh();
  }

  return (
    <div>
      {/* Incoming */}
      <h4 className="text-sm font-semibold mb-1">Incoming Requests</h4>
      <ul className="space-y-2 mb-4">
        {incoming.length === 0 && (
          <div className="text-xs text-gray-500">No incoming requests</div>
        )}
        {incoming.map((req) => (
          <li
            key={req.id}
            className="bg-white p-3 rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{req.requester.displayName || req.requester.username}</div>
              <div className="text-xs text-gray-500">
                {new Date(req.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="px-2 py-1 bg-green-600 text-white rounded"
                onClick={() => accept(req.id)}
              >
                Accept
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => reject(req.id)}
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Outgoing */}
      <h4 className="text-sm font-semibold mb-1">Outgoing Requests</h4>
      <ul className="space-y-2">
        {outgoing.length === 0 && (
          <div className="text-xs text-gray-500">No outgoing requests</div>
        )}
        {outgoing.map((req, idx) => (
          <li key={idx} className="bg-white p-3 rounded shadow-sm">
            <div className="font-medium">To: {req.toCode}</div>
            <div className="text-xs text-gray-500">{req.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
