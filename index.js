// Получаем элементы header и footer
const headerText = document.getElementById('headerText');
const footerText = document.getElementById('footerText');

// Получаем блоки и кнопки
const blocks = document.querySelectorAll('.block');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const navLinks = document.querySelectorAll('.nav-links a'); // Получаем ссылки навигации

let currentBlock = 0;
let autoSwitch = true; // Флаг для автоматического переключения
let blockInterval;

// Функция для переключения блоков
function showBlock(index) {
    blocks.forEach((block, i) => {
        block.classList.remove('active');
        if (i === index) {
            block.classList.add('active');
        }
    });
}

// Функция автоматического переключения блоков
function autoSwitchBlocks() {
    blockInterval = setInterval(() => {
        if (autoSwitch) {
            currentBlock = (currentBlock + 1) % blocks.length;
            showBlock(currentBlock);
        }
    }, 5000); // Задержка в 5 секунд
}

// Стартовая анимация текста и блоков
// setTimeout(() => {
//     headerText.style.width = '20%'; // Анимация печатания заголовка
// }, 500); // Пауза перед анимацией

// setTimeout(() => {
//     footerText.style.width = '100%'; // Анимация печатания футера
// }, 3500); // После завершения анимации заголовка

setTimeout(() => {
    showBlock(currentBlock); // Появление первого блока после завершения анимации текста
    autoSwitchBlocks(); // Запуск автоматической смены блоков
}, 4000); // Через 7 секунд, когда текст полностью напечатан

// Переключение блоков вперед по клику на кнопку "Вперед"
nextButton.addEventListener('click', () => {
    clearInterval(blockInterval); // Останавливаем автоматическую смену
    autoSwitch = false; // Блокируем авто-переключение

    currentBlock = (currentBlock + 1) % blocks.length; // Переход к следующему блоку
    showBlock(currentBlock);
});

// Переключение блоков назад по клику на кнопку "Назад"
prevButton.addEventListener('click', () => {
    clearInterval(blockInterval); // Останавливаем автоматическую смену
    autoSwitch = false; // Блокируем авто-переключение

    currentBlock = (currentBlock - 1 + blocks.length) % blocks.length; // Переход к предыдущему блоку
    showBlock(currentBlock);
});

// Переключение блоков при клике на ссылки навигации
navLinks.forEach((link, index) => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Отключаем переход по ссылке
        clearInterval(blockInterval); // Останавливаем автоматическую смену
        autoSwitch = false; // Блокируем авто-переключение

        currentBlock = index; // Переход к выбранному блоку
        showBlock(currentBlock);
    });
});

function runAnimation() {
    const headerText = document.querySelector('.logo');
    const footerText = document.querySelector('.footer');

    // Проверка ширины экрана
    if (window.matchMedia('(max-width: 1024px)').matches) {
        // Код для экранов 480px и меньше
        setTimeout(() => {
            headerText.style.width = '100%'; // Анимация печатания заголовка
        }, 500); // Пауза перед анимацией

        setTimeout(() => {
            footerText.style.width = '100%'; // Анимация печатания футера
        }, 3500); // После завершения
    } else {
        // Код для экранов больше 480px
        setTimeout(() => {
            headerText.style.width = '20%'; // Анимация печатания заголовка
        }, 500); // Пауза перед анимацией

        setTimeout(() => {
            footerText.style.width = '100%'; // Анимация печатания футера
        }, 3500); // После завершения
    }
}

// Вызываем функцию анимации при загрузке страницы
window.addEventListener('load', runAnimation);

// Опционально: можно добавить отслеживание изменения размеров экрана, чтобы применять изменения динамически
window.addEventListener('resize', runAnimation);

