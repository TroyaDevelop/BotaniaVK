import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['gameofbotania.fun'],
    cors: true,
    hmr: false
  }
});