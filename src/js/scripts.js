// Модальное окно
const modals = document.querySelectorAll('.modal');
const popup = document.querySelector('.popup');
let modalName;
let scrollPosition;

function disableBodyScroll() {
    if (typeof scrollPosition === 'undefined') {
        // Сохраняем текущую позицию прокрутки только при первом открытии модального окна
        scrollPosition = window.scrollY || window.pageYOffset;

        // Добавляем класс для блокировки прокрутки
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
    }
}

function enableBodyScroll() {
    // Для закрытия модального окна, восстанавливаем прокрутку только если позиция была сохранена
    if (typeof scrollPosition !== 'undefined') {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);

        // Сбрасываем сохраненную позицию прокрутки
        scrollPosition = undefined;
    }
}
// Клик вне .popup
document.addEventListener('mouseup', function (e) {
    const popups = document.querySelectorAll('.popup');

    popups.forEach(popup => {
        const modal = popup.closest('.modal'); // Получаем ближайший родитель .modal для текущего .popup

        // Проверяем наличие .active у родителя .modal
        if (modal && modal.classList.contains('active')) {
            if (!popup.contains(e.target)) {
                closeModal();
            }
        }
    });
});


// Открыть модальное окно
function openModal(modalName) {
    let modal = document.getElementById(modalName);
    modal.classList.add("active");
    disableBodyScroll();

    
}

// Переключить модальное окно
let modal1, modal2;
function changeModal(modal1, modal2) {
    let openingModal = document.getElementById(modal2);
    let closingModal = document.getElementById(modal1);
    openingModal.classList.add("active");
    closingModal.classList.remove("active");

}

// Закрыть модальное окно
function closeModal() {
    
    modals.forEach(function(item) {
        item.classList.remove("active");
    })
    enableBodyScroll();
}

// Input маски
let phoneInputs = document.querySelectorAll('input[type="tel"]');
if (phoneInputs) {
    Inputmask({"mask": "+7 (999) 999-99-99"}).mask(phoneInputs);
}

let verifyInputs = document.querySelectorAll('.verify-input');
if (verifyInputs) {
    Inputmask("9 9 9 9 9", {placeholder: "-"}).mask(verifyInputs);
}

let seriesInput = document.getElementById('passport-series');
if (seriesInput) {
    Inputmask({"mask": "99 99"}).mask(seriesInput);
}

let numberInput = document.getElementById('passport-number');
if (numberInput) {
    Inputmask({"mask": "99 99 99"}).mask(numberInput);

}

let dateInputs = document.querySelectorAll('.masked-date');
if (dateInputs) {
    Inputmask({"mask": "99.99.9999"}).mask(dateInputs);
}

let codeInput = document.getElementById('passport-code');
if (codeInput) {
    Inputmask({"mask": "999-999"}).mask(codeInput);
}

let incomeInput = document.getElementsByClassName('input-sum');
if (incomeInput) {
    Inputmask({
        alias: 'numeric',
        groupSeparator: ' ',
        autoGroup: true,
        rightAlign: false,
        allowPlus: false,
        allowMinus: false,
        suffix: ' ₽',
        digits: 0
    }).mask(incomeInput);
}

// Таймер на странице верификации

const smsTimer = document.getElementById('sms-timer');
const timerBlock = document.querySelector('.timer-block');
let timerCount = 59;
let timerInterval;

function updateTimer() {
    if (timerCount >= 0) {
        smsTimer.textContent = timerCount < 10 ? '0' + timerCount : timerCount;
        timerCount--;
    } else {
        timerBlock.style.display = 'none';
        clearInterval(timerInterval);
    }
}

if (smsTimer) {
    timerInterval = setInterval(updateTimer, 1000);

    function sendSms() {
        timerCount = 59;
        timerInterval = setInterval(updateTimer, 1000);
        timerBlock.style.display = 'inline';
    }
}


// Звезды рейтнга (оценка сервиса)
const ratingItems = document.querySelectorAll('.rating__item');
const sendRatingBtn = document.getElementById('send-rating');
let rating = 0;
let tipsValue = 0;
let lastActiveIndex = -1;

