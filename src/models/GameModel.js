/**
 * Модель игры - отвечает за хранение и изменение данных игры
 */
export default class GameModel {
    constructor() {
        this.score = 0;              // Счёт игрока
        this.initialized = false;    // Флаг инициализации игры
        this.observers = [];         // Наблюдатели за изменениями
        
        // Данные о цветке
        this.plant = {
            growthStage: 0,          // Текущая стадия роста (0-3)
            lastWaterTime: 0,        // Время последнего полива
            waterNeeded: false,      // Флаг необходимости полива
            type: 'default'          // Тип цветка
        };
        
        // Ресурсы игрока
        this.resources = {
            water: 100,              // Количество воды для полива
            lastWaterRefillTime: 0   // Время последнего пополнения воды
        };
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