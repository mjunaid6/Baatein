/**
 * endpoints.js
 * Defines API and WebSocket endpoints for Baatein
 *
 * Uses Vite environment variables:
 *   import.meta.env.VITE_API_URL
 *   import.meta.env.VITE_WS_URL
 */

export const API_URL =
  import.meta.env.VITE_API_URL || 'https://api.baatein.app/api/v1';

export const WS_URL =
  import.meta.env.VITE_WS_URL || 'wss://api.baatein.app/ws';
