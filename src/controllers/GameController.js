/**
 * Контроллер игры - связывает модель и представление
 */
export default class GameController {
    constructor(gameModel, gameView, userModel, apiService) {
        this.gameModel = gameModel;
        this.gameView = gameView;
        this.userModel = userModel;
        this.apiService = apiService;
        
        // Добавляем представление как наблюдателя модели
        this.gameModel.addObserver(this.gameView);
        
        // Интервал для сохранения прогресса
        this.saveInterval = null;
        
        // Интервал для обновления состояния игры
        this.updateInterval = null;
    }

    // Инициализирует игру с данными пользователя
    initGame() {
        if (this.gameModel.isInitialized()) {
            console.log('Игра уже инициализирована, пропускаем повторную инициализацию');
            return;
        }

        const userData = this.userModel.getUserData();
        console.log('Инициализация игры для пользователя:', userData.id);
        
        // Проверка статуса сервера
        this.apiService.checkStatus()
            .then(data => {
                this.gameView.updateServerStatus(data.message);
            })
            .catch(error => {
                this.gameView.showServerError();
                console.error('Ошибка получения статуса сервера:', error);
            });
        
        // Отрисовываем игру
        this.gameView.render(userData.firstName);
        
        // Инициализируем Phaser
        this.gameView.initPhaser(this.gameModel);
        
        // Загружаем данные о растении пользователя
        this.loadUserGameData();
        
        // Устанавливаем интервал для автосохранения состояния игры
        this.saveInterval = setInterval(() => {
            this.saveUserGameData();
        }, 60000); // Сохраняем каждую минуту
        
        // Устанавливаем интервал для обновления состояния игры
        this.updateInterval = setInterval(() => {
            this.updateGameState();
        }, 5000); // Обновляем каждые 5 секунд
        
        // Отмечаем, что игра инициализирована
        this.gameModel.setInitialized(true);
    }

    // Загружает данные о растении и ресурсах пользователя
    loadUserGameData() {
        const userId = this.userModel.getUserId();
        if (!userId) return;

        // Загружаем данные о растении
        this.apiService.getPlantData(userId)
            .then(plantData => {
                if (plantData) {
                    this.gameModel.setPlantData(plantData);
                }
            })
            .catch(error => console.error('Ошибка загрузки данных о растении:', error));

        // Загружаем данные о ресурсах
        this.apiService.getResourcesData(userId)
            .then(resourcesData => {
                if (resourcesData) {
                    this.gameModel.setResourcesData(resourcesData);
                }
            })
            .catch(error => console.error('Ошибка загрузки данных о ресурсах:', error));

        // Загружаем счет
        this.apiService.getScore(userId)
            .then(score => {
                if (score > 0) {
                    this.gameModel.setScore(score);
                }
            })
            .catch(error => console.error('Ошибка загрузки счета:', error));
    }

    // Сохраняет данные о растении и ресурсах пользователя
    saveUserGameData() {
        const userId = this.userModel.getUserId();
        if (!userId) return;

        const plantData = this.gameModel.getPlantState();
        const resourcesData = this.gameModel.getResources();
        const score = this.gameModel.getScore();

        // Сохраняем данные о растении
        this.apiService.savePlantData(userId, plantData)
            .catch(error => console.error('Ошибка сохранения данных о растении:', error));

        // Сохраняем данные о ресурсах
        this.apiService.saveResourcesData(userId, resourcesData)
            .catch(error => console.error('Ошибка сохранения данных о ресурсах:', error));

        // Сохраняем счет
        this.apiService.saveScore(userId, score)
            .catch(error => console.error('Ошибка сохранения счета:', error));
    }

    // Обновляет состояние игры
    updateGameState() {
        // Обновляем состояние растения
        this.gameModel.updatePlantState();
        
        // Обновляем ресурсы
        this.gameModel.updateWaterResource();
    }

    // Очищает ресурсы при завершении игры
    cleanup() {
        if (this.saveInterval) {
            clearInterval(this.saveInterval);
            this.saveInterval = null;
        }
        
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        
        // Сохраняем данные перед завершением
        this.saveUserGameData();
    }
}