/**
 * Представление пользователя - отвечает за отображение информации о пользователе
 */
export default class UserView {
    constructor() {
        this.userInfoElement = document.getElementById('user-info');
    }

    // Отображает информацию о пользователе
    render(userData) {
        if (!this.userInfoElement) return;

        if (userData.isGuest) {
            this.userInfoElement.textContent = 'Гостевой режим';
        } else {
            this.userInfoElement.innerHTML = `
                <img src="${userData.photo}" alt="Аватар" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
                <strong>${userData.firstName} ${userData.lastName}</strong>
            `;
        }

        // Сохраняем ID пользователя в атрибуте для дальнейшего использования
        this.userInfoElement.setAttribute('data-user-id', userData.id);
    }

    // Показывает ошибку загрузки данных пользователя
    showError() {
        if (this.userInfoElement) {
            this.userInfoElement.textContent = 'Не удалось загрузить информацию о пользователе';
        }
    }

    // Метод наблюдателя для обновления представления при изменении модели
    update(event, data) {
        if (event === 'userChanged') {
            this.render(data);
        }
    }
}