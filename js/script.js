const answersContainer = document.querySelector('.answers'); // Знаходимо контейнер з кнопками
const skip_btn = document.querySelector('.skip-btn');
let questionsList = []; // Список питань
let currentQuestionIndex = 0; // Індекс поточного питання
let questionTimer = 30

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
        button.addEventListener('click', function () {
            // Перевіряємо відповідь
            handleAnswerClick(answer);
        });

        answersContainer.appendChild(button);
    });
}

// Обробник натискання на кнопку відповіді
function handleAnswerClick(selectedAnswer) {
    const correctAnswer = questionsList[currentQuestionIndex].correct; // Правильна відповідь

    if (selectedAnswer === correctAnswer) {
        console.log("Вірно!");
    } else {
        console.log("Неправильно! Правильна відповідь: " + correctAnswer);
    }

    // Переход до наступного питання
    currentQuestionIndex = (currentQuestionIndex + 1) % questionsList.length; // Переходимо до наступного питання
    displayQuestion(); // Відображаємо наступне питання
}

// Завантажуємо питання при завантаженні сторінки
getQuestions().then(function (questions) {
    questionsList = shuffle(questions); // Перемішуємо питання
    displayQuestion(); // Відображаємо перше питання
});

skip_btn.addEventListener('click', function(){
    currentQuestionIndex = (currentQuestionIndex + 1) % questionsList.length; // Переходимо до наступного питання
    displayQuestion(); // Відображаємо наступне питання
})