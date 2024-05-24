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

let numberInput = document.getElementById('passport-number');
if (numberInput) {
    Inputmask({"mask": "99 99 999999"}).mask(numberInput);

}

let dateInputs = document.getElementsByClassName('input-date');
if (dateInputs) {
    Inputmask(
    {
        alias: 'datetime',
        rightAlign: false,
        allowPlus: false,
        allowMinus: false,
        digits: 0,
        placeholder: "__.__.____",
        inputFormat: "dd.mm.yyyy"
    }).mask(dateInputs);
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

let accountPays = document.querySelectorAll('.account-pay');

if (accountPays) {
    Inputmask({
        alias: 'numeric',
        groupSeparator: ' ',
        autoGroup: true,
        rightAlign: false,
        allowPlus: false,
        allowMinus: false,
        suffix: ' ₽',
        digits: 0
    }).mask(accountPays);
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
        sendRatingBtn.classList.remove('btn-disabled');
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

if (inputRange) {
    
    
    function formatNumber(number) {
        return number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
        e.style.setProperty('--value', e.value);
        e.style.setProperty('--min', e.min == '' ? '0' : e.min);
        e.style.setProperty('--max', e.max == '' ? '100' : e.max);
        e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    }


    // Калькулятор
    const calculators = document.querySelectorAll('.calculator');

    calculators.forEach(calculator => {
        // Ползунок - выбор суммы
        let sumSliders = calculator.querySelectorAll('.sum-slider');

        sumSliders.forEach(sumSlider => {
            let rangeInput = sumSlider.querySelector('input');
    
            function updateSum() {
                
                let sumResults = calculator.querySelectorAll('.result-sum');
                let monthlyResults = calculator.querySelectorAll('.result-monthly');
                let termActual = calculator.querySelector('.term-slider input');
                let formattedValue = parseFloat(rangeInput.value).toLocaleString('ru-RU');

                sumResults.forEach(function (sumResult) {
                    sumResult.textContent = formattedValue ;

                });
                let rangeValue = parseFloat(rangeInput.value);
                let termValue = parseFloat(termActual.value);
                let result = Math.round((rangeValue / termValue) * 100) / 100;
                let formattedResult = formatNumber(result);
                monthlyResults.forEach(function (monthlyResult) {
                    monthlyResult.textContent = formattedResult;
                })
            }
        
            rangeInput.addEventListener('input', updateSum);
            updateSum();
        } )

        // Ползунок - выбор кол-ва дней
        let termSliders = calculator.querySelectorAll('.term-slider');

        termSliders.forEach(termSlider => {
            let rangeInput = termSlider.querySelector('input');

            function updateTerm() {
                let calcDays = calculator.querySelector(".calc-days");
                let dateResults = calculator.querySelectorAll(".result-date");
                let monthlyResults = calculator.querySelectorAll('.result-monthly');
                let sumActual = calculator.querySelector('.sum-slider input');
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

                calcDays.textContent = value;
                dateResults.forEach(function (dateResult) {
                    dateResult.textContent = formattedDate;
                });
                let rangeValue = parseFloat(rangeInput.value);
                let sumValue = parseFloat(sumActual.value);
                let result = Math.round((sumValue / rangeValue) * 100) / 100;
                let formattedResult = formatNumber(result);
                monthlyResults.forEach(function (monthlyResult) {
                    monthlyResult.textContent = formattedResult;
                })
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

const promoTogglers = document.querySelectorAll('.promo-settings__item');
const promoTabs = document.querySelectorAll('.promo-tab');


if(promoTabs) {
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
}

// Показ всего списка faq на главной

const showAllBtn = document.querySelector('.show-all');
const tabs = document.querySelectorAll('.tab-pane');
let tabsOpened = false;

if(showAllBtn){
    tabs.forEach(function(tab) {
        let tabItems = tab.querySelectorAll('.info-tabs__item');
        for(let t=0; t<=tabItems.length-1; t++) {
            if (t>5) {
                tabItems[t].classList.add('hiding', 'hidden');
            }
        }
    })
        
    showAllBtn.addEventListener('click', function() {
        let hiddenElements = document.querySelectorAll('.hiding');
        if (!tabsOpened) {
            tabsOpened = true;
            hiddenElements.forEach(function(hiddenItem) {
                hiddenItem.classList.remove('hidden')
            })
            showAllBtn.textContent = 'Свернуть';
        } else {
            tabsOpened = false;
            hiddenElements.forEach(function(hiddenItem) {
                hiddenItem.classList.add('hidden');
            })
        }
    })
}

// Показ дополнительных опций в калькуляторе на лендинге

const rulesShow = document.querySelector('.show-rules');
const rulesHide = document.querySelector('.hide-rules');
const hiddenCheckbox = document.querySelector('.hidden-checkbox');

if (rulesShow) {
    rulesShow.addEventListener('click', function () {
        hiddenCheckbox.classList.add('show')
    });
    rulesHide.addEventListener('click', function () {
        hiddenCheckbox.classList.remove('show')
    })
}

// мобильная версия информационного аккордеона на главной

var cards = document.querySelectorAll('.main-info-mobile__card');

if (cards) {
    cards.forEach(function(card) {
        var title = card.querySelector('.main-info-mobile__title');
        
        title.addEventListener('click', function() {
            if (!card.classList.contains('opened')) {
            cards.forEach(function(item) {
                if (item !== card) {
                item.classList.remove('opened');
                }
            });
            card.classList.add('opened');
            } else {
            card.classList.remove('opened');
            }
        });
    });
}

// Одинаковая высота карточек в аккаунте 

const sameWrappers = document.querySelectorAll('.same-cards');
var maxHeight = 0;
let screenWidth = window.screen.width;

if(sameWrappers) {
    sameWrappers.forEach(function (sameWrapper) {
        let sameItems = sameWrapper.querySelectorAll('.same-item');

        function cardsResize() {
            screenWidth = window.screen.width;

            if (screenWidth >= 768) {
                
                    sameItems.forEach(function(card) {
                        var cardHeight = card.getBoundingClientRect().height;
                        
                        if (cardHeight > maxHeight) {
                            maxHeight = cardHeight;
                        }
                    });
                
                    sameItems.forEach(function(card) {
                        card.style.minHeight = maxHeight + 'px';
                    });
            } 
        }
        
        
        window.addEventListener('resize', cardsResize);
        cardsResize();
    })
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

const accountSlider = document.querySelector('.account-slider');
const accountSliderMob = document.querySelector('.account-slider-mob');

if (accountSlider) {
    const accountSwiper = new Swiper('.account-slider', {
        spaceBetween: 30,
        // Navigation arrows
        navigation: {
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
        },

        pagination: {
            el: '.slider-counter',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return '<div class="current-slide ' + currentClass + '"></div>' +
                    ' <div class="line"></div> ' +
                    '<div class=" total-slide ' + totalClass + '"></div>';
            },
        },
    });
}

if (accountSliderMob) {
    const accountSwiperMob = new Swiper('.account-slider-mob', {
        spaceBetween: 30,
        // Navigation arrows
        navigation: {
            nextEl: '.slider-next-mob',
            prevEl: '.slider-prev-mob',
        },
        pagination: {
            el: '.slider-counter',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return '<div class="current-slide ' + currentClass + '"></div>' +
                    ' <div class="line"></div> ' +
                    '<div class=" total-slide ' + totalClass + '"></div>';
            },
        },
    });
}



// переключение вкладок c инфой на главной

const tabsContainers = document.querySelectorAll('.tabs');

var navLinks = document.querySelectorAll('.tabs .nav-tabs .nav-link');

if (tabsContainers) {

    tabsContainers.forEach(function(tabsContainer) {
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


// Открытие графика платежей

const scheduleButtons = document.querySelectorAll('.schedule-btn');
const scheduleModal = document.querySelector('.schedule-modal');


if(scheduleButtons) {
    scheduleButtons.forEach(function(scheduleButton) {
        scheduleButton.addEventListener('click', function () {
            scheduleModal.classList.add('active');
        });
        const scheduleClose = document.querySelector('.schedule-close');
        scheduleClose.addEventListener('click', function () {
            scheduleModal.classList.remove('active');
        })
    })
    
}


let timer;

function startEmailTimer() {
    clearInterval(timer); // Остановка предыдущего таймера, если он существует

    let seconds = 59;
    const buttons = document.querySelectorAll('.popup-email-button');

    buttons.forEach(function(button) {
        button.classList.add('btn-disabled');
    }) 
    
    // Функция обновления таймера
    function updateTimer() {
        const timerElements = document.querySelectorAll('.popup-timer');
        

        if (seconds >= 0) {
            const secondsText = getSecondsText(seconds);

            timerElements.forEach(function (timerElement) {
                timerElement.textContent = seconds + ' ' + secondsText;
            })
            seconds--;
        } else {
            clearInterval(timer);
            buttons.forEach(function(button) {
                button.classList.remove('btn-disabled');
            })
            
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

// Обработчик клика по кнопке

const popupEmailButtons = document.querySelectorAll('.popup-email-button');

if (popupEmailButtons) {
    popupEmailButtons.forEach(function(popupEmailButton) {
        popupEmailButton.addEventListener('click', function () {
            if (!this.classList.contains('btn-disabled')) {
                this.classList.add('btn-disabled');
                startEmailTimer();
            }
        });
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

// Показ/скрытие поля password

const passwordField = document.querySelector('.show-password');

if (passwordField) {
    
    let formInputs = document.querySelectorAll('.form-input');

    formInputs.forEach(function(formInput) {
        var showPassword = formInput.querySelector('.show-password'); 
        var input = formInput.querySelector('input[type="password"]');

        if (showPassword) {
            showPassword.addEventListener('click', function() {
                if (input.type === 'password') {
                    input.type = 'text';
                } else {
                    input.type = 'password';
                }
            });
        }
        
    });
}

// Проверка соответствия паролей и отправка данных


// Находим элементы и блоки на странице
const newPassword = document.getElementById('new-password');
const confirmPassword = document.getElementById('confirm-password');
const popupPasswordButton = document.querySelector('.popup-password-button');
const inputErrors = document.querySelectorAll('.input-error');

if(newPassword) {
// Функция для проверки заполненности полей
    function checkFields() {
        if (newPassword.value && confirmPassword.value) {
            popupPasswordButton.classList.remove('btn-disabled');
        } else {
            popupPasswordButton.classList.add('btn-disabled');
        }
    }

    // Функция для проверки совпадения паролей
    function checkPasswords() {
        if (newPassword.value !== confirmPassword.value) {
            newPassword.classList.add('error');
            confirmPassword.classList.add('error');
            inputErrors.forEach(function(error) {
                error.classList.add('active');
            });
        } else {
            newPassword.classList.remove('error');
            confirmPassword.classList.remove('error');
            newPassword.value = '';
            confirmPassword.value = '';
            inputErrors.forEach(function(error) {
                error.classList.remove('active');
            });
            changeModal('set-password-modal', 'password-success-modal')
        }
    }

    // Обработчики событий для полей паролей и кнопки
    newPassword.addEventListener('input', checkFields);
    confirmPassword.addEventListener('input', checkFields);
    popupPasswordButton.addEventListener('click', function(event) {
        event.preventDefault(); // Отменяем стандартное поведение кнопки
        checkPasswords(); // Проверяем совпадение паролей
    });


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

// input[type=date]

const dateInput = document.querySelector('input[type="date"]');

if (dateInput) {
    dateInput.addEventListener('change', function () {
        if (this.value !== '') {
            this.classList.add('selected-date');
        } else {
            this.classList.remove('selected-date');
        }
    });
}


// Вывод названия загруженного файла для input[type="file"] и переключение между загржаемыми фото
const fileInputs = document.querySelectorAll('input[type="file"]');
const nextStepBtn = document.querySelector('.next-step');

if (fileInputs) {
    const nextFileBtn = document.querySelector('.next-file');

    fileInputs.forEach(function (fileInput) {
        fileInput.addEventListener('change', function () {
            const label = this.closest('label'); // Находим ближайший родительский элемент label
            const fileNameDisplay = label.querySelector('.file-name'); // Находим элемент .file-name внутри label


            if (this.files && this.files.length > 0) {
                const fileName = this.files[0].name;
                if (fileNameDisplay) {
                    fileNameDisplay.textContent = fileName;
                }
                if (nextFileBtn) {
                    nextFileBtn.classList.remove('btn-disabled');
                }
                if (nextStepBtn) {
                    if (!nextStepBtn.classList.contains('d-none')) {
                        nextStepBtn.classList.remove('btn-disabled');
                    }
                }
            } else {
                if (fileNameDisplay) {
                    fileNameDisplay.textContent = '';
                }
            }

            var filesContainer = document.querySelector('.loaded-files');

            if(filesContainer) {
                filesContainer.classList.add('active');
                var files = fileInput.files;
        
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    let fileName = file.name;
                    var fileItem = document.createElement('div');
                    let deleteButton = document.createElement('img');
                    deleteButton.src = '../images/icons/Menu/Close_MD.svg';
                    deleteButton.classList.add('delete-file');
                    fileItem.classList.add('loaded-files__item');

                    let fileNameBlock = document.createElement('div');
                    fileNameBlock.classList.add('appeal-file');
                    fileNameBlock.textContent = fileName;
                    fileItem.appendChild(fileNameBlock);
                    fileItem.appendChild(deleteButton);
                    filesContainer.appendChild(fileItem);

                    deleteButton.addEventListener('click', function() {
                        let fileItems = filesContainer.querySelectorAll('.loaded-files__item');

                        if(fileItems.length == 1) {
                            filesContainer.classList.remove('active');
                        }

                        this.parentNode.parentNode.removeChild(this.parentNode);
                        
                    })
                }
            }
        });
    });

    function nextFile() {
        // Перебираем элементы с классами .flow-photo-1, .flow-photo-2 и .flow-photo-3
        for (let i = 1; i <= 3; i++) {
            const currentPhoto = document.querySelector(`.flow-photo-${i}`);
            if (!currentPhoto.classList.contains('d-none')) {
                currentPhoto.classList.add('d-none');
                const nextPhoto = document.querySelector(`.flow-photo-${i % 3 + 1}`);
                nextPhoto.classList.remove('d-none');
                nextFileBtn.classList.add('btn-disabled');

                if (i == 2) {
                    nextFileBtn.classList.add('d-none');
                    nextStepBtn.classList.remove('d-none');
                }
                break;
            }
        }
    }
}


// скрытие лишних полей на странице Место работы если Пенсионер

const customOptions = document.querySelectorAll('.custom-option');

if (document.querySelector('.job-retiree')) {
    customOptions.forEach(function (option) {
        option.addEventListener('click', function () {
            const selectValue = this.querySelector('.custom-select__value');

            if (selectValue) {
                if (selectValue.classList.contains('job-retiree')) {
                    // Если есть класс .job-retiree, добавляем класс .d-none к элементам .retiree-hide
                    const retireeHideElements = document.querySelectorAll('.retiree-hide');
                    retireeHideElements.forEach(function (element) {
                        element.classList.add('d-none');
                    });
                } else {
                    // Если нет класса .job-retiree, удаляем класс .d-none у элементов .retiree-hide
                    const retireeHideElements = document.querySelectorAll('.retiree-hide');
                    retireeHideElements.forEach(function (element) {
                        element.classList.remove('d-none');
                    });
                }
            }
        });
    });
}

// Отсчет 10 секунд на странице flow-card-added для перехода на следующую страницу

const cardTimer = document.querySelector('.card-added-timer');

if (cardTimer) {
    let timer = 10;

    function updateTimer() {
        cardTimer.textContent = timer;

        if (timer <= 0) {
            // Если таймер достигает 1, переходим на страницу index.html
            window.location.href = 'flow-card-photo.html';
        } else {
            timer--;
            setTimeout(updateTimer, 1000);
        }
    }

    // Запускаем таймер
    updateTimer();
}


// активация кнопки "Завершить оформление" при выборе чекбокса

const rulesCheckbox = document.getElementById('rules');
const nextStepButton = document.querySelector('.next-step');


if (rulesCheckbox && nextStepButton) {
    function checkRulesCheckbox() {
        if (rulesCheckbox.checked) {
            nextStepButton.classList.remove('btn-disabled');
        } else {
            nextStepButton.classList.add('btn-disabled');
        }
    }

    rulesCheckbox.addEventListener('change', checkRulesCheckbox);

    checkRulesCheckbox();
}

// меню в личном кабинете

const accountMenuBtns = document.querySelectorAll('.account-menu-btn');
const accountMenu = document.querySelector('.account-menu-modal');

if (accountMenuBtns) {
    accountMenuBtns.forEach(function (accountMenuBtn) {
        accountMenuBtn.addEventListener('click', function () {
            if (accountMenu.classList.contains('active')) {
                accountMenu.classList.remove('active');
                enableBodyScroll()
            } else {
                accountMenu.classList.add('active');
                disableBodyScroll();
            }
        })
    })
   
}

const accountMenuItems = document.querySelectorAll('.account-menu__item');

if (accountMenuItems) {
    accountMenuItems.forEach(function(accountMenuItem) {
        accountMenuItem.addEventListener('click', function () {
            this.classList.remove('not-selected');
            accountMenuItems.forEach(function (otherItem) {
                if (otherItem !== accountMenuItem) {
                    otherItem.classList.add('not-selected');
                }
            });
        })
    })
}



//проверка required полей

var formBtn = document.querySelector('.js-form-btn');

function validateForm() {
    var formItems = document.querySelectorAll('.form-item');

    formBtn.addEventListener('click', function (event) {
        

        // Проверяем каждое поле с атрибутом required
        var hasEmptyFields = false;
        formItems.forEach(function (formItem) {
            var requiredInput = formItem.querySelector('input[required]');
            if (requiredInput && !requiredInput.value.trim()) {
                event.preventDefault();
                requiredInput.classList.add('error');
                formItem.querySelector('.input-error').classList.add('active');
                hasEmptyFields = true;
            } else if (requiredInput) {
                requiredInput.classList.remove('error');
                formItem.querySelector('.input-error').classList.remove('active');
            }
        });

        // Проверяем, есть ли хотя бы одно незаполненное поле
        if (hasEmptyFields) {
            document.querySelector('.notification.error').classList.add('active');
        } else {
            document.querySelector('.notification.error').classList.remove('active');
        }
    });
}
if (formBtn) {
    validateForm();
}

const notification = document.querySelector('.notification');
if (notification) {
    notification.addEventListener('click', function () {
        this.classList.remove('active')
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

// показ/скрытие информации о займе на странице ЛК с несколькими займами

const loanCards = document.querySelectorAll('.account-body__card');


if (loanCards) {
    loanCards.forEach(function (loanCard) {
        let loanDetailsBtn = loanCard.querySelector('.loan-details__btn');
        let loanDetails = loanCard.querySelector('.loan-details__body');

        if (loanDetails) {
            loanDetailsBtn.addEventListener('click', function () {
                loanDetails.classList.toggle('active');

                if (loanDetails.classList.contains('active')) {
                    loanDetailsBtn.textContent ='Свернуть';
                } else {
                    loanDetailsBtn.textContent = 'Подробнее о заеме'; 
                }
            })
        }
    })
}

// слайдер займов на странице ЛК с несколькими займами

const loansSlider = document.querySelector('.loans-slider');

if (loansSlider) {
    const accountSwiper = new Swiper('.loans-slider', {
        spaceBetween: 30,
        // Navigation arrows
        navigation: {
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
        },

        pagination: {
            el: '.slider-counter',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
                return '<div class="current-slide ' + currentClass + '"></div>' +
                    ' <div class="line"></div> ' +
                    '<div class=" total-slide ' + totalClass + '"></div>';
            },
        },
    });
}

// чекбокс на который нужно два раза нажать чтобы снять
const checkboxes = document.querySelectorAll('.double-checkbox');

if(checkboxes) {
    

    checkboxes.forEach(function (checkbox) {
        let doubleCheckbox = checkbox.querySelector('input[type="checkbox"]');

        checkbox.addEventListener('click', function (event) {

            if(!this.classList.contains('active')&& doubleCheckbox.checked) {
                event.preventDefault();
                this.classList.add('active');
            } else if (this.classList.contains('active') && doubleCheckbox.checked) {
                event.preventDefault();
                this.classList.remove('active');
                doubleCheckbox.removeAttribute('disabled');
                doubleCheckbox.removeAttribute('checked');
                if (doubleCheckbox.id === 'rules') {
                    nextStepButton.classList.add('btn-disabled');
                }
                
            } else if (!this.classList.contains('active')&& !doubleCheckbox.checked) {
                event.preventDefault();
                doubleCheckbox.setAttribute('checked', 'true');
                if (doubleCheckbox.id === 'rules') {
                    nextStepButton.classList.remove('btn-disabled');
                }
            }
        });
    })
    
}
      

// Шкала процентов вероятности одобрения flow 

const probability = document.querySelector('.probability');

if (probability) {
    let probabilityValue = probability.querySelector('.probability__percent span').textContent;
    let probabilityScale = probability.querySelector('.probability-scale__fill');

    probabilityScale.setAttribute('style', 'width: '+ probabilityValue + '%')
    
}

// Показать/скрыть обращения на account-my-apepals

const appeals = document.querySelectorAll('.appeals-row');

if(appeals) {
    function hideAppeals() {
        for(let i = 0; i<= appeals.length-1 ; i++) {
            if (i > 4) {
                appeals[i].classList.add('d-none')
            }
        }
    }

    hideAppeals();
    
    
    const showAppeals = document.querySelector('.show-appeals');

    if(showAppeals) {
        showAppeals.addEventListener('click', function () {
            if(!this.classList.contains('active')) {
                appeals.forEach(function(appeal) {
                    appeal.classList.remove('d-none');
                });
                this.classList.add('active');
                this.textContent = 'Свернуть';
            } else {
                hideAppeals();
                this.classList.remove('active');
                this.textContent = 'Показать все обращения';
            }
        })
    }
}