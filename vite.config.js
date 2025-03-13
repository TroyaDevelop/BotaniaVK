import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['gameofbotania.fun'],  // Добавьте ваш домен сюда
    cors: true,  // Включите CORS, если требуется
  },
});