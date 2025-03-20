const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5173;

// Путь к файлу с результатами
const SCORES_FILE = path.join(__dirname, 'data', 'scores.json');

// Создаем директорию для данных, если она не существует
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Загружаем результаты из файла или создаем пустой объект
let userScores = {};
try {
  if (fs.existsSync(SCORES_FILE)) {
    const data = fs.readFileSync(SCORES_FILE, 'utf8');
    userScores = JSON.parse(data);
    console.log('Результаты загружены из файла:', Object.keys(userScores).length, 'записей');
  } else {
    // Создаем пустой файл, если он не существует
    fs.writeFileSync(SCORES_FILE, JSON.stringify({}), 'utf8');
    console.log('Создан новый файл для результатов');
  }
} catch (error) {
  console.error('Ошибка при загрузке результатов:', error);
}

// Функция для сохранения результатов в файл
function saveScoresToFile() {
  try {
    fs.writeFileSync(SCORES_FILE, JSON.stringify(userScores, null, 2), 'utf8');
    console.log('Результаты сохранены в файл');
  } catch (error) {
    console.error('Ошибка при сохранении результатов:', error);
  }
}

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
    // Сохраняем в файл при каждом обновлении
    saveScoresToFile();
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

// API эндпоинт для сброса всех результатов (для тестирования)
app.delete('/api/scores/reset', (req, res) => {
  console.log('[API] Сброс всех результатов');
  userScores = {};
  saveScoresToFile();
  res.json({ status: 'ok', message: 'Все результаты сброшены' });
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

// Сохраняем результаты при завершении работы сервера
process.on('SIGINT', () => {
  console.log('Сервер завершает работу, сохраняем результаты...');
  saveScoresToFile();
  process.exit();
});