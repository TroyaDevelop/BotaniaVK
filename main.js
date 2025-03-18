import bridge from '@vkontakte/vk-bridge';

// Инициализация VK Bridge
bridge.send('VKWebAppInit')
    .then(() => {
        console.log('VK Bridge initialized');
    })
    .catch((error) => {
        console.error('VK Bridge initialization failed', error);
    });

async function testVkBridge() {
    try {
        const userInfo = await bridge.send('VKWebAppGetUserInfo');
        console.log('User Info:', userInfo);
    } catch (error) {
        console.error("Error:", error);
    }
}

testVkBridge();