import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import { WS_URL } from '../config/endpoints'; // or use process.env.REACT_APP_WS_URL

/**
 * SocketContext
 * - Connects a native WebSocket to your WS endpoint with token auth
 * - Provides send(type, data) and on(type, fn) and off(type, fn)
 * - Reconnects with exponential backoff on unexpected close
 * - Keeps listeners in a map: eventType -> Set<fn>
 *
 * Message envelope (frontend -> backend and vice-versa):
 * { type: 'event-type', data: { ... } }
 *
 * NOTE: This is intentionally minimal and plain-WS. If you want STOMP/SockJS,
 * replace with stompjs + sockjs-client logic.
 */

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { token, user, logout } = useAuth();
  const wsRef = useRef(null);
  const listenersRef = useRef(new Map()); // eventType -> Set of fns
  const [connected, setConnected] = useState(false);
  const retryRef = useRef({ attempts: 0, timeoutId: null });

  // helper to call listeners
  const emitToListeners = useCallback((type, payload) => {
    const set = listenersRef.current.get(type);
    if (!set) return;
    for (const fn of set) {
      try { fn(payload); } catch (e) { console.error('WS listener error', e); }
    }
  }, []);

  // connect function (used on mount / when token changes / on reconnect)
  const connect = useCallback(() => {
    if (!token || !user) return;
    // include token in query string (or use Authorization header via subprotocols if backend supports)
    const url = `${WS_URL}?token=${encodeURIComponent(token)}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      retryRef.current.attempts = 0;
      setConnected(true);
      console.log('[ws] connected');
      // Notify listeners of generic events
      emitToListeners('ws:open', {});
    };

    ws.onmessage = (ev) => {
      let payload;
      try { payload = JSON.parse(ev.data); } catch (e) { console.error('[ws] invalid json', ev.data); return; }
      const { type, data } = payload;
      if (type === 'auth:error') {
        // token invalid — force logout
        console.warn('[ws] auth error, logging out');
        logout();
        return;
      }
      // first call type-specific handlers
      emitToListeners(type, data);
      // also emit generic message event
      emitToListeners('ws:message', payload);
    };

    ws.onclose = (ev) => {
      setConnected(false);
      console.log('[ws] closed', ev.code, ev.reason);
      emitToListeners('ws:close', ev);
      // if abnormal (1006) or not intentional, try reconnect
      if (ev.code !== 1000) {
        // reconnect with backoff
        retryRef.current.attempts += 1;
        const delay = Math.min(30000, 1000 * (2 ** (retryRef.current.attempts - 1))); // exponential up to 30s
        retryRef.current.timeoutId = setTimeout(() => connect(), delay);
      }
    };

    ws.onerror = (err) => {
      console.error('[ws] error', err);
      emitToListeners('ws:error', err);
    };
  }, [token, user, logout, emitToListeners]);

  // establish connection when token/user becomes available
  useEffect(() => {
    if (token && user) connect();
    // cleanup on unmount
    return () => {
      if (retryRef.current.timeoutId) clearTimeout(retryRef.current.timeoutId);
      try {
        const ws = wsRef.current;
        if (ws && ws.readyState === WebSocket.OPEN) ws.close(1000, 'client-unmount');
      } catch (e) { /* ignore */ }
    };
  }, [token, user, connect]);

  // send wrapper
  const send = useCallback((type, data = {}) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      return false;
    }
    const payload = JSON.stringify({ type, data });
    ws.send(payload);
    return true;
  }, []);

  const on = useCallback((type, fn) => {
    if (!listenersRef.current.has(type)) listenersRef.current.set(type, new Set());
    listenersRef.current.get(type).add(fn);
    // return off function
    return () => {
      const set = listenersRef.current.get(type);
      if (!set) return;
      set.delete(fn);
      if (set.size === 0) listenersRef.current.delete(type);
    };
  }, []);

  const off = useCallback((type, fn) => {
    const set = listenersRef.current.get(type);
    if (!set) return;
    set.delete(fn);
    if (set.size === 0) listenersRef.current.delete(type);
  }, []);

  const value = {
    connected,
    send,
    on,
    off,
    raw: wsRef.current
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error('useSocket must be used inside SocketProvider');
  return ctx;
}
