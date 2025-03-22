/**
 * Сервис для работы с серверным API
 */
export default class ApiService {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl; // Базовый URL для API
        
        // Определяем, работаем локально или нет
        this.isLocalMode = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1';
        
        // Если мы на локальном сервере и baseUrl не задан,
        // автоматически подставляем локальный адрес API
        if (this.isLocalMode && !baseUrl) {
            this.baseUrl = 'http://localhost:5173';
            console.log('ApiService: Используем локальный сервер:', this.baseUrl);
        }
    }

    // Проверяет статус сервера
    checkStatus() {
        return fetch(`${this.baseUrl}/api/status`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Статус сервера:', data);
                return data;
            })
            .catch(error => {
                console.error('Ошибка получения статуса сервера:', error);
                throw error;
            });
    }

    // Сохраняет счет пользователя
    saveScore(userId, score) {
        return fetch(`${this.baseUrl}/api/score`, {
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
            return data;
        })
        .catch(error => {
            console.error('Ошибка сохранения результата:', error);
            throw error;
        });
    }

    // Получает счет пользователя
    getScore(userId) {
        return fetch(`${this.baseUrl}/api/score/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Получен результат:', data);
                return data.score;
            })
            .catch(error => {
                console.error('Ошибка получения результата:', error);
                throw error;
            });
    }

    // Получает таблицу лидеров
    getLeaderboard() {
        return fetch(`${this.baseUrl}/api/leaderboard`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Получена таблица лидеров:', data);
                return data.leaderboard;
            })
            .catch(error => {
                console.error('Ошибка получения таблицы лидеров:', error);
                throw error;
            });
    }

    // Сбрасывает все результаты (для тестирования)
    resetAllScores() {
        return fetch(`${this.baseUrl}/api/scores/reset`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Все результаты сброшены:', data);
            return data;
        })
        .catch(error => {
            console.error('Ошибка сброса результатов:', error);
            throw error;
        });
    }

    // Сохраняет данные о растении пользователя
    savePlantData(userId, plantData) {
        return fetch(`${this.baseUrl}/api/plant`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, plantData })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Данные о растении сохранены:', data);
            return data;
        })
        .catch(error => {
            console.error('Ошибка сохранения данных о растении:', error);
            throw error;
        });
    }

    // Получает данные о растении пользователя
    getPlantData(userId) {
        return fetch(`${this.baseUrl}/api/plant/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Получены данные о растении:', data);
                return data.plantData;
            })
            .catch(error => {
                console.error('Ошибка получения данных о растении:', error);
                throw error;
            });
    }

    // Сохраняет данные о ресурсах пользователя
    saveResourcesData(userId, resourcesData) {
        return fetch(`${this.baseUrl}/api/resources`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, resourcesData })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Данные о ресурсах сохранены:', data);
            return data;
        })
        .catch(error => {
            console.error('Ошибка сохранения данных о ресурсах:', error);
            throw error;
        });
    }

    // Получает данные о ресурсах пользователя
    getResourcesData(userId) {
        return fetch(`${this.baseUrl}/api/resources/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Получены данные о ресурсах:', data);
                return data.resourcesData;
            })
            .catch(error => {
                console.error('Ошибка получения данных о ресурсах:', error);
                throw error;
            });
    }
}