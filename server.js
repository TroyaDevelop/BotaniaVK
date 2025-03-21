const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5173;

// Пути к файлам данных
const SCORES_FILE = path.join(__dirname, 'data', 'scores.json');
const PLANTS_FILE = path.join(__dirname, 'data', 'plants.json');
const RESOURCES_FILE = path.join(__dirname, 'data', 'resources.json');

// Создаем директорию для данных, если она не существует
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Загружаем данные из файлов или создаем пустые объекты
let userScores = {};
let userPlants = {};
let userResources = {};

try {
  // Загружаем результаты
  if (fs.existsSync(SCORES_FILE)) {
    const data = fs.readFileSync(SCORES_FILE, 'utf8');
    userScores = JSON.parse(data);
    console.log('Результаты загружены из файла:', Object.keys(userScores).length, 'записей');
  } else {
    fs.writeFileSync(SCORES_FILE, JSON.stringify({}), 'utf8');
    console.log('Создан новый файл для результатов');
  }

  // Загружаем данные о растениях
  if (fs.existsSync(PLANTS_FILE)) {
    const data = fs.readFileSync(PLANTS_FILE, 'utf8');
    userPlants = JSON.parse(data);
    console.log('Данные о растениях загружены из файла:', Object.keys(userPlants).length, 'записей');
  } else {
    fs.writeFileSync(PLANTS_FILE, JSON.stringify({}), 'utf8');
    console.log('Создан новый файл для данных о растениях');
  }

  // Загружаем данные о ресурсах
  if (fs.existsSync(RESOURCES_FILE)) {
    const data = fs.readFileSync(RESOURCES_FILE, 'utf8');
    userResources = JSON.parse(data);
    console.log('Данные о ресурсах загружены из файла:', Object.keys(userResources).length, 'записей');
  } else {
    fs.writeFileSync(RESOURCES_FILE, JSON.stringify({}), 'utf8');
    console.log('Создан новый файл для данных о ресурсах');
  }
} catch (error) {
  console.error('Ошибка при загрузке данных:', error);
}

// Функции для сохранения данных в файлы
function saveScoresToFile() {
  try {
    fs.writeFileSync(SCORES_FILE, JSON.stringify(userScores, null, 2), 'utf8');
    console.log('Результаты сохранены в файл');
  } catch (error) {
    console.error('Ошибка при сохранении результатов:', error);
  }
}

function savePlantsToFile() {
  try {
    fs.writeFileSync(PLANTS_FILE, JSON.stringify(userPlants, null, 2), 'utf8');
    console.log('Данные о растениях сохранены в файл');
  } catch (error) {
    console.error('Ошибка при сохранении данных о растениях:', error);
  }
}

function saveResourcesToFile() {
  try {
    fs.writeFileSync(RESOURCES_FILE, JSON.stringify(userResources, null, 2), 'utf8');
    console.log('Данные о ресурсах сохранены в файл');
  } catch (error) {
    console.error('Ошибка при сохранении данных о ресурсах:', error);
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

// API эндпоинт - статус сервера
app.get('/api/status', (req, res) => {
  console.log('[API] Status endpoint hit');
  res.json({ status: 'ok', message: 'API работает на порту ' + PORT });
});

// API эндпоинт - сохранение данных о растении
app.post('/api/plant', (req, res) => {
  const { userId, plantData } = req.body;
  console.log(`[API] Сохранение данных о растении для пользователя ${userId}`);
  
  if (!userId) {
    return res.status(400).json({ error: 'Не указан ID пользователя' });
  }
  
  userPlants[userId] = plantData;
  savePlantsToFile();
  
  res.json({ status: 'ok', savedPlant: plantData });
});

// API эндпоинт - получение данных о растении
app.get('/api/plant/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(`[API] Запрос данных о растении для пользователя ${userId}`);
  
  const plantData = userPlants[userId] || null;
  res.json({ status: 'ok', plantData });
});

// API эндпоинт - сохранение данных о ресурсах
app.post('/api/resources', (req, res) => {
  const { userId, resourcesData } = req.body;
  console.log(`[API] Сохранение данных о ресурсах для пользователя ${userId}`);
  
  if (!userId) {
    return res.status(400).json({ error: 'Не указан ID пользователя' });
  }
  
  userResources[userId] = resourcesData;
  saveResourcesToFile();
  
  res.json({ status: 'ok', savedResources: resourcesData });
});

// API эндпоинт - получение данных о ресурсах
app.get('/api/resources/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(`[API] Запрос данных о ресурсах для пользователя ${userId}`);
  
  const resourcesData = userResources[userId] || null;
  res.json({ status: 'ok', resourcesData });
});

// API эндпоинт - сохранение результата
app.post('/api/score', (req, res) => {
  const { userId, score } = req.body;
  console.log(`[API] Сохранение результата: ${score} для пользователя ${userId}`);
  
  if (!userId) {
    return res.status(400).json({ error: 'Не указан ID пользователя' });
  }
  
  // Сохраняем результат, если он лучше предыдущего
  if (!userScores[userId] || score > userScores[userId]) {
    userScores[userId] = score;
    saveScoresToFile();
  }
  
  res.json({ status: 'ok', savedScore: userScores[userId] });
});

// API эндпоинт - получение результата
app.get('/api/score/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(`[API] Запрос результата для пользователя ${userId}`);
  
  const score = userScores[userId] || 0;
  res.json({ status: 'ok', score });
});

// API эндпоинт - получение списка лидеров
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

// Сохраняем данные при завершении работы сервера
process.on('SIGINT', () => {
  console.log('Сервер завершает работу, сохраняем данные...');
  saveScoresToFile();
  savePlantsToFile();
  saveResourcesToFile();
  process.exit();
});