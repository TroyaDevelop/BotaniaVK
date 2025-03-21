/**
 * Контроллер пользователя - обрабатывает логику, связанную с пользователем
 */
export default class UserController {
    constructor(userModel, userView, vkService, testModeService) {
        this.userModel = userModel;
        this.userView = userView;
        this.vkService = vkService;
        this.testModeService = testModeService;
        
        // Добавляем представление как наблюдателя модели
        this.userModel.addObserver(this.userView);
    }

    // Загружает информацию о пользователе
    loadUserInfo() {
        return this.vkService.init()
            .then(() => this.vkService.getUserInfo())
            .then(data => {
                // Обновляем модель пользователя
                this.userModel.setUserData(data);
                
                // Обновляем представление с учетом тестового режима
                const userData = this.userModel.getUserData();
                this.userView.render(userData, this.testModeService.isTestMode());
                
                return userData;
            })
            .catch(error => {
                console.error('Ошибка получения информации о пользователе:', error);
                this.userView.showError();
                
                // Устанавливаем гостевой режим
                this.userModel.setUserData({ id: 0, first_name: 'Гость' });
                
                // Обновляем представление с учетом тестового режима
                const userData = this.userModel.getUserData();
                this.userView.render(userData, this.testModeService.isTestMode());
                
                return userData;
            });
    }

    // Публикация на стене
    postToWall(score) {
        const message = `Я набрал ${score} очков в Botania VK! Присоединяйтесь ко мне!`;
        const attachments = 'https://vk.com/app53221746'; // ID вашего приложения
        
        if (this.testModeService.isTestMode()) {
            console.log('Тестовый режим: публикация на стене с сообщением:', message);
            alert('Тестовый режим: Пост успешно опубликован (эмуляция)');
            return Promise.resolve(true);
        }
        
        return this.vkService.postToWall(message, attachments)
            .then(() => {
                alert('Пост успешно опубликован!');
                return true;
            })
            .catch(error => {
                alert('Не удалось опубликовать пост');
                console.error('Ошибка публикации:', error);
                return false;
            });
    }

    // Получает список друзей пользователя
    getFriends() {
        return this.vkService.getFriends()
            .catch(error => {
                console.error('Ошибка получения списка друзей:', error);
                return [];
            });
    }
}