ratingItems.forEach(function(item, index) {
    item.addEventListener('mouseenter', function() {
        for (let i = 0; i <= index; i++) {
            ratingItems[i].classList.add('active');
        }
        
    });

    item.addEventListener('mouseleave', function() {
        ratingItems.forEach(function(item) {
            item.classList.remove('active');
        });
        if (lastActiveIndex !== -1) {
            for (let i = 0; i <= lastActiveIndex; i++) {
                ratingItems[i].classList.add('active');
            }
        }
    });

    item.addEventListener('click', function() {
        lastActiveIndex = index;
        rating = item.getAttribute("data-rate");
        
        if(sendRatingBtn) {
            sendRatingBtn.classList.remove('btn-disabled');
        }
        
        ratingItems.forEach(function(item) {
            item.classList.remove('active');
        });
        for (let i = 0; i <= index; i++) {
            ratingItems[i].classList.add('active');
        }
    });
});


// Чаевые

const tipsItems = document.querySelectorAll('.tips__item');

if(tipsItems) {
    tipsItems.forEach(function(tip) {
        tip.addEventListener('click', function() {
            tipsItems.forEach(function(tip) {
                tip.classList.remove('active');
            });
            if (!tip.classList.contains("checked")) {
                tip.classList.add('active','checked');
                tipsValue = tip.getAttribute('data-tip');
            } else {
                tip.classList.remove('active','checked');
                tipsValue = 0;
            }
        });
    });
}

// Вывод значения оценки и чаевых (просто в консоль)
if (sendRatingBtn) {
    sendRatingBtn.addEventListener('click', function () {
        console.log('rating: ', rating);
        console.log('tipsValue: ', tipsValue);
    })
}


// Для input type=range

const inputRange = document.querySelector('input[type="range"]');
let loanRate = 0.8;


if (inputRange) {

    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
        e.style.setProperty('--value', e.value);
        e.style.setProperty('--min', e.min == '' ? '0' : e.min);
        e.style.setProperty('--max', e.max == '' ? '100' : e.max);
        e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    }


    // Калькулятор
    const calculators = document.querySelectorAll('.calculator');

    calculators.forEach(calculator => {
        // Выбор суммы
        let sumSliders = calculator.querySelectorAll('.sum-slider');
        let termSliders = calculator.querySelectorAll('.term-slider');
        let termInput = calculator.querySelector('.term-input');
        let sumInput = calculator.querySelector('.sum-input');
        let resultTotal = calculator.querySelector('.result-total');
        let resultPercent = calculator.querySelector('.result-percent');
        let calcSubmit = calculator.querySelector('.calculator-submit');
        let totalSum = +sumInput.value;

        sumSliders.forEach(sumSlider => {
            let rangeInput = sumSlider.querySelector('input');
            let rangeOutput = sumSlider.querySelector('output');
    
            function updateSum() {
                
                let sumResults = calculator.querySelectorAll('.result-sum');
                let formattedValue = parseFloat(rangeInput.value).toLocaleString('ru-RU');
                rangeOutput.textContent = formattedValue + " ₽";
                let totalTerm = termInput.value;
                console.log('totalTerm: ', totalTerm);
                totalSum = +sumInput.value;
                let percentTotal;
                if (totalTerm <= 21) {
                    percentTotal = 0;
                    resultPercent.style.display = 'block';
                    calcSubmit.textContent = 'Получить льготный период';
                } else {
                    percentTotal = (totalSum / 100 * loanRate) * +totalTerm;
                    resultPercent.style.display = 'none';
                    calcSubmit.textContent = 'Получить деньги';
                }
                let formattedTotal = parseFloat(totalSum + percentTotal);
                resultTotal.textContent =formattedTotal + " ₽";
                sumResults.forEach(function (sumResult) {
                    sumResult.textContent = formattedValue + " ₽";
                })
                rangeOutput.style.left = (rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min) * 100 + "%";
            }
        
            rangeInput.addEventListener('input', updateSum);
            updateSum();
        } )

        // Выбор кол-ва дней

        termSliders.forEach(termSlider => {
            let rangeInput = termSlider.querySelector('input');
            let rangeOutput = termSlider.querySelector('output');

            function updateTerm() {
                let calcDays = calculator.querySelector(".calc-days");
                let dateResults = calculator.querySelectorAll(".result-date");
                let value = rangeInput.value;
                let today = new Date();
                let futureDate = new Date(today.getTime() + value * 24 * 60 * 60 * 1000);

                let day = futureDate.getDate();
                let month = futureDate.getMonth() + 1; 
                let year = futureDate.getFullYear().toString().substr(2,2);
                if (day < 10) {
                    day = '0' + day;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                let formattedDate = day + '.' + month + '.' + year;

                let lastDigit = value % 10;
                let termText;
                if (value > 10 && value < 20) {
                    termText = "дней";
                } else if (lastDigit === 1) {
                    termText = "день";
                } else if (lastDigit >= 2 && lastDigit <= 4) {
                    termText = "дня";
                } else {
                    termText = "дней";
                }

                
                totalSum = +sumInput.value;
                let percentTotal;
                if (value <= 21) {
                    percentTotal = 0;
                    resultPercent.style.display = 'block';
                    calcSubmit.textContent = 'Получить льготный период';
                } else {
                    percentTotal = (totalSum / 100 * loanRate) * +value;
                    resultPercent.style.display = 'none';
                    calcSubmit.textContent = 'Получить деньги';
                }
                let formattedTotal = parseFloat(totalSum + percentTotal);
                resultTotal.textContent =formattedTotal + " ₽";

                rangeOutput.textContent = value + " " + termText;
                calcDays.textContent = value + " " + termText;
                dateResults.forEach(function (dateResult) {
                    dateResult.textContent = formattedDate;
                });
                rangeOutput.style.left = (rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min) * 100 + "%";
            }

            rangeInput.addEventListener('input', updateTerm);
            updateTerm();

        })
    })

}

