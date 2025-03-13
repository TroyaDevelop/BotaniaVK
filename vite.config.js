import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: ['gameofbotania.fun'],  // Добавьте ваш домен сюда
    cors: true,  // Включите CORS, если требуется
    hmr: {
      clientPort: 443
    }
  }
});