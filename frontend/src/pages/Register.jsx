import React, { useState } from 'react';
import { authService } from '../services/authService';

export default function Register() {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      await authService.register(username, displayName, password);
      setMsg('Registration successful! You can now log in.');
      setUsername('');
      setDisplayName('');
      setPassword('');
    } catch (err) {
      setMsg('Error: ' + err.message);
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Register</h2>

      {msg && <div className="text-sm mb-2">{msg}</div>}

      <form onSubmit={handleRegister}>
        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />

        <input
          className="w-full border p-2 rounded mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="w-full bg-green-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
