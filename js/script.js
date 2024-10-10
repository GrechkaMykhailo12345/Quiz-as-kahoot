const start_button = document.querySelector(".start-button")
const button_settings = document.querySelector(".button-settings")
const start_screen = document.querySelector(".start-screen")
const settings_screen = document.querySelector(".settings-screen")
const develop_screen = document.querySelector(".develop-screen")

const bgMusic = new Audio('audio/bg_musik.mp3')
bgMusic.loop = true
bgMusic.volume = 0.5
bgMusic.play()

button_settings.addEventListener("click", function() {
    start_screen.style.display = 'none'
    settings_screen.style.display = "block"
}) 


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
    let currentDifficulty = this.innerHTML.split(': ')[1];

    // Змінюємо рівень складності
    let newIndex = (difficultyLevels.indexOf(currentDifficulty) + 1) % difficultyLevels.length;
    this.innerHTML = `Dificult: ${difficultyLevels[newIndex]}`;
});

document.getElementById('timerButton').addEventListener('click', function () {
    let currentTimer = this.innerHTML.match(/\d+/);
    currentTimer = parseInt(currentTimer);

    // Змінюємо таймер (крок 10 секунд)
    let newTimer = currentTimer + 10;
    if (newTimer > 60) {
        newTimer = 10; // Повертаємось до 10 секунд
    }
    this.innerHTML = `Timer: ${newTimer} seconds`;
});

document.getElementById('exitButtonTopLeft').addEventListener('click', function () {
    start_screen.style.display = 'flex'
    settings_screen.style.display = "none"
});

document.getElementById('nextScreenButton').addEventListener('click', function () {
    develop_screen.style.display = 'flex'
    settings_screen.style.display = "none"
});