// faq на главной
const questions = document.querySelectorAll('.faq__question');
const answers = document.querySelectorAll('.faq__answer');

if (questions) {
    questions.forEach(function(question) {
        question.addEventListener('click', function() {
          const toggler = this.querySelector('.burger-toggler');
          const answer = this.nextElementSibling;
    
          if (answer.classList.contains('opened')) {
            answer.classList.remove('opened');
            toggler.classList.remove('active');
          } else {
            answers.forEach(function(answer) {
              answer.classList.remove('opened');
            });
    
            answer.classList.add('opened');
    
            document.querySelectorAll('.burger-toggler').forEach(function(toggler) {
              toggler.classList.remove('active');
            });
    
            toggler.classList.add('active');
          }
        });
    });
}


// Бургер меню 

const mobNavToggler = document.querySelector('.mob-nav-toggler');
const headerNav = document.querySelector('.header__nav');

if (mobNavToggler) {
    mobNavToggler.addEventListener('click', function() {
        this.classList.toggle('active');
        headerNav.classList.toggle('opened');
    });

    function closeMenu () {
        mobNavToggler.classList.remove('active');
        headerNav.classList.remove('opened')
    }
}

// сообщение в нижнем углу

const cornerMessage = document.querySelector('.corner-tip__message');
const closeMessage =  document.querySelector('.close-message');

if(cornerMessage) {
    setTimeout(() => {
        cornerMessage.classList.add('show');
    }, 2000);
    closeMessage.addEventListener('click', function() {
        cornerMessage.classList.remove('show')
    })
}


// переключение вкладок в Личном Кабинете

const promoTogglers = document.querySelectorAll('.list-settings__item');
const promoTabs = document.querySelectorAll('.promo-tab');

promoTogglers.forEach(function(promoToggler) {
    
    promoToggler.addEventListener('click', function () {
        promoTogglers.forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
        
        let promoTogglerData = promoToggler.getAttribute('data-tab');
        for(let p = 0; p<=promoTabs.length-1; p++){
            promoTabs[p].classList.remove('active');
            if (promoTabs[p].getAttribute('data-tab') == promoTogglerData) {
                promoTabs[p].classList.add('active');
            }
        }
    })
})



// формы

const forms = document.querySelectorAll('form');

