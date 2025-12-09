/**
 * env.js
 * Wrapper for Vite environment variables
 */

export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  wsUrl: import.meta.env.VITE_WS_URL,
  mode: import.meta.env.MODE,

  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD
};
