/**
 * Модель игры - отвечает за хранение и изменение данных игры
 */
export default class GameModel {
    constructor(apiService) {
        this.initialized = false;
        this.apiService = apiService;
        
        // Инициализируем наблюдателей
        this.observers = [];
        
        // Инициализируем данные о растении
        this.plant = {
            growthStage: 0,           // Текущая стадия роста (0-3)
            lastWaterTime: 0,         // Время последнего полива
            waterNeeded: false        // Нуждается ли растение в поливе
        };
        
        // Инициализируем ресурсы игрока
        this.resources = {
            water: 5,                 // Количество доступной воды (обратная совместимость)
            fertilizer: 0,            // Количество удобрений
            seeds: 1                  // Количество семян
        };
        
        // Очки игрока
        this.score = 0;
    }

    // Полив растения
    waterPlant() {
        if (this.resources.water < 10) {
            return false; // Недостаточно воды
        }
        
        // Уменьшаем количество воды
        this.resources.water -= 10;
        
        // Обновляем время последнего полива
        this.plant.lastWaterTime = Date.now();
        this.plant.waterNeeded = false;
        
        // Увеличиваем стадию роста, если это возможно
        if (this.plant.growthStage < 3) {
            this.plant.growthStage++;
        }
        
        // Уведомляем наблюдателей
        this.notifyObservers('plantWatered', this.plant);
        this.notifyObservers('resourcesChanged', this.resources);
        
        return true;
    }

    // Проверка и обновление состояния растения
    updatePlantState() {
        const hoursSinceLastWatering = (Date.now() - this.plant.lastWaterTime) / (1000 * 60 * 60);
        
        // Если прошло более 6 часов без полива, растение нуждается в поливе
        if (hoursSinceLastWatering > 6) {
            this.plant.waterNeeded = true;
        }
        
        // Если прошло более 24 часов без полива, растение увядает
        if (hoursSinceLastWatering > 24 && this.plant.growthStage > 0) {
            this.plant.growthStage--;
            this.plant.lastWaterTime = Date.now(); // Сброс таймера
            
            // Уведомляем наблюдателей
            this.notifyObservers('plantChanged', this.plant);
        }
        
        return this.plant;
    }

    // Автоматическое пополнение воды со временем
    updateWaterResource() {
        const hoursSinceLastRefill = (Date.now() - this.resources.lastWaterRefillTime) / (1000 * 60 * 60);
        
        // Пополняем воду на 10% каждый час
        if (hoursSinceLastRefill >= 1) {
            const hoursElapsed = Math.floor(hoursSinceLastRefill);
            const waterToAdd = hoursElapsed * 10;
            
            this.resources.water = Math.min(100, this.resources.water + waterToAdd);
            this.resources.lastWaterRefillTime = Date.now();
            
            // Уведомляем наблюдателей
            this.notifyObservers('resourcesChanged', this.resources);
        }
        
        return this.resources;
    }

    // Получение текущего состояния растения
    getPlantState() {
        return { ...this.plant };
    }

    // Получение текущих ресурсов
    getResources() {
        return { ...this.resources };
    }

    // Установка данных о растении (например, при загрузке с сервера)
    setPlantData(plantData) {
        this.plant = { ...this.plant, ...plantData };
        this.notifyObservers('plantChanged', this.plant);
    }

    // Установка данных о ресурсах
    setResourcesData(resourcesData) {
        this.resources = { ...this.resources, ...resourcesData };
        this.notifyObservers('resourcesChanged', this.resources);
    }

    // Сохранение текущего состояния игры
    saveGameState() {
        return {
            plant: this.plant,
            resources: this.resources,
            score: this.score
        };
    }

    // Загрузка состояния игры
    loadGameState(gameState) {
        if (gameState.plant) {
            this.plant = gameState.plant;
        }
        
        if (gameState.resources) {
            this.resources = gameState.resources;
        }
        
        if (gameState.score) {
            this.score = gameState.score;
        }
        
        this.notifyObservers('plantChanged', this.plant);
        this.notifyObservers('resourcesChanged', this.resources);
        this.notifyObservers('scoreChanged', this.score);
    }

    // Сохранение данных пользователя через API
    saveUserData(data) {
        if (!this.initialized) {
            console.warn('Попытка сохранить данные без инициализации модели');
            return;
        }
        
        // Если мы в тестовом режиме, имитируем сохранение
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Тестовый режим: данные сохранены локально', data);
            localStorage.setItem('userGameData', JSON.stringify(data));
            return Promise.resolve(true);
        }
        
        // Здесь будет реальный запрос к API для сохранения данных
        // Например:
        return this.apiService.saveUserData(data)
            .then(() => {
                console.log('Данные пользователя успешно сохранены');
                return true;
            })
            .catch(error => {
                console.error('Ошибка при сохранении данных пользователя:', error);
                return false;
            });
    }

    // Загрузка данных пользователя через API
    loadUserData() {
        // Если мы в тестовом режиме, имитируем загрузку
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            const savedData = localStorage.getItem('userGameData');
            if (savedData) {
                try {
                    const data = JSON.parse(savedData);
                    console.log('Тестовый режим: данные загружены локально', data);
                    
                    // Обновляем данные в модели
                    if (data.plant) this.plant = { ...this.plant, ...data.plant };
                    if (data.resources) this.resources = { ...this.resources, ...data.resources };
                    
                    return Promise.resolve(data);
                } catch (e) {
                    console.error('Ошибка при загрузке локальных данных:', e);
                    return Promise.resolve(null);
                }
            }
            return Promise.resolve(null);
        }
        
        // Здесь будет реальный запрос к API для загрузки данных
        // Например:
        return this.apiService.loadUserData()
            .then(data => {
                if (data) {
                    // Обновляем данные в модели
                    if (data.plant) this.plant = { ...this.plant, ...data.plant };
                    if (data.resources) this.resources = { ...this.resources, ...data.resources };
                    
                    console.log('Данные пользователя успешно загружены', data);
                }
                return data;
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных пользователя:', error);
                return null;
            });
    }

    // Базовые методы из предыдущей версии
    incrementScore(value = 1) {
        this.score += value;
        this.notifyObservers('scoreChanged', this.score);
        return this.score;
    }

    getScore() {
        return this.score;
    }

    setScore(score) {
        this.score = score;
        this.notifyObservers('scoreChanged', this.score);
        return this.score;
    }

    resetScore() {
        this.score = 0;
        this.notifyObservers('scoreChanged', this.score);
        return this.score;
    }

    setInitialized(value) {
        this.initialized = value;
    }

    isInitialized() {
        return this.initialized;
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(event, data) {
        this.observers.forEach(observer => {
            if (observer.update) {
                observer.update(event, data);
            }
        });
    }
}