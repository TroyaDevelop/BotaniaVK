import vkBridge from '@vkontakte/vk-bridge';

/**
 * Сервис для работы с VK Bridge API
 */
export default class VKService {
    constructor() {
        this.initialized = false;
        this.testMode = !this.isVKBridgeAvailable();
        
        // Тестовые данные пользователя для локальной разработки
        this.testUser = {
            id: 1234567890,
            first_name: 'Тестовый',
            last_name: 'Пользователь',
            photo_200: 'https://vk.com/images/camera_200.png'
        };
        
        // Список тестовых друзей
        this.testFriends = [
            { id: 987654321, first_name: 'Друг', last_name: 'Первый', photo_100: 'https://vk.com/images/camera_100.png' },
            { id: 876543210, first_name: 'Друг', last_name: 'Второй', photo_100: 'https://vk.com/images/camera_100.png' },
            { id: 765432109, first_name: 'Друг', last_name: 'Третий', photo_100: 'https://vk.com/images/camera_100.png' }
        ];
        
        console.log(this.testMode ? 'VK Bridge не обнаружен, включен тестовый режим' : 'VK Bridge обнаружен');
    }

    // Проверяет доступность VK Bridge
    isVKBridgeAvailable() {
        return typeof vkBridge !== 'undefined' && !window.location.href.includes('localhost');
    }

    // Инициализирует VK Bridge
    init() {
        if (this.initialized) return Promise.resolve();
        
        if (this.testMode) {
            console.log('Тестовый режим: VK Bridge инициализирован (эмуляция)');
            this.initialized = true;
            return Promise.resolve();
        }

        return vkBridge.send('VKWebAppInit')
            .then(() => {
                console.log('VK Bridge инициализирован');
                this.initialized = true;
            })
            .catch(error => {
                console.error('Ошибка инициализации VK Bridge:', error);
                // Включаем тестовый режим при ошибке
                this.testMode = true;
                this.initialized = true;
                return Promise.resolve(); // Продолжаем выполнение в тестовом режиме
            });
    }

    // Получает информацию о пользователе
    getUserInfo() {
        if (this.testMode) {
            console.log('Тестовый режим: возвращаем тестового пользователя');
            return Promise.resolve(this.testUser);
        }

        return vkBridge.send('VKWebAppGetUserInfo')
            .then(data => {
                console.log('Получена информация о пользователе:', data);
                return data;
            })
            .catch(error => {
                console.error('Ошибка получения информации о пользователе:', error);
                // В случае ошибки возвращаем тестового пользователя
                console.log('Возвращаем тестового пользователя после ошибки');
                return this.testUser;
            });
    }

    // Публикует сообщение на стене пользователя
    postToWall(message, attachments) {
        if (this.testMode) {
            console.log('Тестовый режим: эмуляция публикации на стене', { message, attachments });
            return Promise.resolve({ post_id: Date.now() });
        }

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
        if (this.testMode) {
            console.log('Тестовый режим: возвращаем тестовых друзей');
            return Promise.resolve(this.testFriends);
        }

        return vkBridge.send('VKWebAppGetFriends')
            .then(data => {
                console.log('Получен список друзей:', data);
                return data.items;
            })
            .catch(error => {
                console.error('Ошибка получения списка друзей:', error);
                // В случае ошибки возвращаем тестовых друзей
                return this.testFriends;
            });
    }

    // Проверяет, доступен ли VK Bridge
    isAvailable() {
        return !this.testMode;
    }

    // Проверяет, включен ли тестовый режим
    isTestMode() {
        return this.testMode;
    }
}