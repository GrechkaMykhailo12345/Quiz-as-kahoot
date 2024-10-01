document.getElementById('volumeButton').addEventListener('click', function () {
    let currentVolume = this.innerHTML.match(/\d+/);
    currentVolume = parseInt(currentVolume);
    
    // Змінюємо гучність (крок 10%)
    let newVolume = currentVolume + 10;
    if (newVolume > 100) {
        newVolume = 0; // Повертаємось до 0%
    }
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
    alert("Вихід з екрану налаштувань");
});

document.getElementById('nextScreenButton').addEventListener('click', function () {
    alert("Перехід на наступний екран");
});

