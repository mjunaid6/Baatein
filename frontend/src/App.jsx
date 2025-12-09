import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';

import Login from './pages/Login';
import Register from './pages/Register';
import ChatPage from './pages/ChatPage';

/**
 * AppWithProviders wraps AuthProvider and SocketProvider around AppContent.
 */
function AppWithProviders() {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppContent />
      </SocketProvider>
    </AuthProvider>
  );
}

export default AppWithProviders;

/**
 * AppContent:
 * Decides what to show based on authentication status.
 */
function AppContent() {
  const { user, token } = useAuth();
  const [view, setView] = useState('login'); // 'login', 'register', 'chat'

  useEffect(() => {
    if (user && token) {
      setView('chat');
    } else {
      setView('login');
    }
  }, [user, token]);

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16">
        <Login />

        <button
          className="mt-4 text-blue-600 underline"
          onClick={() => setView('register')}
        >
          Create an account
        </button>
      </div>
    );
  }

  if (view === 'register') {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
        <Register />

        <button
          className="mt-4 text-blue-600 underline"
          onClick={() => setView('login')}
        >
          Back to login
        </button>
      </div>
    );
  }

  // Default authenticated view
  return <ChatPage />;
}
