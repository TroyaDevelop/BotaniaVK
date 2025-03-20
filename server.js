const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5173; // Оставляем 5173 для Express

// Middleware
app.use(cors({
  origin: '*', // Разрешаем запросы с любого источника для разработки
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Для отладки запросов
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Статические файлы из папки dist (собранные Webpack)
app.use(express.static(path.join(__dirname, 'dist')));

// API эндпоинт
app.get('/api/status', (req, res) => {
  console.log('API status endpoint hit');
  res.json({ status: 'ok', message: 'API работает' });
});

// Все остальные GET-запросы перенаправляем на index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});