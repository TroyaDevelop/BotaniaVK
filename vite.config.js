import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5174, // Явно укажите порт
    hmr: {
      host: 'localhost',
      protocol: 'ws', // Только ws для разработки
    },
    cors: true,
  },
});