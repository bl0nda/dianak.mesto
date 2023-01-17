const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('popup__close-button');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupFieldChangeName = popupElement.querySelector('.popup__field_change_name');
const nameInput = document.querySelector('.popup__field_change_job');
const jobInput = document.querySelector('.popup__submit-button');
const popupSubmitButton = popupElement.querySelector('.popup__submit-button');

const popupVisibility = function() {
    popupElement.classList.toggle('popup_is_opened');
}

popupOpenButton.addEventListener('click', popupVisibility);

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    // Получите значение полей jobInput и nameInput из свойства value
    nameInput.value = nameInput.getAttribute('placeholder'); 
    jobInput.value = jobInput.getAttribute('placeholder'); 
    // Выберите элементы, куда должны быть вставлены значения полей
    const name = document.querySelector('.profile__name');
    const job = document.querySelector('.profile__job');
    // Вставьте новые значения с помощью textContent
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}

popupSubmitButton.addEventListener('submit', handleFormSubmit); 