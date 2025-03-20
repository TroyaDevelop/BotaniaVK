const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5173;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// Важно: устанавливаем Content-Type для API
app.use('/api', (req, res, next) => {
  res.set('Content-Type', 'application/json');
  next();
});

// API эндпоинт - должен быть определен ДО static и маршрута '*'
app.get('/api/status', (req, res) => {
  console.log('[API] Status endpoint hit');
  res.json({ status: 'ok', message: 'API работает на порту ' + PORT });
});

// Статические файлы ПОСЛЕ API маршрутов
app.use(express.static(path.join(__dirname, 'dist')));

// Все остальные GET-запросы перенаправляем на index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Запуск сервера
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express сервер запущен на порту ${PORT} (0.0.0.0)`);
  console.log(`API доступен по адресу http://localhost:${PORT}/api/status`);
});