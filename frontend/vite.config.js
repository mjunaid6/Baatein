import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    global: 'window',
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/auth": {
        target: "http://10.71.139.32:8080",
        changeOrigin: true,
        secure: false,
      },
      "/ws": {
        target: "ws://10.71.139.32:8080",
        ws: true,
      },
    },
  }
})
