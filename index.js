import bridge from '@vkontakte/vk-bridge';

// Инициализация vk-bridge
bridge.send('VKWebAppInit');

// Отображение информации о пользователе на странице
function displayUserInfo(userInfo) {
    const userInfoElement = document.getElementById('user-info');
    if (userInfoElement) {
        userInfoElement.innerHTML = `
            <img src="${userInfo.photo_200}" alt="Аватар" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
            <strong>${userInfo.first_name} ${userInfo.last_name}</strong>
        `;
    }
}

// Проверка авторизации пользователя
bridge.send('VKWebAppGetUserInfo')
    .then(data => {
        console.log('Получена информация о пользователе:', data);
        displayUserInfo(data);
        initGame(data); // Запускаем игру с данными пользователя
    })
    .catch(error => {
        console.error('Ошибка получения информации о пользователе:', error);
        document.getElementById('user-info').textContent = 'Не удалось загрузить информацию о пользователе';
    });

// Инициализация игры
function initGame(userData) {
    console.log('Инициализация игры для пользователя:', userData.id);
    // Здесь ваш код инициализации игры
    // Например:
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

// Пример вызова метода для публикации на стене
function postToWall() {
    bridge.send('VKWebAppShowWallPostBox', {
        message: 'Я играю в Botania VK! Присоединяйтесь ко мне!',
        attachments: 'https://vk.com/53221746' // Замените на ID вашего приложения
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

// Экспорт функции для доступа из HTML
window.postToWall = postToWall;