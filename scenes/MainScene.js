import Phaser from 'phaser';

const MAX_WATER = 5;
let water = 3;
let timeLeft = 5;
let wateringTimeLeft = 5;
let growthStage = 0;
let flowerCoins = 0;
let lastWateringTime = 0;

export default class MainScene extends Phaser.Scene {
    constructor({ bridge }) {
        super('MainScene');
        this.bridge = bridge;
    }

    preload() {
        this.load.image('pot', 'assets/pot.png');
        this.load.image('flower1_stage0', 'assets/flower1_stage0.png');
        this.load.image('flower1_stage1', 'assets/flower1_stage1.png');
        this.load.image('flower1_stage2', 'assets/flower1_stage2.png');
        this.load.image('flower1_stage3', 'assets/flower1_stage3.png');
        this.load.image('flower1_stage4', 'assets/flower1_stage4.png');
        this.load.image('flower1_stage5', 'assets/flower1_stage5.png');
        this.load.image('flower1_stage6', 'assets/flower1_stage6.png');
        this.load.image('flower1_stage7', 'assets/flower1_stage7.png');
        this.load.image('window', 'assets/window.png');
        this.load.image('water', 'assets/water.png');
        this.load.image('flowerCoin', 'assets/flowerCoin.png');
        this.load.audio('wateringSound', 'assets/wateringSound.mp3');
        this.load.audio('backgroundMusic', 'assets/backgroundMusic.mp3');
    }

    create() {
        const wall = this.add.graphics();
        wall.fillStyle(0xF5F5DC, 1);
        wall.fillRect(0, 0, 1200, 800);
    
        const windowSprite = this.add.image(600, 250, 'window').setScale(1.5);
    
        const table = this.add.graphics();
        table.fillStyle(0x8B4513, 1);
        table.fillRect(400, 550, 400, 250);
    
        const pot = this.add.image(600, 500, 'pot').setInteractive();
        this.flower = this.add.image(600, 275, 'flower1_stage0').setScale(0.3);
    
        // Top UI bar
        this.add.rectangle(600, 0, 1200, 60, 0x8B4513, 0.8).setOrigin(0.5, 0);

        // Water
        this.water = this.add.image(50, 32, 'water').setScale(0.12).setInteractive();
        this.waterText = this.add.text(80, 20, `${water}/${MAX_WATER}`, { font: '24px Arial', fill: '#000000' });
        this.timerText = this.add.text(125, 25, `До пополнения: ${timeLeft} сек`, { font: '14px Arial', fill: '#000000' });

        // Water tooltip
        this.waterTooltip = this.add.text(50, 60, 'Вода', { font: '14px Arial', fill: '#000000' }).setOrigin(0.5, 0).setVisible(false);

        this.water.on('pointerover', () => {
            this.waterTooltip.setVisible(true);
        });

        this.water.on('pointerout', () => {
            this.waterTooltip.setVisible(false);
        });

        // Flower Coins
        this.flowerCoinIcon = this.add.image(1000, 32, 'flowerCoin').setScale(0.1);
        this.flowerCoinText = this.add.text(1035, 20, `${flowerCoins}`, { font: '24px Arial', fill: '#000000' });

        // Watering Timer
        this.wateringTimerText = this.add.text(490, 650, `Полить через: ${wateringTimeLeft} сек`, { font: '24px Arial', fill: '#000000' });
    
        this.wateringSound = this.sound.add('wateringSound');
        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        this.backgroundMusic.setVolume(0.3);
        this.backgroundMusic.play();

        pot.on('pointerdown', () => {
            if (water > 0 && wateringTimeLeft <= 0 && growthStage < 7) {
                water = Math.max(0, water - 1);
                this.waterText.setText(`${water}/${MAX_WATER}`);
                wateringTimeLeft = 5;
                this.wateringTimerText.setText(`Полить через: ${wateringTimeLeft} сек`);
                growthStage++;
                this.flower.setTexture(`flower1_stage${growthStage}`);
                this.flower.setPosition(600, 275);
                this.wateringSound.play();
                if (growthStage === 7) {
                    flowerCoins++;
                    this.flowerCoinText.setText(`${flowerCoins}`);
                }
                // Save data
                this.bridge.send('VKWebAppStorageSet', {
                    key: 'water',
                    value: water.toString()
                });
                this.bridge.send('VKWebAppStorageSet', {
                    key: 'growthStage',
                    value: growthStage.toString()
                });
                this.bridge.send('VKWebAppStorageSet', {
                    key: 'lastWateringTime',
                    value: Date.now().toString()
                });
            }
        });

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                timeLeft--;
                this.timerText.setText(`До пополнения: ${timeLeft} сек`);
                if (timeLeft <= 0) {
                    water = Math.min(MAX_WATER, water + 1);
                    this.waterText.setText(`${water}/${MAX_WATER}`);
                    if (water === MAX_WATER) {
                        this.timerText.setText('Максимум воды!');
                    } else {
                        timeLeft = 5;
                        this.timerText.setText(`До пополнения: ${timeLeft} сек`);
                    }
                }
    
                if (wateringTimeLeft > 0) {
                    wateringTimeLeft--;
                    this.wateringTimerText.setText(`Полить через: ${wateringTimeLeft} сек`);
                } else {
                    this.wateringTimerText.setText('Необходима вода!');
                }
            },
            loop: true
        });

        this.bridge.send('VKWebAppStorageGet', { keys: ['water', 'growthStage', 'lastWateringTime'] })
            .then(data => {
                if (data.keys[0]) {
                    water = parseInt(data.keys[0].value);
                }
                if (data.keys[1]) {
                    growthStage = parseInt(data.keys[1].value);
                }
                if (data.keys[2]) {
                    lastWateringTime = parseInt(data.keys[2].value);
                }
                this.updateWaterText();
                this.updateTimeText();
                this.updateGrowthStage();
                this.updateFlowerCoins();
            });
    }

    updateWaterText() {
        this.waterText.setText(`${water}/${MAX_WATER}`);
    }

    updateTimeText() {
        const timeSinceLastWatering = Date.now() - lastWateringTime;
        const wateringTimeLeft = Math.max(0, 5 - Math.floor(timeSinceLastWatering / 1000));
        this.wateringTimerText.setText(`Полить через: ${wateringTimeLeft} сек`);
    }

    updateGrowthStage() {
        this.flower.setTexture(`flower1_stage${growthStage}`);
        this.flower.setPosition(600, 275);
    }

    updateFlowerCoins() {
        this.flowerCoinText.setText(`${flowerCoins}`);
    }

    update() {
    }
}
