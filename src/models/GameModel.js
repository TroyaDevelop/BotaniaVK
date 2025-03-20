/**
 * Модель игры - отвечает за хранение и изменение данных игры
 */
export default class GameModel {
    constructor() {
        this.score = 0;        // Текущий счёт
        this.initialized = false;  // Флаг инициализации
        this.observers = [];    // Наблюдатели за изменениями (паттерн Observer)
    }

    // Увеличивает счёт на 1
    incrementScore() {
        this.score++;
        this.notifyObservers('scoreChanged', this.score);
        return this.score;
    }

    // Получает текущий счёт
    getScore() {
        return this.score;
    }

    // Устанавливает счёт
    setScore(score) {
        this.score = score;
        this.notifyObservers('scoreChanged', this.score);
        return this.score;
    }

    // Сбрасывает счёт
    resetScore() {
        this.score = 0;
        this.notifyObservers('scoreChanged', this.score);
        return this.score;
    }

    // Устанавливает флаг инициализации
    setInitialized(value) {
        this.initialized = value;
    }

    // Проверяет, инициализирована ли игра
    isInitialized() {
        return this.initialized;
    }

    // Добавляет наблюдателя за изменениями
    addObserver(observer) {
        this.observers.push(observer);
    }

    // Удаляет наблюдателя
    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Уведомляет наблюдателей об изменениях
    notifyObservers(event, data) {
        this.observers.forEach(observer => {
            if (observer.update) {
                observer.update(event, data);
            }
        });
    }
}