if (forms) {
    forms.forEach(function (form) {
        var formBtn = form.querySelector('.js-form-btn');
        var formItems = form.querySelectorAll('.form-item');
        const newPassword = document.getElementById('new-password');
        const confirmPassword = document.getElementById('confirm-password');
        const inputErrors = form.querySelectorAll('.input-error');

        // Проверка обязательных полей

        function validateForm(event) {
            var hasEmptyFields = false;
            
            formItems.forEach(function (formItem) {
                var requiredInput = formItem.querySelector('input[required]');
                if (requiredInput && !requiredInput.value.trim()) {
                    requiredInput.classList.add('error');
                    if(formItem.querySelector('.input-error')) {
                        formItem.querySelector('.input-error').classList.add('active');
                    }
                    hasEmptyFields = true;
                    event.preventDefault();
                } else if (requiredInput) {
                    requiredInput.classList.remove('error');
                    if(newPassword) {
                        checkPasswords(event);
                    }
                    if (formItem.querySelector('.input-error')) {
                        formItem.querySelector('.input-error').classList.remove('active');
                    }
                }
            });
        }




        // активность кнопки в зависимости от заполненности поля

        var checkFillInputs = form.querySelectorAll('input[required]');

        if (checkFillInputs) {
            checkFillInputs.forEach(function(input) {
                input.addEventListener('input', function() {
                    var allFilled = true;
                    checkFillInputs.forEach(function(checkInput) {
                        if (checkInput.type === 'checkbox') {
                            if (!checkInput.checked) {
                                allFilled = false;
                            }
                        } else {
                            if (!checkInput.value.trim()) {
                                allFilled = false;
                            }
                        }
                    });

                    if (allFilled) {
                        formBtn.classList.remove('btn-disabled');
                    } else {
                        formBtn.classList.add('btn-disabled');
                    }
                });
            });
        }


        // Проверка соответствия паролей и отправка данных


        // Находим элементы и блоки на странице
       

        if(newPassword) {
        // Функция для проверки заполненности полей
            function checkFields() {
                if (newPassword.value && confirmPassword.value) {
                    formBtn.classList.remove('btn-disabled');
                } else {
                    formBtn.classList.add('btn-disabled');
                }
            }

            // Функция для проверки совпадения паролей
            function checkPasswords(event) {
                if (newPassword.value !== confirmPassword.value) {
                    newPassword.classList.add('error');
                    confirmPassword.classList.add('error');
                    inputErrors.forEach(function(error) {
                        error.classList.add('active');
                    });
                    event.preventDefault();
                } else {
                    newPassword.classList.remove('error');
                    confirmPassword.classList.remove('error');
                    inputErrors.forEach(function(error) {
                        error.classList.remove('active');
                    });
                }
            }

            // Обработчики событий для полей паролей и кнопки
            newPassword.addEventListener('input', checkFields);
            confirmPassword.addEventListener('input', checkFields);
            


            // Проверка пароля на наличие латинских букв и цифр

            function checkPasswordOnBlur() {
                var password = newPassword.value;
                
                var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                
                if (regex.test(password)) {
                    newPassword.classList.remove('error');

                } else {
                    newPassword.classList.add('error');
                }
            }

            newPassword.addEventListener('blur', checkPasswordOnBlur);
        }


        if (formBtn) {
            formBtn.addEventListener('click', function (event) {
                validateForm(event);
            });
            
        }
    })

}


// переключение вкладок c инфой на главной

const tabsContainers = document.querySelectorAll('.tabs');

var navLinks = document.querySelectorAll('.tabs .nav-tabs .nav-link');

if (tabsContainers) {

    tabsContainers.forEach(function (tabsContainer) {
        var navLinks = tabsContainer.querySelectorAll('.nav-tabs .nav-link');
        navLinks.forEach(function (navLink) {
            navLink.addEventListener('click', function (event) {
                event.preventDefault();

                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
                var targetId = navLink.getAttribute('id');
                var tabPanes = tabsContainer.querySelectorAll('.tab-content .tab-pane');
                tabPanes.forEach(function (tabPane) {
                    tabPane.classList.remove('active');
                    var ariaLabelledBy = tabPane.getAttribute('aria-labelledby');
                    if (ariaLabelledBy === targetId) {
                        tabPane.classList.add('active');
                    }
                });
            });
        });
    })
}

const checkboxBtns = document.querySelectorAll('.js-checkbox-btns');

if(checkboxBtns) {
    checkboxBtns.forEach(function(checkboxBtn) {
        var checkBtns = checkboxBtn.querySelectorAll('.btn');

        checkBtns.forEach(function (checkBtn) {
            checkBtn.addEventListener('click', function() {
                this.classList.add('bg-green');
                checkBtns.forEach(function (otherBtn) {
                    if (otherBtn !== checkBtn) {
                        otherBtn.classList.remove('bg-green')
                    }
                })
            })
        })
    })
}

