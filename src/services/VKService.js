import vkBridge from '@vkontakte/vk-bridge';

/**
 * Сервис для работы с VK Bridge API
 */
export default class VKService {
    constructor() {
        this.initialized = false;
    }

    // Инициализирует VK Bridge
    init() {
        if (this.initialized) return Promise.resolve();

        return vkBridge.send('VKWebAppInit')
            .then(() => {
                console.log('VK Bridge инициализирован');
                this.initialized = true;
            })
            .catch(error => {
                console.error('Ошибка инициализации VK Bridge:', error);
                throw error;
            });
    }

    // Получает информацию о пользователе
    getUserInfo() {
        return vkBridge.send('VKWebAppGetUserInfo')
            .then(data => {
                console.log('Получена информация о пользователе:', data);
                return data;
            })
            .catch(error => {
                console.error('Ошибка получения информации о пользователе:', error);
                throw error;
            });
    }

    // Публикует сообщение на стене пользователя
    postToWall(message, attachments) {
        return vkBridge.send('VKWebAppShowWallPostBox', {
            message,
            attachments
        })
        .then(data => {
            console.log('Пост опубликован:', data);
            return data;
        })
        .catch(error => {
            console.error('Ошибка публикации:', error);
            throw error;
        });
    }

    // Получает список друзей пользователя
    getFriends() {
        return vkBridge.send('VKWebAppGetFriends')
            .then(data => {
                console.log('Получен список друзей:', data);
                return data.items;
            })
            .catch(error => {
                console.error('Ошибка получения списка друзей:', error);
                throw error;
            });
    }

    // Проверяет, доступен ли VK Bridge
    isAvailable() {
        return typeof vkBridge !== 'undefined';
    }
}