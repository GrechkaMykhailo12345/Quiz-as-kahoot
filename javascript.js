
document.addEventListener('DOMContentLoaded', function() {
    
    
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', function() {
        alert('Починаємо тест!');
    });

    
    const circleBtn = document.getElementById('circle-btn');
    circleBtn.addEventListener('click', function() {
        circleBtn.classList.toggle('clicked');
    });
});





