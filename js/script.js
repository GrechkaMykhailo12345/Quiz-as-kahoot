const answersContainer = document.querySelector('.answers'); // Знаходимо контейнер з кнопками
const skip_btn = document.querySelector('.skip-btn');
const timerElement = document.getElementById('seconds'); // Елемент для відображення таймера
let questionsList = []; // Список питань
let currentQuestionIndex = 0; // Індекс поточного питання
let timerInterval; // Інтервал для таймера

// Функція для отримання питань
async function getQuestions() {
    let response = await fetch("questions.json");
    let questions = await response.json();
    return questions;
}

// Функція для перемішування масиву
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Функція для запуску таймера
function startTimer() {
    let timeLeft = 5; // 5 секунд на відповідь
    timerElement.textContent = timeLeft;

    // Очищуємо попередній інтервал, якщо він є
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Створюємо новий інтервал
    timerInterval = setInterval(function () {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= -1) {
            clearInterval(timerInterval); // Зупиняємо таймер
            skipQuestion(); // Переходимо до наступного питання
        }
    }, 1000); // Кожна секунда
}

// Функція для відображення поточного питання та відповідей
function displayQuestion() {
    const questionElement = document.querySelector('.question');
    questionElement.textContent = questionsList[currentQuestionIndex].question;

    // Очищення контейнера з кнопками
    answersContainer.innerHTML = '';

    // Перемішування відповідей
    const shuffledAnswers = shuffle(questionsList[currentQuestionIndex].answers.slice());

    // Створення кнопок для відповідей
    shuffledAnswers.forEach(answer => {
        const button = document.createElement("div");
        button.classList.add("answer-button");
        button.textContent = answer;

        // Додаємо обробник події для кнопки
        button.addEventListener('click', function (e) {
            // Перевіряємо відповідь
            handleAnswerClick(answer,e.target);
        });

        answersContainer.appendChild(button);
    });

    // Запускаємо таймер на 5 секунд
    startTimer();
}

// Обробник натискання на кнопку відповіді
function handleAnswerClick(selectedAnswer, selected_button) {
    const correctAnswer = questionsList[currentQuestionIndex].correct; // Правильна відповідь

    // Зупиняємо таймер, якщо користувач відповів
    clearInterval(timerInterval);

    if (selectedAnswer === correctAnswer) {
        console.log("Вірно!");
        selected_button.style.borderColor = "rgba(0,255,0)"
        
    } else {
        console.log("Неправильно! Правильна відповідь: " + correctAnswer);
        selected_button.style.borderColor = "rgba(255,0,0)"
    }
    anime({
        targets: selected_button,
        borderColor: "#BAE0A0",
        duration: 500,
        delay: 100,
        easing: "linear"
    });

    // Переход до наступного питання
    currentQuestionIndex = (currentQuestionIndex + 1) % questionsList.length; // Переходимо до наступного питання
    setTimeout(() => {
        displayQuestion();
    }, 2000);
     // Відображаємо наступне питання
}

// Функція для пропуску питання, коли користувач не відповів вчасно
function skipQuestion() {
    currentQuestionIndex = (currentQuestionIndex + 1) % questionsList.length; // Переходимо до наступного питання
    displayQuestion(); // Відображаємо наступне питання
}

// Завантажуємо питання при завантаженні сторінки
getQuestions().then(function (questions) {
    questionsList = shuffle(questions); // Перемішуємо питання
    displayQuestion(); // Відображаємо перше питання
});

// Обробник для кнопки "Пропустити"
skip_btn.addEventListener('click', function(){
    clearInterval(timerInterval); // Зупиняємо таймер
    skipQuestion(); // Пропускаємо питання
});