// скрытие поля адреса если фактический совпадает с регистрацией

const sameAddress = document.querySelector('#same-address');
const factAddress = document.querySelector('.fact-address');

if (sameAddress) {
    sameAddress.addEventListener('click', function() {
        factAddress.classList.toggle('d-none');
    })
}



const hintedInputs = document.querySelectorAll('.js-hinted-input');

if(hintedInputs) {

    hintedInputs.forEach(function(hintedInput) {
        var input = hintedInput.querySelector('input');
        var inputHint = hintedInput.querySelector('.input-hint');

        input.addEventListener('focus', function() {
            inputHint.classList.add('active');
        });

        input.addEventListener('blur', function() {
            inputHint.classList.remove('active');
        });
    });

}

// Кнопка в роли чекбокса
const checkBtns = document.querySelectorAll('.js-checkbox-btn');

if (checkBtns) {
    checkBtns.forEach(function (checkBtn) {
        checkBtn.addEventListener('click', function () {
            this.classList.toggle('bg-green')
        })
    })
}

// показ скрытых чекбоксов

const showRulesBtn = document.querySelector('.show-rules');

if (showRulesBtn) {
    
    showRulesBtn.addEventListener('click', function () {
        document.querySelector('.hidden-checkboxes').classList.toggle('active');
    })
}


// flow-considering.html смена текста каждые 20 секунд
const consideringText = document.querySelector('.js-considering-dynamic-text');

if(consideringText) {
    setTimeout(() => {
        consideringText.textContent = 'Рассматриваем заявку на заем';
    }, 20000);
    setTimeout(() => {
        consideringText.textContent = 'Создаем личный кабинет';
    }, 40000);
}

// выбор всех чекбоксов при выборе одного (страница flow-approval.html)

const checkAll = document.querySelector('.js-check-all');
const autoChecks = document.querySelectorAll('.js-auto-check')
if(checkAll) {
    checkAll.addEventListener('change', function() {
        
        if (this.checked) {
            autoChecks.forEach(function(autoCheck) {
                autoCheck.checked = true;
            })
        } else {
            autoChecks.forEach(function(autoCheck) {
                autoCheck.checked = false;
            })
        }
    })
}

// редактирование адресов в account-personal-information

const personalCards = document.querySelectorAll('.personal-card');

if(personalCards) {

    let editOpened = false;

    personalCards.forEach(function(personalCard) {
        const personalEditBtn = personalCard.querySelector('.personal-card__edit');
        let personalForms = personalCard.querySelectorAll('form');

        if (personalEditBtn) {
            personalEditBtn.addEventListener('click', function () {
                personalForms.forEach(function (personalForm) {
                    personalForm.classList.toggle('active');
                });
                if (!editOpened) {
                    personalEditBtn.textContent = 'Скрыть';
                    editOpened = true;
                } else {
                    personalEditBtn.textContent = 'Редактировать';
                    editOpened = false;
                }
            })

            personalForms.forEach(function (personalForm) {
                let personalInput = personalForm.querySelector('input');
                let personalSave = personalForm.querySelector('.btn');
                let personalData = personalForm.previousElementSibling;

                personalSave.addEventListener('click', function() {
                    personalData.textContent = personalInput.value;
                    personalInput.value = '';
                    personalSave.classList.add('btn-disabled');
                })
            })
        }
    })
}

var fileInput = document.querySelector('input[type="file"]');
var filesContainer = document.querySelector('.loaded-files');

if (fileInput) {
    fileInput.addEventListener('change', function() {
        var files = fileInput.files;
        
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            
            if (file.type.match('image.*')) {
                var img = document.createElement('img');
                
                img.src = URL.createObjectURL(file);
                
                var fileItem = document.createElement('div');
                fileItem.classList.add('loaded-files__item');
                
                fileItem.appendChild(img);
            } else {
                var fileIcon = document.createElement('img');
                fileIcon.src = '../images/icons/file-icon.svg';
                var fileItem = document.createElement('div');
                fileItem.classList.add('loaded-files__item');
                fileItem.appendChild(fileIcon);
            }
            
            filesContainer.appendChild(fileItem);
        }
    });
}

