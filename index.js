// Получаем блоки и кнопки
const blocks = document.querySelectorAll('.block');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const navbarLinks = document.querySelector('.navbar-links'); // Получаем элемент навигации
const navLinks = document.querySelectorAll('.nav-links a'); // Получаем ссылки навигации
const footerText = document.querySelector('.footer'); // Получаем элемент footer
const buttonsWrapper = document.querySelector('.wrapper-nav-btn'); // Контейнер для кнопок





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

// Функция для запуска автоматического переключения блоков
function startAutoSwitch() {
    blockInterval = setInterval(() => {
        currentBlock = (currentBlock + 1) % blocks.length;
        showBlock(currentBlock);
    }, 5000); // Переключаем блоки каждые 5 секунд
}

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

// Функция для создания анимации печатания текста
function createTypedAnimation(elementId, stringsElementId, onCompleteCallback) {
    return new Typed(elementId, {
        stringsElement: stringsElementId,
        typeSpeed: 100, // Скорость печати
        startDelay: 500, // Задержка перед стартом анимации
        backSpeed: 50, // Скорость удаления
        loop: false, // Не повторяем анимацию
        onComplete: onCompleteCallback // Выполняем после завершения
    });
}

// Скрываем footer, навигацию и кнопки в начале
footerText.style.opacity = '0';
navbarLinks.classList.add('hidden');
buttonsWrapper.classList.add('hidden');

// Создаем анимации для заголовка и футера
createTypedAnimation('#typed1', '#typed-strings1', () => {
    // После завершения анимации логотипа показываем footer
    footerText.style.opacity = '1'; // Показываем footer
    createTypedAnimation('#typed2', '#typed-strings2', () => {
        // Показываем первый блок после завершения всех анимаций
         // После паузы плавно показываем навигацию
     // 500 мс после показа footer
        setTimeout(() => {
            navbarLinks.classList.remove('hidden');
            navbarLinks.classList.add('visible');
        }, 500);

        // Плавно показываем первый блок через еще немного времени
    // 1000 мс после появления навигации

        setTimeout(() => {
            showBlock(0);
        }, 1000); 
        // Запускаем автоматическое переключение блоков
        startAutoSwitch();

         // Плавно показываем кнопки после появления первого блока
    setTimeout(() => {
        buttonsWrapper.classList.remove('hidden');
        buttonsWrapper.classList.add('visible');
    }, 1500); // Через 1500 мс после появления блока
    });
    
   

    
});
