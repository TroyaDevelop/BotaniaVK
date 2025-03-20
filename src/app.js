import vkBridge from '@vkontakte/vk-bridge';

// Флаг для отслеживания, инициализирована ли уже игра
let gameInitialized = false;

// Счетчик кликов
let clickCount = 0;

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
        userInfoElement.setAttribute('data-user-id', userInfo.id);
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
            const userInfoElement = document.getElementById('user-info');
            if (userInfoElement) {
                userInfoElement.textContent = 'Не удалось загрузить информацию о пользователе';
            }
            // Возвращаем данные гостя в случае ошибки
            return { id: 0, first_name: 'Гость' };
        });
}

// Функция инициализации приложения - вызывается только один раз при загрузке
export function initApp() {
    // Инициализируем VK Bridge
    initVKBridge();

    // Получаем информацию о пользователе и запускаем игру
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
}

// Функция для обработки клика
export function handleClick() {
    clickCount++;
    updateClickCounter();
    
    // Сохраняем результат каждые 5 кликов
    if (clickCount % 5 === 0) {
        const userId = document.getElementById('user-info').getAttribute('data-user-id') || 0;
        saveScore(userId, clickCount);
    }
    
    // Анимация при клике
    const button = document.getElementById('click-button');
    if (button) {
        button.classList.add('button-clicked');
        setTimeout(() => {
            button.classList.remove('button-clicked');
        }, 100);
    }
}

// Обновление счетчика кликов
export function updateClickCounter() {
    const counterElement = document.getElementById('click-counter');
    if (counterElement) {
        counterElement.textContent = `Счёт: ${clickCount}`;
    }
}

// Экспортируемая функция инициализации игры
export function initGame(userData) {
    // Проверяем, не была ли игра уже инициализирована
    if (gameInitialized) {
        console.log('Игра уже инициализирована, пропускаем повторную инициализацию');
        return;
    }
    
    console.log('Инициализация игры для пользователя:', userData.id);
    
    // Проверка статуса сервера - добавляем обработку ошибок
    fetch('/api/status')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const serverStatusElement = document.getElementById('server-status');
            if (serverStatusElement) {
                serverStatusElement.textContent = `Статус сервера: ${data.message}`;
            }
        })
        .catch(error => {
            const serverStatusElement = document.getElementById('server-status');
            if (serverStatusElement) {
                serverStatusElement.textContent = 'Ошибка соединения с сервером';
            }
            console.error('Ошибка получения статуса сервера:', error);
        });
    
    // Здесь ваш код инициализации игры
    const gameElement = document.getElementById('game');
    if (gameElement) {
        // Используем = вместо += чтобы избежать дублирования
        gameElement.innerHTML = `
            <div>
                <p>Игра запущена для игрока ${userData.first_name}!</p>
                <div id="game-canvas" style="width: 100%; height: 300px; background-color: #f0f0f0; border: 1px solid #ccc; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <h2 id="click-counter">Счёт: 0</h2>
                    <button id="click-button" class="big-button">Нажми меня!</button>
                </div>
            </div>
        `;
        
        // Добавляем обработчик для кнопки клика
        const clickButton = document.getElementById('click-button');
        if (clickButton) {
            clickButton.addEventListener('click', handleClick);
        }
    }
    
    // Отмечаем, что игра инициализирована
    gameInitialized = true;
}

// Экспортируемая функция публикации на стене
export function postToWall() {
    vkBridge.send('VKWebAppShowWallPostBox', {
        message: `Я набрал ${clickCount} очков в Botania VK! Присоединяйтесь ко мне!`,
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
    // Инициализируем приложение при загрузке DOM
    initApp();
});

// Экспорт функции для проверки доступности VK Bridge
export function isVKBridgeAvailable() {
    return typeof vkBridge !== 'undefined';
}

// Отправка результата на сервер
export function saveScore(userId, score) {
    fetch('/api/score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, score })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Результат сохранен:', data);
    })
    .catch(error => {
        console.error('Ошибка сохранения результата:', error);
    });
}