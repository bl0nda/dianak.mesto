const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close-button');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupFormElement = popupElement.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__field_change_name');
const jobInput = document.querySelector('.popup__field_change_job');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');


const openPopup = function() {
    popupElement.classList.add('popup_opened');
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

const closePopup = function() {
    popupElement.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup();
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

popupFormElement.addEventListener('submit', handleFormSubmit); 