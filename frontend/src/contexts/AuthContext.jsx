import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * AuthContext
 * - stores `user` and `token` (access token)
 * - exposes login(user, token), logout(), updateUser()
 * - persists to localStorage
 *
 * Expected user shape (example):
 * {
 *   internalId: 72,
 *   username: 'junaid',
 *   displayName: 'Junaid',
 *   publicCode: 'A1B2C3',
 *   role: 'USER'
 * }
 */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('baatein_user')) || null;
    } catch (e) {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('baatein_token') || null);

  useEffect(() => {
    if (user) localStorage.setItem('baatein_user', JSON.stringify(user));
    else localStorage.removeItem('baatein_user');
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem('baatein_token', token);
    else localStorage.removeItem('baatein_token');
  }, [token]);

  function login(userObj, accessToken) {
    setUser(userObj);
    setToken(accessToken);
  }

  function logout() {
    setUser(null);
    setToken(null);
    // optionally revoke refresh token via API here
  }

  function updateUser(patch) {
    setUser(prev => ({ ...prev, ...patch }));
  }

  const value = {
    user,
    token,
    login,
    logout,
    updateUser,
    isAuthenticated: !!token && !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
