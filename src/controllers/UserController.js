/**
 * Контроллер пользователя - обрабатывает логику, связанную с пользователем
 */
export default class UserController {
    constructor(userModel, userView, vkService) {
        this.userModel = userModel;
        this.userView = userView;
        this.vkService = vkService;
        
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
                return this.userModel.getUserData();
            })
            .catch(error => {
                console.error('Ошибка получения информации о пользователе:', error);
                this.userView.showError();
                
                // Устанавливаем гостевой режим
                this.userModel.setUserData({ id: 0, first_name: 'Гость' });
                return this.userModel.getUserData();
            });
    }

    // Публикация на стене
    postToWall(score) {
        const message = `Я набрал ${score} очков в Botania VK! Присоединяйтесь ко мне!`;
        const attachments = 'https://vk.com/app53221746'; // ID вашего приложения
        
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