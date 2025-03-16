import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['gameofbotania.fun'],
    hmr: false,  // Отключаем HMR
    cors: true
  },
});