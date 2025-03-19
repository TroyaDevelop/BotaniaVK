import bridge from '@vkontakte/vk-bridge';

// Инициализируем VK Bridge
bridge.send('VKWebAppInit')
    .then(() => {
        console.log('VK Bridge initialized');
        // После успешной инициализации получаем информацию о пользователе
        return bridge.send('VKWebAppGetUserInfo');
    })
    .then(data => {
        console.log('User data:', data);
        // Отображаем информацию о пользователе
        document.getElementById('myElement').innerHTML = `
            Привет, ${data.first_name}!
            <br>
            ID: ${data.id}
        `;
    })
    .catch(error => {
        console.error(error);
        document.getElementById('myElement').innerHTML = 'Произошла ошибка при инициализации';
    });