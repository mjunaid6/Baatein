import React, { useState } from 'react';
import { authService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [usernameOrEmail, setUserInput] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await authService.login(usernameOrEmail, password);
      login(data.user, data.accessToken);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-24 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

      <form onSubmit={handleLogin}>
        <label className="block mb-3">
          Username or Email
          <input
            className="w-full mt-1 p-2 border rounded"
            value={usernameOrEmail}
            onChange={(e) => setUserInput(e.target.value)}
            required
          />
        </label>

        <label className="block mb-3">
          Password
          <input
            type="password"
            className="w-full mt-1 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
