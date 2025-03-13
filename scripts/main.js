import bridge from '@vkontakte/vk-bridge';
import Phaser from 'phaser';
import MainScene from '../scenes/MainScene.js';

// Initialize VK Mini App
const APP_ID = 53221746; // ID вашего приложения ВК
const isVKApp = window.location.hostname === 'gameofbotania.fun';

if (isVKApp) {
    try {
        // Инициализация VK Mini Apps
        bridge.send('VKWebAppInit');
        
        // Запрос на авторизацию с app_id
        bridge.send('VKWebAppGetAuthToken', {
            app_id: APP_ID,
            scope: 'friends'
        }).catch(error => {
            console.error('Auth error:', error);
        });
    } catch (error) {
        console.error('Failed to initialize VK Mini App:', error);
    }
} else {
    console.log('Running in development mode');
}

// Configure game
const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    scene: new MainScene({ bridge })
};

const game = new Phaser.Game(config);
