import Phaser from 'phaser';

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
        // Load assets with error handling
        const assets = [
            { key: 'pot', path: './assets/pot.png' },
            { key: 'flower1_stage0', path: './assets/flower1_stage0.png' },
            { key: 'flower1_stage1', path: './assets/flower1_stage1.png' },
            { key: 'flower1_stage2', path: './assets/flower1_stage2.png' },
            { key: 'flower1_stage3', path: './assets/flower1_stage3.png' },
            { key: 'flower1_stage4', path: './assets/flower1_stage4.png' },
            { key: 'flower1_stage5', path: './assets/flower1_stage5.png' },
            { key: 'flower1_stage6', path: './assets/flower1_stage6.png' },
            { key: 'flower1_stage7', path: './assets/flower1_stage7.png' },
            { key: 'window', path: './assets/window.png' },
            { key: 'water', path: './assets/water.png' },
            { key: 'flowerCoin', path: './assets/flowerCoin.png' },
            { key: 'avatar_bot1', path: './assets/grass.png' }
        ];

        assets.forEach(asset => {
            this.load.image(asset.key, asset.path);
        });

        // Load audio
        this.load.audio('wateringSound', './assets/wateringSound.mp3');
        this.load.audio('backgroundMusic', './assets/backgroundMusic.mp3');

        // Handle loading errors
        this.load.on('loaderror', (fileObj) => {
            console.error('Error loading asset:', fileObj.key);
        });
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

        // Check if we're in VK environment
        const isVKApp = window.location.hostname === 'gameofbotania.fun';
        
        if (isVKApp) {
            this.initVKApp();
        } else {
            console.log('Running in non-VK environment, using mock data');
            this.displayMockData();
        }

        // Initialize game objects
        this.initGameObjects();

        // Load saved data
        if (isVKApp) {
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
        }

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
                if (isVKApp) {
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
    }

    initVKApp() {
        const APP_ID = 51815272; // ID приложения ВК
        
        this.bridge.send('VKWebAppGetUserInfo')
            .then(data => {
                const playerNickname = `${data.first_name} ${data.last_name}`;
                this.nicknameText = this.add.text(600, 20, playerNickname, { font: '24px Arial', fill: '#ffffff' }).setOrigin(0.5, 0);
                
                return this.bridge.send('VKWebAppGetAuthToken', { 
                    app_id: APP_ID,
                    scope: 'friends' 
                });
            })
            .then(data => {
                const accessToken = data.access_token;
                return this.bridge.send('VKWebAppCallAPIMethod', {
                    method: 'friends.get',
                    params: {
                        access_token: accessToken,
                        fields: 'photo_100,first_name,last_name',
                        v: '5.131'
                    }
                });
            })
            .then(data => {
                this.loadFriendsData(data.response.items);
            })
            .catch(error => {
                console.error('VK API Error:', error);
                this.displayMockData();
            });
    }

    async loadFriendsData(friends) {
        const players = {};
        let x = 50;

        try {
            for (const friend of friends) {
                players[friend.id] = {
                    name: `${friend.first_name} ${friend.last_name}`,
                    flower: 'Роза',
                    stage: Math.floor(Math.random() * 8),
                    coins: Math.floor(Math.random() * 100)
                };

                // Load friend avatar
                try {
                    await new Promise((resolve, reject) => {
                        this.load.image(`avatar_${friend.id}`, friend.photo_100);
                        this.load.once('complete', resolve);
                        this.load.once('loaderror', reject);
                        this.load.start();
                    });

                    const friendContainer = this.add.container(x, 700);
                    const avatar = this.add.image(0, 0, `avatar_${friend.id}`).setScale(0.2);
                    const nameText = this.add.text(0, 50, friend.first_name, { font: '14px Arial', fill: '#000000' }).setOrigin(0.5, 0);
                    
                    friendContainer.add([avatar, nameText]);
                } catch (error) {
                    console.error('Error loading friend avatar:', friend.id);
                }

                x += 100;
            }

            // Add bot after friends
            const botContainer = this.add.container(x, 700);
            const botAvatar = this.add.image(0, 0, 'avatar_bot1').setScale(0.2);
            const botNameText = this.add.text(0, 50, 'Бот 1', { font: '14px Arial', fill: '#000000' }).setOrigin(0.5, 0);
            
            botContainer.add([botAvatar, botNameText]);
            
            players['bot1'] = {
                name: 'Бот 1',
                flower: 'Тюльпан',
                stage: Math.floor(Math.random() * 8),
                coins: Math.floor(Math.random() * 100)
            };

            this.displayFriends(players);
        } catch (error) {
            console.error('Error loading friends data:', error);
            this.displayMockData();
        }
    }

    initGameObjects() {
    }

    displayMockData() {
        this.nicknameText = this.add.text(600, 20, 'Тестовый Игрок', { font: '24px Arial', fill: '#ffffff' }).setOrigin(0.5, 0);

        const mockPlayers = {
            'friend1': {
                name: 'Друг 1',
                flower: 'Роза',
                stage: Math.floor(Math.random() * 8),
                coins: Math.floor(Math.random() * 100)
            },
            'friend2': {
                name: 'Друг 2',
                flower: 'Тюльпан',
                stage: Math.floor(Math.random() * 8),
                coins: Math.floor(Math.random() * 100)
            },
            'bot1': {
                name: 'Бот 1',
                flower: 'Тюльпан',
                stage: Math.floor(Math.random() * 8),
                coins: Math.floor(Math.random() * 100)
            }
        };

        let x = 50;
        Object.entries(mockPlayers).forEach(([id, player]) => {
            const container = this.add.container(x, 700);
            const avatar = this.add.image(0, 0, 'avatar_bot1').setScale(0.2);
            const nameText = this.add.text(0, 50, player.name, { font: '14px Arial', fill: '#000000' }).setOrigin(0.5, 0);
            container.add([avatar, nameText]);
            x += 100;
        });

        this.displayFriends(mockPlayers);
    }

    displayFriends(players) {
        Object.values(players).forEach(player => {
            console.log(`${player.name}: ${player.flower}, стадия: ${player.stage}, монеты: ${player.coins}`);
        });
    }

    update() {
    }
}
