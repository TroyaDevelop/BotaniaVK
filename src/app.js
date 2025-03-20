import vkBridge from '@vkontakte/vk-bridge';

// Инициализация VK Bridge
export function initVKBridge() {
    vkBridge.send('VKWebAppInit')
        .then(() => console.log('VK Bridge инициализирован'))
        .catch(error => console.error('Ошибка инициализации VK Bridge:', error));
}

// Отображение информации о пользователе на странице
export function displayUserInfo(userInfo) {
    const userInfoElement = document.getElementById('user-info');
    if (userInfoElement) {
        userInfoElement.innerHTML = `
            <img src="${userInfo.photo_200}" alt="Аватар" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
            <strong>${userInfo.first_name} ${userInfo.last_name}</strong>
        `;
    }
}

// Получение информации о пользователе
export function getUserInfo() {
    return vkBridge.send('VKWebAppGetUserInfo')
        .then(data => {
            console.log('Получена информация о пользователе:', data);
            displayUserInfo(data);
            return data;
        })
        .catch(error => {
            console.error('Ошибка получения информации о пользователе:', error);
            document.getElementById('user-info').textContent = 'Не удалось загрузить информацию о пользователе';
            // Возвращаем данные гостя в случае ошибки
            return { id: 0, first_name: 'Гость' };
        });
}

// Инициализация VK Bridge
if (window.vkBridge) {
    initVKBridge();

    getUserInfo()
        .then(data => {
            initGame(data); // Запускаем игру с данными пользователя
        })
        .catch(error => {
            console.error('Ошибка получения информации о пользователе:', error);
            initGame({ id: 0, first_name: 'Гость' });
        });

    // Публикация на стене
    window.postToWall = function() {
        postToWall();
    };
} else {
    console.warn('VK Bridge не найден. Запуск в тестовом режиме.');
    document.getElementById('user-info').textContent = 'Тестовый режим (VK Bridge недоступен)';
    initGame({ id: 0, first_name: 'Тестировщик' });
}

// Экспортируемая функция инициализации игры
export function initGame(userData) {
    console.log('Инициализация игры для пользователя:', userData.id);
    
    // Проверка статуса сервера
    fetch('/api/status')
        .then(response => response.json())
        .then(data => {
            document.getElementById('server-status').textContent = `Статус сервера: ${data.message}`;
        })
        .catch(error => {
            document.getElementById('server-status').textContent = 'Ошибка соединения с сервером';
            console.error('Ошибка получения статуса сервера:', error);
        });
    
    // Здесь ваш код инициализации игры
    const gameElement = document.getElementById('game');
    gameElement.innerHTML += `
        <div>
            <p>Игра запущена для игрока ${userData.first_name}!</p>
            <div id="game-canvas" style="width: 100%; height: 300px; background-color: #f0f0f0; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center;">
                Здесь будет ваша игра
            </div>
        </div>
    `;
}

// Экспортируемая функция публикации на стене
export function postToWall() {
    vkBridge.send('VKWebAppShowWallPostBox', {
        message: 'Я играю в Botania VK! Присоединяйтесь ко мне!',
        attachments: 'https://vk.com/app53221746' // ID вашего приложения
    })
    .then(data => {
        console.log('Пост опубликован:', data);
        alert('Пост успешно опубликован!');
    })
    .catch(error => {
        console.error('Ошибка публикации:', error);
        alert('Не удалось опубликовать пост');
    });
}

// Инициализация кнопки "Поделиться"
export function initShareButton() {
    const shareButton = document.getElementById('share-button');
    if (shareButton) {
        shareButton.addEventListener('click', postToWall);
    }
}

// Обработка кнопки "Поделиться"
document.addEventListener('DOMContentLoaded', () => {
    initShareButton();
});

// Экспорт функции для проверки доступности VK Bridge
export function isVKBridgeAvailable() {
    return typeof vkBridge !== 'undefined';
}