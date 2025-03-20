// Импорт стилей
import './styles.css';

// Импорт функций из app.js
import { 
    initVKBridge, 
    getUserInfo, 
    initGame, 
    postToWall, 
    initShareButton 
} from './app.js';

// Инициализируем приложение после загрузки DOM
document.addEventListener('DOMContentLoaded', async () => {
    // Инициализация VK Bridge
    initVKBridge();
    
    // Получаем информацию о пользователе
    const userData = await getUserInfo();
    
    // Инициализируем игру
    initGame(userData);
    
    // Инициализируем кнопку "Поделиться"
    initShareButton();
    
    // Экспортируем в window для доступности из других скриптов или консоли
    window.postToWall = postToWall;
});