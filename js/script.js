document.getElementById('volumeButton').addEventListener('click', function () {
    let currentVolume = this.innerHTML.match(/\d+/);
    currentVolume = parseInt(currentVolume);
    
    // Змінюємо гучність (крок 10%)
    let newVolume = currentVolume + 10;
    if (newVolume > 100) {
        newVolume = 0; // Повертаємось до 0%
    }
    this.innerHTML = `Гучність: ${newVolume}%`;
});

document.getElementById('difficultyButton').addEventListener('click', function () {
    let difficultyLevels = ['Легкий', 'Середній', 'Складний'];
    let currentDifficulty = this.innerHTML.split(': ')[1];
    
    // Змінюємо рівень складності
    let newIndex = (difficultyLevels.indexOf(currentDifficulty) + 1) % difficultyLevels.length;
    this.innerHTML = `Рівень складності: ${difficultyLevels[newIndex]}`;
});

document.getElementById('timerButton').addEventListener('click', function () {
    let currentTimer = this.innerHTML.match(/\d+/);
    currentTimer = parseInt(currentTimer);
    
    // Змінюємо таймер (крок 10 секунд)
    let newTimer = currentTimer + 10;
    if (newTimer > 60) {
        newTimer = 10; // Повертаємось до 10 секунд
    }
    this.innerHTML = `Таймер на питання: ${newTimer} секунд`;
});

document.getElementById('exitButtonTopLeft').addEventListener('click', function () {
    alert("Вихід з екрану налаштувань (зліва зверху)");
});

document.getElementById('nextScreenButton').addEventListener('click', function () {
    alert("Перехід на наступний екран");
});

