import React from 'react';

/**
 * FriendListItem
 * Props:
 *  - friend: user object
 *  - onClick: callback when selected
 */

export default function FriendListItem({ friend, onClick }) {
  return (
    <div
      className="bg-white p-3 rounded shadow-sm cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <div className="font-medium">{friend.displayName || friend.username}</div>
      <div className="text-xs text-gray-500">{friend.publicCode}</div>
    </div>
  );
}
