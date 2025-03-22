/**
 * Представление пользователя - отвечает за отображение информации о пользователе
 */
export default class UserView {
    constructor() {
        this.userInfoElement = document.getElementById('user-info');
    }

    // Отображает информацию о пользователе
    render(userData, isTestMode = false) {
        if (!this.userInfoElement) return;

        if (userData.isGuest) {
            this.userInfoElement.textContent = 'Гостевой режим';
        } else {
            let html = `
                <img src="${userData.photo}" alt="Аватар" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
                <strong>${userData.firstName} ${userData.lastName}</strong>
            `;
            
            // Добавляем пометку о тестовом режиме
            if (isTestMode) {
                html += ' <span style="background-color: #ff9800; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">ТЕСТОВЫЙ РЕЖИМ</span>';
            }
            
            this.userInfoElement.innerHTML = html;
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