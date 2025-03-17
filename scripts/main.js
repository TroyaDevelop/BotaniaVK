import '../style.css';
import bridge from '@vkontakte/vk-bridge';
import Phaser from 'phaser';
import MainScene from '../scenes/MainScene.js';

// Initialize VK Bridge
bridge.send('VKWebAppInit')
  .then(() => {
    console.log('VK Bridge initialized successfully');
    
    // Request access token
    return bridge.send('VKWebAppGetAuthToken', {
      app_id: YOUR_APP_ID,  // Replace with your actual app ID
      scope: 'friends,photos'
    });
  })
  .then(data => {
    console.log('Auth token received:', data.access_token);
    startGame(data.access_token);
  })
  .catch(error => {
    console.error('VK Bridge error:', error);
    // Fallback for local development
    startGame(null);
  });

function startGame(token) {
  const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    scene: new MainScene({ bridge, token })
  };
  
  const game = new Phaser.Game(config);
}
