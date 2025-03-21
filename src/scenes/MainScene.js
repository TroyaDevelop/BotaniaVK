import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.plant = null;
        this.waterLevel = 100; // Начальный уровень воды
        this.lastWaterTime = 0; // Время последнего полива
        this.growthStage = 0; // Текущая стадия роста (0-3)
        this.wateringCan = null; // Спрайт лейки
    }

    preload() {
        // Загрузка изображений
        this.load.image('background', 'assets/background.png');
        this.load.image('table', 'assets/table.png');
        this.load.image('pot', 'assets/pot.png');
        this.load.image('wateringCan', 'assets/watering_can.png');
        
        // Загрузка спрайтов для стадий роста растения
        this.load.image('plant_stage0', 'assets/plant_seed.png');
        this.load.image('plant_stage1', 'assets/plant_sprout.png');
        this.load.image('plant_stage2', 'assets/plant_bud.png');
        this.load.image('plant_stage3', 'assets/plant_flower.png');
        
        // Загрузка спрайта для эффекта полива
        this.load.spritesheet('water_effect', 'assets/water_effect.png', {
            frameWidth: 64,
            frameHeight: 64
        });
    }

    create() {
        // Добавляем фоновое изображение
        this.add.image(0, 0, 'background')
            .setOrigin(0, 0)
            .setDisplaySize(this.game.config.width, this.game.config.height);

        // Добавляем стол
        const tableY = this.game.config.height * 0.7;
        this.add.image(this.game.config.width / 2, tableY, 'table')
            .setOrigin(0.5, 0.5);

        // Добавляем горшок
        const potY = tableY - 30; // Немного выше стола
        this.add.image(this.game.config.width / 2, potY, 'pot')
            .setOrigin(0.5, 0.5);

        // Добавляем растение (начальная стадия - семя)
        this.plant = this.add.image(this.game.config.width / 2, potY - 50, 'plant_stage0')
            .setOrigin(0.5, 1);

        // Добавляем лейку (для полива)
        this.wateringCan = this.add.image(100, this.game.config.height - 100, 'wateringCan')
            .setOrigin(0.5, 0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.startWatering());

        // Создаем анимацию для эффекта полива
        this.anims.create({
            key: 'watering',
            frames: this.anims.generateFrameNumbers('water_effect', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });

        // Добавляем интерфейс для отображения уровня воды
        this.waterText = this.add.text(20, 20, `Вода: ${this.waterLevel}%`, {
            fontSize: '24px',
            fill: '#000000'
        });

        // Добавляем текст статуса растения
        this.statusText = this.add.text(20, 60, 'Статус: Семя', {
            fontSize: '24px',
            fill: '#000000'
        });

        // Настраиваем таймер для обновления состояния игры
        this.time.addEvent({
            delay: 1000, // каждую секунду
            callback: this.updateGameState,
            callbackScope: this,
            loop: true
        });

        // Загружаем данные о растении (можно будет заменить на загрузку с сервера)
        this.loadPlantData();
    }

    startWatering() {
        // Проверяем, есть ли вода для полива
        if (this.waterLevel < 10) {
            this.statusText.setText('Статус: Недостаточно воды!');
            return;
        }

        // Создаем эффект полива
        const waterEffect = this.add.sprite(this.plant.x, this.plant.y - 30, 'water_effect')
            .setOrigin(0.5, 0.5)
            .play('watering');

        // Уменьшаем уровень воды
        this.waterLevel -= 10;
        this.waterText.setText(`Вода: ${this.waterLevel}%`);
        
        // Обновляем время последнего полива
        this.lastWaterTime = Date.now();
        
        // Увеличиваем рост растения
        this.growPlant();
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
        // Автоматическое пополнение воды (очень медленно)
        if (this.waterLevel < 100) {
            this.waterLevel += 0.1; // 10% в час
            this.waterLevel = Math.min(100, this.waterLevel);
            this.waterText.setText(`Вода: ${Math.floor(this.waterLevel)}%`);
        }
        
        // Проверяем, нужно ли поливать растение
        const hoursSinceLastWatering = (Date.now() - this.lastWaterTime) / (1000 * 60 * 60);
        
        // Если прошло более 6 часов без полива, растение начинает увядать
        if (hoursSinceLastWatering > 6 && this.growthStage > 0) {
            this.statusText.setText('Статус: Нуждается в поливе!');
        }
        
        // Если прошло более 24 часов без полива, растение возвращается на стадию ниже
        if (hoursSinceLastWatering > 24 && this.growthStage > 0) {
            this.growthStage--;
            this.plant.setTexture(`plant_stage${this.growthStage}`);
            
            const statuses = ['Семя', 'Росток', 'Бутон', 'Цветок'];
            this.statusText.setText(`Статус: ${statuses[this.growthStage]} (увял)`);
            
            // Обновляем время последнего полива
            this.lastWaterTime = Date.now();
            
            // Сохраняем прогресс
            this.savePlantData();
        }
    }

    // Сохранение данных о растении
    savePlantData() {
        const data = {
            growthStage: this.growthStage,
            waterLevel: this.waterLevel,
            lastWaterTime: this.lastWaterTime
        };
        
        // Используем localStorage для тестирования
        localStorage.setItem('plantData', JSON.stringify(data));
        
        // В будущем здесь будет сохранение на сервер через ApiService
    }

    // Загрузка данных о растении
    loadPlantData() {
        // Сначала пробуем загрузить из localStorage для тестирования
        const savedData = localStorage.getItem('plantData');
        
        if (savedData) {
            const data = JSON.parse(savedData);
            this.growthStage = data.growthStage;
            this.waterLevel = data.waterLevel;
            this.lastWaterTime = data.lastWaterTime;
            
            // Обновляем визуальное представление
            this.plant.setTexture(`plant_stage${this.growthStage}`);
            this.waterText.setText(`Вода: ${Math.floor(this.waterLevel)}%`);
            
            const statuses = ['Семя', 'Росток', 'Бутон', 'Цветок'];
            this.statusText.setText(`Статус: ${statuses[this.growthStage]}`);
        }
        
        // В будущем здесь будет загрузка с сервера через ApiService
    }
}