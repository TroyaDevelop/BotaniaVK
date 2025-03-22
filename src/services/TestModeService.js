/**
 * Сервис для работы с тестовым режимом
 * Содержит все вспомогательные функции для тестирования
 */
export default class TestModeService {
    constructor() {
        // Определяем, находимся ли мы в тестовом режиме
        this.testMode = this.isTestMode();
        
        // Константы для ускоренных таймеров в тестовом режиме
        this.testConstants = {
            waterRegenTime: 10,        // 10 секунд вместо 5 минут
            needWateringTime: 0.016,   // 1 минута вместо 6 часов
            witheredTime: 0.05         // 3 минуты вместо 24 часов
        };
        
        console.log(this.testMode ? 'Тестовый режим активен' : 'Тестовый режим неактивен');
    }

    // Проверяет, запущено ли приложение в тестовом режиме
    isTestMode() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1';
    }

    // Отображает информацию о тестовом режиме в интерфейсе
    showTestModeInfo() {
        if (!this.testMode) return;
        
        const testInfoElement = document.getElementById('test-info');
        if (testInfoElement) {
            testInfoElement.style.display = 'block';
        }
        
        console.log('Интерфейс тестового режима активирован');
    }

    // Добавляет метку тестового режима в Phaser сцену
    addTestModeLabel(scene) {
        if (!this.testMode) return;
        
        scene.add.text(
            scene.game.config.width - 20, 
            scene.game.config.height - 20, 
            'Тестовый режим', 
            {
                fontSize: '14px',
                fill: '#ff9800',
                backgroundColor: '#ffffff',
                padding: { x: 8, y: 4 }
            }
        ).setOrigin(1, 1);
    }

    // Возвращает ускоренные значения таймеров для тестового режима
    getTestTimers() {
        return this.testConstants;
    }

    // Возвращает тестовый таймер восстановления воды
    getWaterRegenTime() {
        return this.testMode ? this.testConstants.waterRegenTime : 300; // 10 секунд или 5 минут
    }

    // Возвращает тестовый таймер необходимости полива
    getNeedWateringTime() {
        return this.testMode ? this.testConstants.needWateringTime : 6; // 1 минута или 6 часов
    }

    // Возвращает тестовый таймер увядания растения
    getWitheredTime() {
        return this.testMode ? this.testConstants.witheredTime : 24; // 3 минуты или 24 часа
    }
    
    // Метод для отображения отладочной информации в тестовом режиме
    showDebugInfo(gameModel) {
        if (!this.testMode || !gameModel) return;
        
        // Собираем информацию о состоянии игры
        const gameState = {
            plant: gameModel.getPlantState(),
            resources: gameModel.getResources(),
            score: gameModel.getScore(),
            initialized: gameModel.isInitialized()
        };
        
        // Создаем временный элемент для отображения данных
        const debugOverlay = document.createElement('div');
        debugOverlay.style.position = 'fixed';
        debugOverlay.style.top = '20px';
        debugOverlay.style.left = '20px';
        debugOverlay.style.right = '20px';
        debugOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        debugOverlay.style.color = 'white';
        debugOverlay.style.padding = '20px';
        debugOverlay.style.borderRadius = '10px';
        debugOverlay.style.zIndex = '1000';
        debugOverlay.style.maxHeight = '80vh';
        debugOverlay.style.overflow = 'auto';
        
        debugOverlay.innerHTML = `
            <h3 style="color: #4CAF50; margin-top: 0;">Отладочная информация</h3>
            <pre style="white-space: pre-wrap; overflow-wrap: break-word;">${JSON.stringify(gameState, null, 2)}</pre>
            <div style="text-align: center; margin-top: 15px;">
                <button id="close-debug" style="padding: 5px 15px; cursor: pointer;">Закрыть</button>
            </div>
        `;
        
        document.body.appendChild(debugOverlay);
        
        // Добавляем обработчик для закрытия
        document.getElementById('close-debug').addEventListener('click', () => {
            document.body.removeChild(debugOverlay);
        });
    }
}