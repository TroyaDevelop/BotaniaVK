/**
 * Представление игры - отвечает за отображение игры на экране
 */
export default class GameView {
    constructor() {
        this.gameElement = document.getElementById('game');
        this.clickHandler = null;
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

    // Метод наблюдателя для обновления представления при изменении модели
    update(event, data) {
        if (event === 'scoreChanged') {
            this.updateScore(data);
        }
    }
}