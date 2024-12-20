
const start_button = document.querySelector(".start-button")
const game_screen = document.querySelector(".game-screen")
const button_settings = document.querySelector(".button-settings")
const start_screen = document.querySelector(".start-screen")
const settings_screen = document.querySelector(".settings-screen")
const develop_screen = document.querySelector(".develop-screen")
let totalTimer = 5*60
let currentDifficulty = "Normal"
const bgMusic = new Audio('audio/bg_musik.mp3')
bgMusic.loop = true
bgMusic.volume = 0.5
let isMusicPlayed = false;

document.addEventListener('mousemove', function () {
    if (!isMusicPlayed) {
        bgMusic.play()
        isMusicPlayed = true; // Щоб музика грала лише один раз
    }
});


document.getElementById('volumeButton').addEventListener('click', function () {
    let currentVolume = this.innerHTML.match(/\d+/);
    currentVolume = parseInt(currentVolume);

    // Змінюємо гучність (крок 10%)
    let newVolume = currentVolume + 10;
    if (newVolume > 100) {
        newVolume = 0; // Повертаємось до 0%
    }
    bgMusic.volume = newVolume / 100
    this.innerHTML = `Sound: ${newVolume}%`;
});

document.getElementById('difficultyButton').addEventListener('click', function () {
    let difficultyLevels = ['Easy', 'Normal', 'Hard'];
    currentDifficulty = this.innerHTML.split(': ')[1];

    // Змінюємо рівень складності
    let newIndex = (difficultyLevels.indexOf(currentDifficulty) + 1) % difficultyLevels.length;
    this.innerHTML = `Dificult: ${difficultyLevels[newIndex]}`;
    currentDifficulty = difficultyLevels[newIndex];
});

document.getElementById('timerButton').addEventListener('click', function () {
    let currentTimer = this.innerHTML.match(/\d+/);
    currentTimer = parseInt(currentTimer);

    // Змінюємо таймер (крок 5 хвилина)
    let newTimer = currentTimer + 5;
    if (newTimer > 30) {
        newTimer = 5; // Повертаємось до 5 хвилин
    }
    this.innerHTML = `Timer: ${newTimer} minutes`;
    totalTimer =newTimer;
});

button_settings.addEventListener("click", function() {
    document.body.style.backgroundImage = "url(../img/bg1.png)"
    start_screen.style.display = 'none'
    settings_screen.style.display = "block"
}) 

document.getElementById('exitButtonTopLeft').addEventListener('click', function () {
    document.body.style.backgroundImage = "url(../img/bg1.png)"
    start_screen.style.display = 'flex'
    settings_screen.style.display = "none"
});

document.getElementById('nextScreenButton').addEventListener('click', function () {
    develop_screen.style.display = 'flex'
    settings_screen.style.display = "none"
});

document.getElementById('exitButtonTopLeft2').addEventListener('click', function () {
    settings_screen.style.display = 'block'
    develop_screen.style.display = "none"
});

let points  = 0;
start_button.addEventListener('click', function () {
    points = 0;
    currentQuestionIndex = 0;
    displayQuestion(); // Відображаємо перше питання
    game_screen.style.display = 'flex'
    start_screen.style.display = "none"
    document.body.style.backgroundImage = "url(../img/bg3.png)"
    setTimeout(endQuiz, totalTimer*60*1000)
});


// Код квізу

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
    let timeLeft;
    if (currentDifficulty=='Easy'){
        timeLeft = 25; // 5 секунд на відповідь
    } else if (currentDifficulty=='Normal'){
        timeLeft = 10; // 5 секунд на відповідь
    }  else {
        timeLeft = 5; // 5 секунд на відповідь
    }
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
        points += 1
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
    currentQuestionIndex = (currentQuestionIndex + 1); // Переходимо до наступного питання
    if (currentQuestionIndex < questionsList.length){
        displayQuestion(); // Відображаємо наступне питання
    } else{
        endQuiz();
    }
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

function endQuiz(){
    game_screen.style.display = 'none'
    start_screen.style.display = "flex"
    document.body.style.backgroundImage = "url(../img/bg1.png)"
    let result = document.querySelector('.result')
    result.innerHTML = "Результат: " + points +" очок"
    
}