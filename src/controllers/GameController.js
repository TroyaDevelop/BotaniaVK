/**
 * Контроллер игры - связывает модель и представление
 */
export default class GameController {
    constructor(gameModel, gameView, userModel, apiService) {
        this.gameModel = gameModel;
        this.gameView = gameView;
        this.userModel = userModel;
        this.apiService = apiService;
        
        // Привязываем методы к контексту
        this.handleClick = this.handleClick.bind(this);
        
        // Устанавливаем обработчик клика
        this.gameView.setClickHandler(this.handleClick);
        
        // Добавляем представление как наблюдателя модели
        this.gameModel.addObserver(this.gameView);
    }

    // Инициализирует игру с данными пользователя
    initGame() {
        if (this.gameModel.isInitialized()) {
            console.log('Игра уже инициализирована, пропускаем повторную инициализацию');
            return;
        }

        const userData = this.userModel.getUserData();
        console.log('Инициализация игры для пользователя:', userData.id);
        
        // Проверка статуса сервера
        this.apiService.checkStatus()
            .then(data => {
                this.gameView.updateServerStatus(data.message);
            })
            .catch(error => {
                this.gameView.showServerError();
                console.error('Ошибка получения статуса сервера:', error);
            });
        
        // Отрисовываем игру
        this.gameView.render(userData.firstName);
        
        // Загружаем предыдущий результат пользователя
        this.loadUserScore();
        
        // Загружаем таблицу лидеров
        this.loadLeaderboard();
        
        // Отмечаем, что игра инициализирована
        this.gameModel.setInitialized(true);
    }

    // Загружает предыдущий результат пользователя
    loadUserScore() {
        const userId = this.userModel.getUserId();
        if (!userId) return;

        this.apiService.getScore(userId)
            .then(score => {
                if (score > 0) {
                    // Устанавливаем предыдущий результат, если он больше текущего
                    if (score > this.gameModel.getScore()) {
                        this.gameModel.setScore(score);
                    }
                }
            })
            .catch(error => console.error('Ошибка загрузки результата:', error));
    }

    // Загружает таблицу лидеров
    loadLeaderboard() {
        this.apiService.getLeaderboard()
            .then(leaderboard => {
                const userId = this.userModel.getUserId();
                this.gameView.renderLeaderboard(leaderboard, userId);
            })
            .catch(error => console.error('Ошибка загрузки таблицы лидеров:', error));
    }

    // Обработчик клика на кнопку
    handleClick() {
        // Увеличиваем счет (модель сама обновит представление через Observer)
        const newScore = this.gameModel.incrementScore();
        
        // Анимируем клик
        this.gameView.animateClick();
        
        // Сохраняем результат каждые 5 кликов
        if (newScore % 5 === 0) {
            const userId = this.userModel.getUserId();
            this.apiService.saveScore(userId, newScore)
                .then(() => {
                    // Обновляем таблицу лидеров
                    this.loadLeaderboard();
                })
                .catch(error => console.error('Ошибка сохранения результата:', error));
        }
    }

    // Сбрасывает игру
    resetGame() {
        this.gameModel.resetScore();
    }
}