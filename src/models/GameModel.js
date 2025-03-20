/**
 * Модель игры - отвечает за хранение и изменение данных игры
 */
export default class GameModel {
    constructor() {
        this.score = 0;        // Текущий счёт
        this.initialized = false;  // Флаг инициализации
        this.observers = [];    // Наблюдатели за изменениями (паттерн Observer)
        this.purchases = {         // Покупки пользователя
            chickenCoop: 0         // Количество купленных курятников
        };
        
        // Список товаров в магазине
        this.shopItems = {
            chickenCoop: {
                id: 'chickenCoop',
                name: 'Курятник',
                description: 'Автоматически добавляет +1 очко каждые 5 секунд',
                basePrice: 50,     // Базовая цена
                priceFactor: 1.5,  // Множитель увеличения цены
                image: 'https://i.ibb.co/CzF8DY0/chicken-coop.png', // URL изображения
                effect: {
                    pointsPerSecond: 0.2  // Добавляет 0.2 очка в секунду (1 очко за 5 секунд)
                }
            }
        };
        
        // Таймер для автоматического начисления очков
        this.autoClickInterval = null;
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

    startAutoClick() {
        // Останавливаем предыдущий таймер, если был
        if (this.autoClickInterval) {
            clearInterval(this.autoClickInterval);
        }
        
        // Рассчитываем суммарное количество очков в секунду от всех покупок
        const pointsPerSecond = this.calculatePointsPerSecond();
        
        if (pointsPerSecond > 0) {
            // Запускаем таймер, который добавляет очки каждую секунду
            this.autoClickInterval = setInterval(() => {
                this.addScore(pointsPerSecond);
            }, 1000);
        }
    }

    calculatePointsPerSecond() {
        let pointsPerSecond = 0;
        
        // Курятники
        if (this.purchases.chickenCoop > 0) {
            pointsPerSecond += this.purchases.chickenCoop * this.shopItems.chickenCoop.effect.pointsPerSecond;
        }
        
        return pointsPerSecond;
    }

    getShopItem(itemId) {
        return this.shopItems[itemId];
    }

    getShopItems() {
        return this.shopItems;
    }

    getPurchases() {
        return this.purchases;
    }

    getItemPrice(itemId) {
        const item = this.shopItems[itemId];
        if (!item) return 0;
        
        // Рассчитываем цену с учетом уже купленных товаров
        const quantity = this.purchases[itemId] || 0;
        return Math.floor(item.basePrice * Math.pow(item.priceFactor, quantity));
    }

    buyItem(itemId) {
        const item = this.shopItems[itemId];
        if (!item) return false;
        
        const price = this.getItemPrice(itemId);
        
        // Проверяем, достаточно ли очков
        if (this.score < price) return false;
        
        // Вычитаем стоимость
        this.score -= price;
        
        // Увеличиваем количество купленных товаров
        this.purchases[itemId] = (this.purchases[itemId] || 0) + 1;
        
        // Уведомляем об изменениях
        this.notifyObservers('scoreChanged', this.score);
        this.notifyObservers('purchaseChanged', { itemId, quantity: this.purchases[itemId] });
        
        // Запускаем автоклик, если это первая покупка
        if (this.autoClickInterval === null) {
            this.startAutoClick();
        } else {
            // Перезапускаем с новыми параметрами
            this.startAutoClick();
        }
        
        return true;
    }

    addScore(amount) {
        this.score += amount;
        // Округляем до 1 десятичного знака для отображения
        this.score = Math.round(this.score * 10) / 10;
        this.notifyObservers('scoreChanged', this.score);
        return this.score;
    }

    setPurchases(purchases) {
        this.purchases = purchases;
        this.notifyObservers('purchasesLoaded', this.purchases);
        
        // Запускаем автоклик после загрузки
        this.startAutoClick();
    }
}