const settingsSelect = document.querySelector('.settings-select');
const selectArrow = document.querySelector('.select-arrow');
const listSettings = document.querySelector('.list-settings');
const listSettingItems = document.querySelectorAll('.list-settings__item');
if (settingsSelect) {
    settingsSelect.addEventListener('click', function () {
        listSettings.classList.toggle('active');
        selectArrow.classList.toggle('active');
    });
        
    listSettingItems.forEach(function (listSettingItem) {
        listSettingItem.addEventListener('click', function () {
            listSettings.classList.remove('active');
            let settingText = listSettingItem.textContent;
            settingsSelect.querySelector('.selected-value').textContent = settingText;
            selectArrow.classList.remove('active');
        })
    })
}


let timer;

function startEmailTimer() {
    clearInterval(timer); // Остановка предыдущего таймера, если он существует

    let seconds = 59;
    const button = document.querySelector('.popup-email-button');
    button.classList.add('btn-disabled');
    // Функция обновления таймера
    function updateTimer() {
        const timerElement = document.querySelector('.popup-timer');
        

        if (seconds >= 0) {
            const secondsText = getSecondsText(seconds);
            timerElement.textContent = seconds + ' ' + secondsText;
            seconds--;
        } else {
            clearInterval(timer);
            button.classList.remove('btn-disabled');
        }
    }

    updateTimer();

    timer = setInterval(updateTimer, 1000);
}


// Функция определения правильного окончания для слова "секунда"
function getSecondsText(seconds) {
    if (seconds === 1 || (seconds > 20 && seconds % 10 === 1)) {
        return 'секунда';
    } else if ((seconds >= 2 && seconds <= 4) || (seconds > 20 && seconds % 10 >= 2 && seconds % 10 <= 4)) {
        return 'секунды';
    } else {
        return 'секунд';
    }
}

// Копирование текста промокода или ссылки в спец предложениях

const copyBtn = document.querySelector('.copy-btn');

if(copyBtn) {
    copyBtn.addEventListener('click', function () {

        let textToCopy = copyBtn.previousElementSibling.textContent;

        navigator.clipboard.writeText(textToCopy)

    })
}

const advantages = document.querySelector('.advantages');
var init = false;
var advantageSlider;
function swiperCard() {

  if (window.innerWidth <= 991) {
    if (!init) {
        init = true;
        advantageSlider = new Swiper('.advantages-slider', {
            slidesPerView: 1,
            spaceBetween: 40,
            autoplay: {
                delay: 4000,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            breakpoints: {
                576: {
                    slidesPerView: 1.5,
                    spaceBetween: 0
                }
            }
        });
    }
  } else if (init) {
    advantageSlider.destroy();
    init = false;
  }
}
if (advantages) {
    swiperCard();
    window.addEventListener("resize", swiperCard);
}

// кастомный селект (ЛК и flow)

const customSelects = document.querySelectorAll('.custom-select');

if (customSelects) {
    customSelects.forEach(function(customSelect) {
        let customSelectToggler = customSelect.querySelector('.custom-select__head');
        let customSelectResult = customSelect.querySelector('.custom-select__result');
        let customSelectOptions = customSelect.querySelectorAll('.custom-option');
        
        customSelectToggler.addEventListener('click', function() {
            this.parentNode.classList.toggle('active')
        })

        customSelectOptions.forEach(function(customSelectOption) {
            customSelectOption.addEventListener('click', function() {
                let customValue = customSelectOption.querySelector('.custom-select__value').textContent;
                customSelectOptions.forEach(function(item) {
                    item.removeAttribute('selected');
                })
                this.setAttribute('selected', '');
                customSelectResult.textContent = customValue;
                customSelect.classList.remove('active');
                customSelectToggler.classList.add('selected');
            })
        })
    })
}
 

// скрытие полей личной информации если выбран чекбокс Анонимно на странице feedback.html (Проблемы и предложения)

const anonimous = document.querySelector('#anonimous');
const personalInfo = document.querySelectorAll('.personal-data');

if (anonimous) {
    anonimous.addEventListener('click', function() {
        personalInfo.forEach(function (personal) {
            personal.classList.toggle('d-none');
        })
    })
}