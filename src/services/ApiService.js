/**
 * Сервис для работы с серверным API
 */
export default class ApiService {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl; // Базовый URL для API
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

    // Сохраняет данные пользователя
    saveUserData(userId, score, purchases) {
        return fetch(`${this.baseUrl}/api/userData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, score, purchases })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Данные пользователя сохранены:', data);
            return data;
        })
        .catch(error => {
            console.error('Ошибка сохранения данных пользователя:', error);
            throw error;
        });
    }

    // Получает данные пользователя
    getUserData(userId) {
        return fetch(`${this.baseUrl}/api/userData/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Получены данные пользователя:', data);
                return data;
            })
            .catch(error => {
                console.error('Ошибка получения данных пользователя:', error);
                throw error;
            });
    }
}