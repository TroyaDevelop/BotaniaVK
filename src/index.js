// Импорт стилей
import './styles.css';

// Импорт инициализатора приложения
import { initApp } from './app.js';

// Инициализируем приложение после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});