import React from 'react';

/**
 * MessageBubble: renders an incoming or outgoing message.
 * Props:
 *  - message
 *  - isOwn (boolean)
 */

export default function MessageBubble({ message, isOwn }) {
  return (
    <div
      className={`max-w-xs p-2 rounded text-sm shadow-sm ${
        isOwn
          ? 'self-end bg-blue-600 text-white'
          : 'self-start bg-white text-gray-900'
      }`}
    >
      <div>{message.content}</div>

      <div
        className={`text-[10px] mt-1 ${
          isOwn ? 'text-gray-200' : 'text-gray-400'
        }`}
      >
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  );
}
