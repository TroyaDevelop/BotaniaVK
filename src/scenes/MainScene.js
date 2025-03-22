import Phaser from 'phaser';
import TestModeService from '../services/TestModeService';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.plant = null;
        
        // Изменяем управление водой
        this.maxWater = 5; // Максимальное количество единиц воды
        this.currentWater = this.maxWater; // Текущее количество единиц воды (не больше максимума)
        this.waterRegenTime = 300; // Время восстановления 1 единицы воды в секундах (5 минут)
        this.lastWaterRegenTime = Date.now(); // Время последнего восстановления воды
        
        this.lastWaterTime = 0; // Время последнего полива
        this.growthStage = 0; // Текущая стадия роста (0-3)
        this.gameModel = null; // Инициализируем просто как null
        
        // Для отображения таймера восстановления
        this.waterRegenTimer = 0;
        
        // Создаем сервис для тестового режима
        this.testModeService = new TestModeService();
    }

    preload() {
        // Загрузка изображений
        this.load.image('window', '/assets/window.png');
        this.load.image('table', '/assets/table.png');
        this.load.image('pot', '/assets/pot.png');
        
        // Загрузка спрайтов для стадий роста растения
        this.load.image('plant_stage0', '/assets/flower1_stage0.png');
        this.load.image('plant_stage1', '/assets/flower1_stage2.png');
        this.load.image('plant_stage2', '/assets/flower1_stage3.png');
        this.load.image('plant_stage3', '/assets/flower1_stage4.png');
        
        // Загрузка иконки для воды
        this.load.image('water_drop', '/assets/water.png');

        // Загружаем аудиофайлы
        this.load.audio('bgMusic', '/assets/backgroundMusic.mp3');
        this.load.audio('waterSound', '/assets/wateringSound.mp3');
    }

    init(data) {
        // Принимаем модель через параметр init
        if (data && data.gameModel) {
            this.gameModel = data.gameModel;
            console.log('Модель игры получена в init()');
        }
        
        // Либо регистрируем обработчик для события
        this.events.once('set-model', (gameModel) => {
            this.gameModel = gameModel;
            console.log('Модель игры получена через событие');
        });
    }

    create() {
        // Создаем светлый фоновый цвет
        this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0xFAEBD7)
            .setOrigin(0, 0);
        
        // Добавляем коричневую горизонтальную полосу для UI
        const uiHeight = 70; // Высота UI-панели
        this.add.rectangle(0, 0, this.game.config.width, uiHeight, 0x8B4513) // Коричневый цвет
            .setOrigin(0, 0)
            .setAlpha(0.85); // Немного прозрачности
        
        // Добавляем окно на заднем плане
        this.add.image(this.game.config.width / 2, this.game.config.height / 3, 'window')
            .setOrigin(0.5, 0.5)
            .setScale(1.5);
        
        // Добавляем стол
        const tableY = 700;
        this.add.image(this.game.config.width / 2, tableY, 'table')
            .setOrigin(0.5, 0.5)
            .setScale(0.8);

        // Добавляем горшок
        const potY = 475; // Немного выше стола
        this.add.image(this.game.config.width / 2, potY, 'pot')
            .setOrigin(0.5, 0.5)
            .setScale(0.9);

        // Добавляем растение (начальная стадия - семя)
        this.plant = this.add.image(500, 155, 'plant_stage0')
            .setScale(0.5) // Немного увеличиваем размер
            .setInteractive({ useHandCursor: true }) // Делаем растение интерактивным
            .on('pointerdown', () => this.waterPlant()); // Добавляем обработчик клика

        // Создаем UI для отображения воды
        this.createWaterUI(uiHeight);

        // Добавляем текст статуса растения (теперь в полосе UI)
        this.statusText = this.add.text(this.game.config.width - 20, uiHeight / 2, 'Статус: Семя', {
            fontSize: '24px',
            fill: '#FFFFFF', // Белый текст
            stroke: '#000000', // Черный контур
            strokeThickness: 2
        }).setOrigin(1, 0.5); // Выравниваем по правому краю и центрируем по вертикали

        // Добавляем подсказку внизу экрана
        this.hintText = this.add.text(
            this.game.config.width / 2, 
            this.game.config.height - 50, 
            'Нажмите на растение, чтобы полить его', 
            {
                fontSize: '18px',
                fill: '#000000',
                backgroundColor: '#FFFFFF',
                padding: { x: 10, y: 5 }
            }
        ).setOrigin(0.5, 0.5);

        // Добавляем разделитель между уровнем воды и статусом
        this.add.line(
            this.game.config.width / 2, 
            uiHeight / 2, 
            0, 
            0, 
            0, 
            uiHeight - 20, 
            0xFFFFFF, 
            0.5
        ).setOrigin(0.5, 0.5);

        // Настраиваем таймер для обновления состояния игры
        this.time.addEvent({
            delay: 1000, // каждую секунду
            callback: this.updateGameState,
            callbackScope: this,
            loop: true
        });

        // Загружаем данные о растении
        this.loadPlantData();
        
        // Добавляем информацию о тестовом режиме, если нужно
        this.testModeService.addTestModeLabel(this);

        // Добавляем и запускаем фоновую музыку
        this.bgMusic = this.sound.add('bgMusic', {
            volume: 0.5,
            loop: true
        });
        this.bgMusic.play();
    }

    // Создание UI для отображения единиц воды
    createWaterUI(uiHeight) {
        // Создаем группу для элементов UI воды
        this.waterUI = this.add.group();
        
        // Добавляем текст с количеством воды
        this.waterText = this.add.text(60, uiHeight / 2, `${this.currentWater}/${this.maxWater}`, {
            fontSize: '28px',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0, 0.5);
        
        // Добавляем таймер восстановления (изначально скрыт)
        this.waterTimerText = this.add.text(50, uiHeight / 2 + 20, '', {
            fontSize: '14px',
            fill: '#CCCCCC'
        }).setOrigin(0, 0.5);
        
        // Добавляем иконку воды
        this.waterIcon = this.add.image(15, uiHeight / 2, 'water_drop')
            .setScale(0.1)
            .setOrigin(0, 0.5);
    }

    // Обновление UI воды
    updateWaterUI() {
        // Проверяем формат данных воды и корректно отображаем
        let currentWater = this.currentWater;
        let maxWater = this.maxWater;
        
        // Обновляем текст с количеством воды
        this.waterText.setText(`${currentWater}/${maxWater}`);
        
        // Обновляем таймер восстановления, если вода не полная
        if (currentWater < maxWater) {
            const timeLeft = Math.ceil(this.waterRegenTimer);
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            this.waterTimerText.setText(`+1 через ${minutes}:${seconds.toString().padStart(2, '0')}`);
            this.waterTimerText.setVisible(true);
        } else {
            this.waterTimerText.setVisible(false);
        }
    }

    waterPlant() {
        // Проверяем, есть ли вода для полива
        if (this.currentWater <= 0) {
            this.statusText.setText('Статус: Нет воды!');
            
            // Добавляем анимацию для текста ошибки
            this.tweens.add({
                targets: this.statusText,
                scale: { from: 1.2, to: 1 },
                duration: 300,
                ease: 'Cubic.Out'
            });
            
            return;
        }

        // Уменьшаем количество воды
        this.currentWater--;
        this.updateWaterUI();
        
        // Обновляем время последнего полива
        this.lastWaterTime = Date.now();
        
        // Увеличиваем рост растения
        this.growPlant();
        
        // Показываем текст о успешном поливе
        const successText = this.add.text(
            this.plant.x, 
            this.plant.y - 50, 
            'Полив!', 
            {
                fontSize: '20px',
                fill: '#4CAF50',
                stroke: '#ffffff',
                strokeThickness: 2
            }
        ).setOrigin(0.5, 0.5);
        
        // Анимируем текст и удаляем его
        this.tweens.add({
            targets: successText,
            y: successText.y - 50,
            alpha: 0,
            duration: 1000,
            ease: 'Cubic.Out',
            onComplete: () => {
                successText.destroy();
            }
        });
        
        // Воспроизводим звук полива
        this.sound.play('waterSound');

        // Если есть модель игры, обновляем данные о воде
        if (this.gameModel) {
            // Обновляем только числовое значение в gameModel.resources.water, 
            // чтобы сохранить обратную совместимость
            if (typeof this.gameModel.resources.water === 'object') {
                this.gameModel.resources.water.current = this.currentWater;
            } else {
                this.gameModel.resources.water = this.currentWater;
            }
            
            this.gameModel.plant.lastWaterTime = this.lastWaterTime;
            this.gameModel.plant.growthStage = this.growthStage;
            
            // Сохраняем данные в профиле пользователя через API, если доступен метод
            if (typeof this.gameModel.saveUserData === 'function') {
                this.gameModel.saveUserData({
                    plant: this.gameModel.plant,
                    resources: this.gameModel.resources
                });
            }
            
            // Уведомляем наблюдателей
            this.gameModel.notifyObservers('resourcesChanged', this.gameModel.resources);
            this.gameModel.notifyObservers('plantChanged', this.gameModel.plant);
        }
        
        // Сохраняем данные
        this.savePlantData();
    }

    growPlant() {
        // Увеличиваем стадию роста, если она меньше максимальной
        if (this.growthStage < 3) {
            this.growthStage++;
            this.plant.setTexture(`plant_stage${this.growthStage}`);
            
            // Обновляем статус
            const statuses = ['Семя', 'Росток', 'Бутон', 'Цветок'];
            this.statusText.setText(`Статус: ${statuses[this.growthStage]}`);
            
            // Сохраняем прогресс
            this.savePlantData();
        }
    }

    updateGameState() {
        // Обновляем таймер восстановления воды
        if (this.currentWater < this.maxWater) {
            const now = Date.now();
            const secondsSinceLastRegen = (now - this.lastWaterRegenTime) / 1000;
            
            // Получаем время регенерации воды (обычное или тестовое)
            const regenTimeInSeconds = this.testModeService.getWaterRegenTime();
            
            // Обновляем оставшееся время до регенерации
            this.waterRegenTimer = regenTimeInSeconds - (secondsSinceLastRegen % regenTimeInSeconds);
            
            // Если прошло достаточно времени, восстанавливаем 1 единицу воды
            if (secondsSinceLastRegen >= regenTimeInSeconds) {
                // Добавляем проверку, чтобы не превысить максимум
                if (this.currentWater < this.maxWater) {
                    this.currentWater++;
                    this.lastWaterRegenTime = now;
                    
                    // Если есть модель игры, обновляем ее
                    if (this.gameModel) {
                        // Обновляем данные о воде в правильном формате
                        if (typeof this.gameModel.resources.water === 'object') {
                            this.gameModel.resources.water.current = this.currentWater;
                            this.gameModel.resources.water.lastRegenTime = this.lastWaterRegenTime;
                        } else {
                            this.gameModel.resources.water = this.currentWater;
                        }
                        
                        this.gameModel.notifyObservers('resourcesChanged', this.gameModel.resources);
                    }
                    
                    // Обновляем UI и сохраняем данные
                    this.updateWaterUI();
                    this.savePlantData();
                }
            }
            
            // Обновляем UI воды
            this.updateWaterUI();
        }
        
        // Проверяем, нужно ли поливать растение
        const hoursSinceLastWatering = (Date.now() - this.lastWaterTime) / (1000 * 60 * 60);
        
        // Получаем ускоренные таймеры для тестового режима
        const needWateringTime = this.testModeService.getNeedWateringTime();
        const witheredTime = this.testModeService.getWitheredTime();
        
        // Если прошло достаточно времени без полива, растение начинает нуждаться в поливе
        if (hoursSinceLastWatering > needWateringTime && this.growthStage > 0) {
            this.statusText.setText('Статус: Нуждается в поливе!');
            
            // Добавляем мигание растению, чтобы привлечь внимание
            if (!this.plantTween) {
                this.plantTween = this.tweens.add({
                    targets: this.plant,
                    alpha: { from: 1, to: 0.7 },
                    duration: 1000,
                    yoyo: true,
                    repeat: -1
                });
            }
            
            // Если есть модель игры, обновляем ее
            if (this.gameModel) {
                this.gameModel.plant.waterNeeded = true;
                this.gameModel.notifyObservers('plantChanged', this.gameModel.plant);
            }
        } else if (this.plantTween) {
            // Останавливаем мигание, если растение не нуждается в поливе
            this.plantTween.stop();
            this.plantTween = null;
            this.plant.alpha = 1;
            
            // Если есть модель игры, обновляем ее
            if (this.gameModel) {
                this.gameModel.plant.waterNeeded = false;
                this.gameModel.notifyObservers('plantChanged', this.gameModel.plant);
            }
        }
        
        // Если прошло более 24 часов без полива (или время из тестового режима), растение возвращается на стадию ниже
        if (hoursSinceLastWatering > witheredTime && this.growthStage > 0) {
            this.growthStage--;
            this.plant.setTexture(`plant_stage${this.growthStage}`);
            
            const statuses = ['Семя', 'Росток', 'Бутон', 'Цветок'];
            this.statusText.setText(`Статус: ${statuses[this.growthStage]} (увял)`);
            
            // Обновляем время последнего полива
            this.lastWaterTime = Date.now();
            
            // Сохраняем прогресс
            this.savePlantData();
            
            // Если есть модель игры, обновляем ее
            if (this.gameModel) {
                this.gameModel.plant.growthStage = this.growthStage;
                this.gameModel.plant.lastWaterTime = this.lastWaterTime;
                this.gameModel.notifyObservers('plantChanged', this.gameModel.plant);
            }
        }
    }

    // Сохранение данных о растении
    savePlantData() {
        // Убеждаемся, что значения корректные перед сохранением
        this.currentWater = Math.min(this.currentWater, this.maxWater);
        
        const data = {
            growthStage: this.growthStage,
            currentWater: this.currentWater,
            maxWater: this.maxWater,
            lastWaterRegenTime: this.lastWaterRegenTime,
            lastWaterTime: this.lastWaterTime
        };
        
        // Используем localStorage для тестирования
        localStorage.setItem('plantData', JSON.stringify(data));
        
        // Если есть модель игры, обновляем ее
        if (this.gameModel) {
            this.gameModel.plant.growthStage = this.growthStage;
            this.gameModel.plant.lastWaterTime = this.lastWaterTime;
            
            // Обновляем данные о воде в ресурсах пользователя
            this.gameModel.resources.water = {
                current: this.currentWater,
                max: this.maxWater,
                lastRegenTime: this.lastWaterRegenTime
            };
            
            // Сохраняем данные в профиле пользователя через API, если доступен метод
            if (typeof this.gameModel.saveUserData === 'function') {
                this.gameModel.saveUserData({
                    plant: this.gameModel.plant,
                    resources: this.gameModel.resources
                });
            }
            
            // Сохраняем данные в профиле пользователя через API
            this.gameModel.saveUserData({
                plant: this.gameModel.plant,
                resources: this.gameModel.resources
            });
            
            // Уведомляем наблюдателей об изменениях
            this.gameModel.notifyObservers('plantChanged', this.gameModel.plant);
            this.gameModel.notifyObservers('resourcesChanged', this.gameModel.resources);
        }
    }

    // Загрузка данных о растении
    loadPlantData() {
        // Сначала проверяем, есть ли данные в модели игры
        if (this.gameModel && this.gameModel.resources) {
            if (this.gameModel.resources.water) {
                // Проверяем формат данных о воде
                if (typeof this.gameModel.resources.water === 'object') {
                    // Новый формат (объект)
                    this.currentWater = Math.min(
                        this.gameModel.resources.water.current || this.maxWater, 
                        this.maxWater
                    );
                    this.maxWater = this.gameModel.resources.water.max || 5;
                    this.lastWaterRegenTime = this.gameModel.resources.water.lastRegenTime || Date.now();
                } else {
                    // Старый формат (число)
                    this.currentWater = Math.min(this.gameModel.resources.water, this.maxWater);
                }
            }
            
            if (this.gameModel.plant) {
                this.growthStage = this.gameModel.plant.growthStage || 0;
                this.lastWaterTime = this.gameModel.plant.lastWaterTime || 0;
            }
            
            console.log('Данные о растении и воде загружены из модели игры');
        } else {
            // Пробуем загрузить из localStorage
            const savedData = localStorage.getItem('plantData');
            
            if (savedData) {
                try {
                    const data = JSON.parse(savedData);
                    this.growthStage = data.growthStage || 0;
                    this.maxWater = data.maxWater || 5;
                    
                    // Убеждаемся, что текущее количество воды не больше максимального
                    this.currentWater = Math.min(data.currentWater || this.maxWater, this.maxWater);
                    
                    this.lastWaterRegenTime = data.lastWaterRegenTime || Date.now();
                    this.lastWaterTime = data.lastWaterTime || 0;
                    
                    console.log('Данные о растении загружены из localStorage');
                } catch (e) {
                    console.error('Ошибка при загрузке данных о растении из localStorage:', e);
                }
            }
        }
        
        // Обновляем визуальное представление
        if (this.plant) {
            this.plant.setTexture(`plant_stage${this.growthStage}`);
        }
        this.updateWaterUI();
        
        const statuses = ['Семя', 'Росток', 'Бутон', 'Цветок'];
        if (this.statusText) {
            this.statusText.setText(`Статус: ${statuses[this.growthStage]}`);
        }
    }
}