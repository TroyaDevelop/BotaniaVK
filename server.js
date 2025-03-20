const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5173;

// Временное хранилище результатов
const userScores = {};

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

// API эндпоинт для сохранения результата
app.post('/api/score', (req, res) => {
  const { userId, score } = req.body;
  console.log(`[API] Сохранение результата: ${score} для пользователя ${userId}`);
  
  if (!userId) {
    return res.status(400).json({ error: 'Не указан ID пользователя' });
  }
  
  // Сохраняем результат, если он лучше предыдущего
  if (!userScores[userId] || score > userScores[userId]) {
    userScores[userId] = score;
  }
  
  res.json({ status: 'ok', savedScore: userScores[userId] });
});

// API эндпоинт для получения результата
app.get('/api/score/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(`[API] Запрос результата для пользователя ${userId}`);
  
  const score = userScores[userId] || 0;
  res.json({ status: 'ok', score });
});

// API эндпоинт для получения списка лидеров
app.get('/api/leaderboard', (req, res) => {
  console.log('[API] Запрос таблицы лидеров');
  
  const leaderboard = Object.entries(userScores)
    .map(([userId, score]) => ({ userId, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // Top 10
  
  res.json({ status: 'ok', leaderboard });
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