import Phaser from 'phaser';
import io from 'socket.io-client';

const MAX_WATER = 5;
let water = 3;
let timeLeft = 5;
let wateringTimeLeft = 5;
let growthStage = 0;
let flowerCoins = 0;

export default class MainScene extends Phaser.Scene {
    constructor({ bridge }) {
        super('MainScene');
        this.bridge = bridge;
    }

    preload() {
        this.load.image('pot', '../assets/pot.png');
        this.load.image('flower1_stage0', '../assets/flower1_stage0.png');
        this.load.image('flower1_stage1', '../assets/flower1_stage1.png');
        this.load.image('flower1_stage2', '../assets/flower1_stage2.png');
        this.load.image('flower1_stage3', '../assets/flower1_stage3.png');
        this.load.image('flower1_stage4', '../assets/flower1_stage4.png');
        this.load.image('flower1_stage5', '../assets/flower1_stage5.png');
        this.load.image('flower1_stage6', '../assets/flower1_stage6.png');
        this.load.image('flower1_stage7', '../assets/flower1_stage7.png');
        this.load.image('window', '../assets/window.png');
        this.load.image('water', '../assets/water.png');
        this.load.image('flowerCoin', '../assets/flowerCoin.png');
        this.load.audio('wateringSound', '../assets/wateringSound.mp3');
        this.load.audio('backgroundMusic', '../assets/backgroundMusic.mp3');
    }

    create() {
        this.socket = io('wss://gameofbotania.fun:5173');
        this.socket.on('connect', () => {});
        this.socket.on('plantUpdated', (data) => {});

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

        // Получение данных пользователя
        this.bridge.send('VKWebAppGetUserInfo', {}).then(data => {
            const playerNickname = `${data.first_name} ${data.last_name}`;
            this.nicknameText = this.add.text(600, 20, playerNickname, { font: '24px Arial', fill: '#000000' }).setOrigin(0.5, 0);
        });

        // Load saved data
        this.bridge.send('VKWebAppStorageGet', { keys: ['water', 'growthStage', 'lastWateringTime'] })
            .then(data => {
                if (data.keys && data.keys.length > 0) {
                    water = parseInt(data.keys.find(key => key.key === 'water')?.value || MAX_WATER);
                    growthStage = parseInt(data.keys.find(key => key.key === 'growthStage')?.value || 0);
                    const lastWateringTime = parseInt(data.keys.find(key => key.key === 'lastWateringTime')?.value || Date.now());
                    const timeSinceLastWatering = Date.now() - lastWateringTime;
                    wateringTimeLeft = Math.max(0, 5 - Math.floor(timeSinceLastWatering / 1000));
                }
            });

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

        // Получение списка друзей
        this.bridge.send('VKWebAppCallAPIMethod', {
            method: 'friends.get',
            params: {
                fields: 'photo_100,first_name,last_name'
            }
        }).then(data => {
            const friends = data.response.items;
            const players = {};
            let x = 50; // Начальная позиция по X
            friends.forEach(friend => {
                players[friend.id] = {
                    name: `${friend.first_name} ${friend.last_name}`,
                    flower: 'Роза',
                    stage: Math.floor(Math.random() * 8),
                    coins: Math.floor(Math.random() * 100)
                };
                // Создание квадратика с аватаркой
                this.load.image(`avatar_${friend.id}`, friend.photo_100);
                this.avatar = this.add.image(x, 700, `avatar_${friend.id}`).setScale(0.2);
                this.nameText = this.add.text(x, 750, `${friend.first_name}`, { font: '14px Arial', fill: '#000000' }).setOrigin(0.5, 0);
                x += 100; // Сдвиг для следующего друга
            });
            // Добавление бота
            this.load.image('avatar_bot1', './assets/grass.png');
            this.botAvatar = this.add.image(x, 700, 'avatar_bot1').setScale(0.2);
            this.botNameText = this.add.text(x, 750, 'Бот 1', { font: '14px Arial', fill: '#000000' }).setOrigin(0.5, 0);
            x += 100; // Сдвиг для следующего друга
            players['bot1'] = {
                name: 'Бот 1',
                flower: 'Тюльпан',
                stage: Math.floor(Math.random() * 8),
                coins: Math.floor(Math.random() * 100)
            };
            this.displayFriends(players);
        });

        // Отображение данных
        this.displayFriends = (players) => {
            Object.values(players).forEach(player => {
                console.log(`${player.name}: ${player.flower}, стадия: ${player.stage}, монеты: ${player.coins}`);
            });
        };
    }

    update() {
    }
}
