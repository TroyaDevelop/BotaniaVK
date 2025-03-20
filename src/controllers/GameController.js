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
        
        // Обновляем счетчик
        this.gameView.updateScore(this.gameModel.getScore());
        
        // Отмечаем, что игра инициализирована
        this.gameModel.setInitialized(true);
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
                .catch(error => console.error('Ошибка сохранения результата:', error));
        }
    }

    // Сбрасывает игру
    resetGame() {
        this.gameModel.resetScore();
    }
}