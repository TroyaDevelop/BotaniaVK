import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    port: 5173, // Явно укажите порт
    hmr: {
      host: 'localhost',
      protocol: 'ws', // Только ws для разработки
    },
    allowedHosts: 'all',
    cors: true
  },
});