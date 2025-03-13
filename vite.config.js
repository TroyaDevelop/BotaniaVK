import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['gameofbotania.fun'],  // Ваш домен
    cors: true,  // Включите CORS, если необходимо
    hmr: {
      protocol: 'wss',  // Убедитесь, что используете безопасный протокол
      host: 'gameofbotania.fun',  // Указываем домен
      port: 5173,  // Убедитесь, что порт совпадает с портом вашего локального сервера
    },
  },
});