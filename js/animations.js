const INCREASE_NUMBER_ANIMATION_SPEED = 50;
let animationInited = false;

//Счетчик клиентов

function increaseNumberAnimationStep(i, element, endNumber) {
    if (i <= endNumber) {
        if (i === endNumber) {
            element.innerText = i + '+';
        } else {
            element.innerText = i;
        }
        i += 100;
        setTimeout(function () {
            increaseNumberAnimationStep(i, element, endNumber);
        }, INCREASE_NUMBER_ANIMATION_SPEED)
    }
};

function initIncreaseNumberAnimation() {
    let element = document.querySelector(".features__clients-count");
    increaseNumberAnimationStep(0, element, 5000)
}

//Добавление поля "Введите ваш вариант"

document.querySelector('#budget').addEventListener('change', function handleSelectChange(event) {
    if (event.target.value === 'other') {
        const formContainer = document.createElement("div");
        formContainer.classList.add("form__group", "form__other-input");

        const input = document.createElement("input");
        input.setAttribute("placeholder", "Введите ваш вариант");
        input.setAttribute("type", "text");

        formContainer.appendChild(input);

        document.querySelector(".form form").insertBefore(formContainer, document.querySelector(".form__submit"));
    };

    const otherInput = document.querySelector('.form__other-input');
    if (event.target.value !== 'other' && Boolean(otherInput)) {
        // Удаляем ранее добавленное текстовое поле, если оно есть в DOM
        document.querySelector('.form form').removeChild(otherInput);
    }

});

//Изменение свойств header и счетчика клиентов при использовании скролл

function updateScroll() {
    if (window.scrollY > 0) {
        document.querySelector("header").classList.add("header__scrolled");
    } else {
        document.querySelector("header").classList.remove("header__scrolled");
    }
    // Запуск анимации увеличения числа

    let windowBottomPosition = window.scrollY + window.innerHeight;
    let countElementPosition = document.querySelector('.features__clients-count').offsetTop;

    if(windowBottomPosition>=countElementPosition && !animationInited){
        animationInited=true;
        initIncreaseNumberAnimation();
    }
}

window.addEventListener("scroll", updateScroll)