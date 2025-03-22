import Phaser from 'phaser';
import MainScene from '../scenes/MainScene';

export default function createGameConfig(gameModel) {
    // Создаем экземпляр сцены заранее
    const mainScene = new MainScene();
    
    return {
        type: Phaser.AUTO,
        width: 1000,     // Изменено с 800 на 1000
        height: 800,     // Изменено с 600 на 800
        parent: 'phaser-game',
        backgroundColor: '#ffffff',
        scene: [mainScene],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        callbacks: {
            postBoot: function(game) {
                // После инициализации игры, передаем модель в сцену
                const scene = game.scene.getScene('MainScene');
                if (scene) {
                    // Вариант 1: через событие
                    scene.events.emit('set-model', gameModel);
                    
                    // Вариант 2: непосредственно установка
                    scene.gameModel = gameModel;
                    
                    console.log('Модель игры передана в сцену через postBoot callback');
                }
            }
        }
    };
}