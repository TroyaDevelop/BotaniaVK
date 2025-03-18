const VK = require('@vkontakte/vk-bridge');
VK.init({ appId: YOUR_APP_ID });
// Использование методов VK...

async function testVkBridge() {
    try {
      const userInfo = await VK.call('VKWebAppGetUserInfo');
      console.log(userInfo); // В консоли должно появится информация о пользователе
    } catch (error) {
      console.error("Error:", error);
    }
  }
  testVkBridge();