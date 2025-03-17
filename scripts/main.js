import '../style.css';
import VK from '@vkontakte/vk-bridge';
import Phaser from 'phaser';
import MainScene from '../scenes/MainScene.js';

const app_id = 53221746;  // get the app_id from .env file

// initialize VK Bridge with the obtained id
VK.init({apiId: parseInt(app_id)});

// Initialize VK API
VK.send('VKWebAppInit');

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    scene: new MainScene()
};

const game = new Phaser.Game(config);
