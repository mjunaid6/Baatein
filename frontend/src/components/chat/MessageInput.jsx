import React, { useState } from 'react';

/**
 * MessageInput:
 * - Handles typing and sending messages
 */

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border p-2 rounded"
        placeholder="Type a message…"
      />
      <button className="bg-blue-600 text-white px-4 rounded">Send</button>
    </form>
  );
}
