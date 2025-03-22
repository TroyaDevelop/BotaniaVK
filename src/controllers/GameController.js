/**
 * Контроллер игры - связывает модель и представление
 */
export default class GameController {
    constructor(gameModel, gameView, userModel, apiService) {
        this.gameModel = gameModel;
        this.gameView = gameView;
        this.userModel = userModel;
        this.apiService = apiService;
        
        // Устанавливаем apiService в модель, если он отсутствует
        if (this.gameModel && !this.gameModel.apiService) {
            this.gameModel.apiService = this.apiService;
        }
        
        // Добавляем представление как наблюдателя модели
        this.gameModel.addObserver(this.gameView);
        
        // Интервал для сохранения прогресса
        this.saveInterval = null;
        
        // Интервал для обновления состояния игры
        this.updateInterval = null;
    }

    // Инициализирует игровую модель и интерфейс
    async initGame() {
        try {
            // Сначала загружаем данные пользователя, если метод доступен
            if (typeof this.gameModel.loadUserData === 'function') {
                await this.gameModel.loadUserData();
            } else {
                // Альтернативная загрузка данных
                await this.loadUserGameData();
            }
            
            // Затем инициализируем игровой интерфейс
            const userName = this.userModel.getUserData().first_name || 'Гость';
            this.gameView.render(userName);
            
            // И наконец инициализируем Phaser
            this.gameView.initPhaser(this.gameModel);
            
            // Добавляем представление как наблюдателя модели
            this.gameModel.addObserver(this.gameView);
            
            console.log('Игра успешно инициализирована');
            
            // Устанавливаем флаг инициализации
            this.gameModel.setInitialized(true);
            
            return true;
        } catch (error) {
            console.error('Ошибка инициализации игры:', error);
            return false;
        }
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
            .catch(error => {
                console.error('Ошибка загрузки данных о растении:', error);
                // При ошибке используем локальные данные
                this.loadLocalPlantData();
            });

        // Загружаем данные о ресурсах
        this.apiService.getResourcesData(userId)
            .then(resourcesData => {
                if (resourcesData) {
                    this.gameModel.setResourcesData(resourcesData);
                }
            })
            .catch(error => {
                console.error('Ошибка загрузки данных о ресурсах:', error);
                // При ошибке используем локальные данные
                this.loadLocalResourcesData();
            });

        // Загружаем счет
        this.apiService.getScore(userId)
            .then(score => {
                if (score > 0) {
                    this.gameModel.setScore(score);
                }
            })
            .catch(error => {
                console.error('Ошибка загрузки счета:', error);
            });
    }

    // Загружает данные о растении из localStorage
    loadLocalPlantData() {
        const savedData = localStorage.getItem('plantData');
        
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.gameModel.setPlantData(data);
                console.log('Данные о растении загружены из localStorage');
            } catch (e) {
                console.error('Ошибка при парсинге данных о растении из localStorage:', e);
            }
        }
    }

    // Загружает данные о ресурсах из localStorage
    loadLocalResourcesData() {
        const savedData = localStorage.getItem('resourcesData');
        
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.gameModel.setResourcesData(data);
                console.log('Данные о ресурсах загружены из localStorage');
            } catch (e) {
                console.error('Ошибка при парсинге данных о ресурсах из localStorage:', e);
            }
        }
    }

    // Сохраняет данные о растении и ресурсах пользователя
    saveUserGameData() {
        const userId = this.userModel.getUserId();
        if (!userId) return;

        const plantData = this.gameModel.getPlantState();
        const resourcesData = this.gameModel.getResources();
        const score = this.gameModel.getScore();

        // Сохраняем локально в любом случае
        localStorage.setItem('plantData', JSON.stringify(plantData));
        localStorage.setItem('resourcesData', JSON.stringify(resourcesData));
        localStorage.setItem('score', JSON.stringify(score));

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