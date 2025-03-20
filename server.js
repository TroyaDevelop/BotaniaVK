const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5173;

// Middleware
app.use(cors());
app.use(express.json());

// Статические файлы из папки dist (собранные Webpack)
app.use(express.static(path.join(__dirname, 'dist')));

// API эндпоинт
app.get('/api/status', (req, res) => {
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