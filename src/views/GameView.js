import Phaser from 'phaser';
import createGameConfig from '../config/phaser-config';

/**
 * Представление игры с использованием Phaser
 */
export default class GameView {
    constructor() {
        this.gameElement = document.getElementById('game');
        this.game = null;
        this.gameModel = null;
    }

    // Инициализация игрового интерфейса
    render(userName) {
        if (!this.gameElement) return;

        // Создаем контейнер для игры
        this.gameElement.innerHTML = `
            <div>
                <p>Игра запущена для игрока ${userName}!</p>
                <div id="phaser-game" style="width: 100%; height: 600px;"></div>
                <div id="game-controls" style="margin-top: 10px; text-align: center;">
                    <button id="restart-game" class="button">Перезапустить</button>
                </div>
                <div id="server-status">Проверка соединения с сервером...</div>
            </div>
        `;

        // Настраиваем кнопки управления
        this.setupGameControls();
    }

    // Инициализация Phaser
    initPhaser(gameModel) {
        this.gameModel = gameModel;

        if (this.game) {
            this.game.destroy(true);
        }

        const config = createGameConfig(gameModel);
        this.game = new Phaser.Game(config);
    }

    // Настройка кнопок управления
    setupGameControls() {
        const restartButton = document.getElementById('restart-game');
        if (restartButton) {
            restartButton.addEventListener('click', () => {
                this.restartGame();
            });
        }
    }

    // Перезапуск игры
    restartGame() {
        if (this.game) {
            this.game.scene.getScene('MainScene').scene.restart();
            if (this.gameModel) {
                // Сброс состояния растения
                this.gameModel.setPlantData({
                    growthStage: 0,
                    lastWaterTime: Date.now(),
                    waterNeeded: false
                });
            }
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
        // Передаем события в Phaser сцену, если она доступна
        if (this.game && this.game.scene.isActive('MainScene')) {
            const mainScene = this.game.scene.getScene('MainScene');
            
            if (event === 'plantChanged') {
                // Обновляем состояние растения в сцене
                mainScene.growthStage = data.growthStage;
                mainScene.lastWaterTime = data.lastWaterTime;
                mainScene.plant.setTexture(`plant_stage${data.growthStage}`);
                
                const statuses = ['Семя', 'Росток', 'Бутон', 'Цветок'];
                mainScene.statusText.setText(`Статус: ${statuses[data.growthStage]}`);
                
                if (data.waterNeeded) {
                    mainScene.statusText.setText(`Статус: ${statuses[data.growthStage]} (нужен полив)`);
                }
            }
            
            if (event === 'resourcesChanged') {
                // Обновляем ресурсы в сцене
                mainScene.waterLevel = data.water;
                mainScene.waterText.setText(`Вода: ${Math.floor(data.water)}%`);
            }
        }
    }
}