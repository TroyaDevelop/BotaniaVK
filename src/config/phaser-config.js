import Phaser from 'phaser';
import MainScene from '../scenes/MainScene';

export default function createGameConfig(gameModel) {
    return {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'phaser-game',
        backgroundColor: '#ffffff',
        scene: [
            new MainScene()
        ],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        }
    };
}