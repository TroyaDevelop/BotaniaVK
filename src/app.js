import vkBridge from '@vkontakte/vk-bridge';

// Импорт моделей
import GameModel from './models/GameModel.js';
import UserModel from './models/UserModel.js';

// Импорт представлений
import GameView from './views/GameView.js';
import UserView from './views/UserView.js';

// Импорт контроллеров
import GameController from './controllers/GameController.js';
import UserController from './controllers/UserController.js';

// Импорт сервисов
import VKService from './services/VKService.js';
import ApiService from './services/ApiService.js';

// Создаем глобальный экземпляр приложения
class App {
    constructor() {
        // Создаем модели
        this.gameModel = new GameModel();
        this.userModel = new UserModel();
        
        // Создаем представления
        this.gameView = new GameView();
        this.userView = new UserView();
        
        // Создаем сервисы
        this.vkService = new VKService();
        this.apiService = new ApiService();
        
        // Создаем контроллеры
        this.userController = new UserController(this.userModel, this.userView, this.vkService);
        this.gameController = new GameController(this.gameModel, this.gameView, this.userModel, this.apiService);
        
        // Инициализируем кнопку "Поделиться"
        this.initShareButton();
    }

    // Инициализирует кнопку "Поделиться"
    initShareButton() {
        const shareButton = document.getElementById('share-button');
        if (shareButton) {
            shareButton.addEventListener('click', () => {
                this.userController.postToWall(this.gameModel.getScore());
            });
        }
    }

    // Запускает приложение
    async start() {
        try {
            // Загружаем информацию о пользователе
            await this.userController.loadUserInfo();
            
            // Инициализируем игру
            this.gameController.initGame();
            
            // Делаем доступным метод публикации через window
            window.postToWall = () => {
                this.userController.postToWall(this.gameModel.getScore());
            };
            
            console.log('Приложение успешно запущено');
        } catch (error) {
            console.error('Ошибка запуска приложения:', error);
        }
    }
}

// Экспортируем функцию для инициализации приложения
export function initApp() {
    const app = new App();
    app.start();
    return app;
}

// Экспортируем фабрику для тестов
export function createApp() {
    return new App();
}