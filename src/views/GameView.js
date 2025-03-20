/**
 * Представление игры - отвечает за отображение игры на экране
 */
export default class GameView {
    constructor() {
        this.gameElement = document.getElementById('game');
        this.clickHandler = null;
        this.buyHandlers = {}; // Хранение обработчиков покупки для разных товаров
    }

    // Инициализация игрового интерфейса
    render(userName) {
        if (!this.gameElement) return;

        this.gameElement.innerHTML = `
            <div>
                <p>Игра запущена для игрока ${userName}!</p>
                <div id="game-canvas" style="width: 100%; height: 300px; background-color: #f0f0f0; border: 1px solid #ccc; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <h2 id="click-counter">Счёт: 0</h2>
                    <button id="click-button" class="big-button">Нажми меня!</button>
                </div>
                <div id="leaderboard" style="margin-top: 20px; padding: 10px; background-color: white; border-radius: 5px;">
                    <h3>Таблица лидеров</h3>
                    <div id="leaderboard-content">Загрузка таблицы лидеров...</div>
                </div>
                <div id="shop" style="margin-top: 20px;">
                    <h3>Магазин</h3>
                    <div id="shop-items" class="shop-container">
                        <!-- Товары будут добавлены динамически -->
                    </div>
                </div>
            </div>
        `;
        
        // Находим кнопку после рендера
        this.setupClickButton();
    }

    // Настройка кнопки клика
    setupClickButton() {
        const clickButton = document.getElementById('click-button');
        if (clickButton && this.clickHandler) {
            clickButton.addEventListener('click', this.clickHandler);
        }
    }

    // Устанавливает обработчик клика на кнопку
    setClickHandler(handler) {
        this.clickHandler = handler;
        this.setupClickButton();
    }

    // Обновляет счетчик кликов
    updateScore(score) {
        const counterElement = document.getElementById('click-counter');
        if (counterElement) {
            counterElement.textContent = `Счёт: ${score}`;
        }
    }

    // Применяет анимацию клика
    animateClick() {
        const button = document.getElementById('click-button');
        if (button) {
            button.classList.add('button-clicked');
            setTimeout(() => {
                button.classList.remove('button-clicked');
            }, 100);
        }
    }

    // Обновляет статус сервера
    updateServerStatus(message) {
        const serverStatusElement = document.getElementById('server-status');
        if (serverStatusElement) {
            serverStatusElement.textContent = `Статус сервера: ${message}`;
        }
    }

    // Показывает ошибку сервера
    showServerError() {
        const serverStatusElement = document.getElementById('server-status');
        if (serverStatusElement) {
            serverStatusElement.textContent = 'Ошибка соединения с сервером';
        }
    }

    // Отображает таблицу лидеров
    renderLeaderboard(leaderboard, currentUserId) {
        const leaderboardContent = document.getElementById('leaderboard-content');
        if (!leaderboardContent) return;

        if (!leaderboard || leaderboard.length === 0) {
            leaderboardContent.innerHTML = '<p>Нет данных</p>';
            return;
        }

        const leaderboardHtml = leaderboard.map((item, index) => {
            const isCurrentUser = item.userId == currentUserId;
            const highlightClass = isCurrentUser ? 'current-user' : '';
            return `
                <div class="leaderboard-item ${highlightClass}">
                    <span class="rank">#${index + 1}</span>
                    <span class="user-id">ID: ${item.userId}</span>
                    <span class="score">${item.score}</span>
                </div>
            `;
        }).join('');

        leaderboardContent.innerHTML = `
            <div class="leaderboard-header">
                <span class="rank">Место</span>
                <span class="user-id">Пользователь</span>
                <span class="score">Очки</span>
            </div>
            ${leaderboardHtml}
        `;
    }

    // Метод наблюдателя для обновления представления при изменении модели
    update(event, data) {
        if (event === 'scoreChanged') {
            this.updateScore(data);
        } else if (event === 'purchaseChanged') {
            // При изменении покупок обновляем отображение магазина
            this.updateShopItem(data.itemId, data.quantity);
        } else if (event === 'purchasesLoaded') {
            // При загрузке покупок обновляем информацию об автоклике
            const pointsPerSecond = this.calculatePointsPerSecond(data);
            this.updateAutoClickInfo(pointsPerSecond);
        }
    }

    renderShopItems(shopItems, purchases) {
        const shopItemsContainer = document.getElementById('shop-items');
        if (!shopItemsContainer) return;
        
        let html = '';
        
        for (const itemId in shopItems) {
            const item = shopItems[itemId];
            const quantity = purchases[itemId] || 0;
            const price = this.calculateItemPrice(item, quantity);
            
            html += `
                <div class="shop-item">
                    <div class="shop-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="shop-item-info">
                        <h4>${item.name} <span class="quantity">${quantity > 0 ? `(${quantity})` : ''}</span></h4>
                        <p>${item.description}</p>
                        <p>Цена: <span class="price">${price}</span> очков</p>
                        <button class="buy-button" data-item-id="${itemId}">Купить</button>
                    </div>
                </div>
            `;
        }
        
        shopItemsContainer.innerHTML = html;
        
        // Добавляем обработчики для кнопок покупки
        this.setupBuyButtons();
    }

    calculateItemPrice(item, quantity) {
        return Math.floor(item.basePrice * Math.pow(item.priceFactor, quantity));
    }

    updateAutoClickInfo(pointsPerSecond) {
        const autoClickInfo = document.getElementById('auto-click-info');
        if (autoClickInfo) {
            autoClickInfo.textContent = `Авто: +${pointsPerSecond.toFixed(1)} /сек`;
        }
    }

    setupBuyButtons() {
        const buyButtons = document.querySelectorAll('.buy-button');
        buyButtons.forEach(button => {
            const itemId = button.getAttribute('data-item-id');
            button.addEventListener('click', () => {
                if (this.buyHandlers[itemId]) {
                    this.buyHandlers[itemId]();
                }
            });
        });
    }

    setBuyHandler(itemId, handler) {
        this.buyHandlers[itemId] = handler;
    }

    updateShopItem(itemId, quantity) {
        const itemElement = document.querySelector(`.shop-item .buy-button[data-item-id="${itemId}"]`).closest('.shop-item');
        if (itemElement) {
            const quantityElement = itemElement.querySelector('.quantity');
            if (quantityElement) {
                quantityElement.textContent = quantity > 0 ? `(${quantity})` : '';
            }
            
            // Обновляем цену товара
            const priceElement = itemElement.querySelector('.price');
            if (priceElement) {
                const item = document.querySelector(`.shop-item .buy-button[data-item-id="${itemId}"]`).closest('.shop-item');
                if (item) {
                    // Получаем базовую цену и множитель из data-атрибутов или через обратный вызов
                    const basePrice = parseFloat(item.getAttribute('data-base-price') || 50);
                    const priceFactor = parseFloat(item.getAttribute('data-price-factor') || 1.5);
                    const newPrice = Math.floor(basePrice * Math.pow(priceFactor, quantity));
                    priceElement.textContent = newPrice;
                }
            }
        }
    }

    calculatePointsPerSecond(purchases) {
        let pointsPerSecond = 0;
        
        // Для курятников (0.2 очка в секунду за каждый)
        if (purchases.chickenCoop) {
            pointsPerSecond += purchases.chickenCoop * 0.2;
        }
        
        return pointsPerSecond;
    }
}