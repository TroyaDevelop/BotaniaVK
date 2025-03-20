/**
 * Модель пользователя - отвечает за данные о пользователе
 */
export default class UserModel {
    constructor() {
        this.id = 0;
        this.firstName = 'Гость';
        this.lastName = '';
        this.photo = '';
        this.isGuest = true;
        this.observers = [];
    }

    // Устанавливает данные пользователя
    setUserData(userData) {
        this.id = userData.id || 0;
        this.firstName = userData.first_name || 'Гость';
        this.lastName = userData.last_name || '';
        this.photo = userData.photo_200 || '';
        this.isGuest = !userData.id;
        
        this.notifyObservers('userChanged', this.getUserData());
        return this.getUserData();
    }

    // Получает данные пользователя
    getUserData() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            photo: this.photo,
            isGuest: this.isGuest
        };
    }

    // Проверяет, является ли пользователь гостем
    isGuestUser() {
        return this.isGuest;
    }

    // Получает ID пользователя
    getUserId() {
        return this.id;
    }

    // Добавляет наблюдателя за изменениями
    addObserver(observer) {
        this.observers.push(observer);
    }

    // Удаляет наблюдателя
    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Уведомляет наблюдателей об изменениях
    notifyObservers(event, data) {
        this.observers.forEach(observer => {
            if (observer.update) {
                observer.update(event, data);
            }
        });
    }
}