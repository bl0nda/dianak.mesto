const popupElement = document.querySelector('.popup');

// кнопка закрытия попапа
const popupCloseButton = popupElement.querySelector('.popup__close-button');

// кнопки открытия попапов
const popupOpenButton = document.querySelector('.profile__edit-button');

const popupFormElement = popupElement.querySelector('.popup__form');

//редактирование данных профиля
const nameInput = document.querySelector('.popup__field_change_name');
const jobInput = document.querySelector('.popup__field_change_job');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');


const openPopup = function(popup) {
    popup.classList.add('popup_opened');
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

const closePopup = function(popup) {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(popupElement.closest);
}

popupOpenButton.addEventListener('click', function () {
  openPopup(popupElement)
})
popupCloseButton.addEventListener('click', function() {
  closePopup(popupElement)
});

popupFormElement.addEventListener('submit', handleFormSubmit); 
