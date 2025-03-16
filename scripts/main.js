import bridge from '@vkontakte/vk-bridge';
import Phaser from 'phaser';
import MainScene from '../scenes/MainScene.js';

// Initialize VK API
bridge.send('VKWebAppInit')
  .then(() => bridge.send('VKWebAppGetUserInfo'))
  .then(user => {
    this.nicknameText.setText(`${user.first_name} ${user.last_name}`);
  });

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    scene: new MainScene({ bridge })
};

const game = new Phaser.Game(config);
