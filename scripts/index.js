// попапы
const popupElementEditProfile = document.querySelector('.popup_type_profile-info');
const popupElementAddCard = document.querySelector('.popup_type_card');
const popupElementBigImage = document.querySelector('.popup_type_big-image');

// кнопки открытия и закрытия попапов данные профиля и карточки
const popupOpenButtonForProfile = document.querySelector('.profile__edit-button');
const popupOpenButtonForCard = document.querySelector('.profile__add-button');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');

//переменные для редактирование данных профиля
const nameInput = document.querySelector('.popup__field_change_name');
const jobInput = document.querySelector('.popup__field_change_job');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

// контейнеры попапов данные профиля и карточки
const popupEditProfileContainer = popupElementEditProfile.querySelector('.popup__form_type_profile-info');
const popupAddCardContainer = popupElementAddCard.querySelector('.popup__form_type_card');

// переменные шаблон для карточек
const template = document.querySelector('.cards').content.querySelector('.cards__element');
const cardsContainer = document.querySelector('.cards-container');

//переменные с данными для карточек
const imageInput = popupElementAddCard.querySelector('.popup__field_change_image');
const mestoNameInput = popupElementAddCard.querySelector('.popup__field_change_cards-name');

// переменные для увеличения картинки
const cardElement = template.querySelector('.cards__element');
const bigImage = popupElementBigImage.querySelector('.popup__big-image');
const bigImageCaption = popupElementBigImage.querySelector('.popup__image-caption');

// функции закрытия и открытия
    const openPopup = function(popup) {
    popup.classList.add('popup_opened');
}

    const closePopup = function(popup) {
    popup.classList.remove('popup_opened');
}

// открытие формы для редактирования профиля
    function editProfile () {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    openPopup(popupElementEditProfile);  
}

// редактирование данных профиля 

function handleFormProfileSubmit (evt) {
    evt.preventDefault(); 
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(popupElementEditProfile)
}

// функция закрытия для всех попапов

popupCloseButtons.forEach(item => {
    const closestPopup = item.closest('.popup');
    item.addEventListener('click', () => closePopup(closestPopup));
  });

// открытие формы для добавления карточек

function addCard () {
  openPopup(popupElementAddCard);
}

// отображение карточек

  const renderCards = (item) => {
    const card = createCard(item);
    cardsContainer.prepend(card);
  };
  
  initialCards.forEach(function (item) {
    renderCards(item);
  });
  
// функция добавления карточек

function createCard(item) {
const card = template.cloneNode(true);
card.querySelector('.cards__title').textContent = item.name;
const image = card.querySelector('.cards__image');
image.src = item.link;
image.alt = item.name;

image.addEventListener('click', function () {
  openPopup(popupElementBigImage);
  bigImage.alt = item.name;
  bigImage.src = item.link;
  bigImageCaption.textContent = item.name;
});

card.querySelector('.cards__like').addEventListener('click', function (evt) {
  evt.target.classList.toggle('cards__like_active');
  });

card.querySelector('.cards__delete').addEventListener('click', () => {card.remove();});

return card;
}

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: mestoNameInput.value,
    link: imageInput.value,
  };
  renderCards(newCard);
  closePopup(popupElementAddCard);
  popupAddCardContainer.reset();
}


// открытие попапа увеличения изображения

function openBigImage() {
  openPopup(popupElementBigImage);
}

popupOpenButtonForProfile.addEventListener('click', editProfile);
popupEditProfileContainer.addEventListener('submit', handleFormProfileSubmit);

popupOpenButtonForCard.addEventListener('click', addCard);
popupAddCardContainer.addEventListener('submit', handleFormAddCardSubmit);
cardsContainer.addEventListener('click', openBigImage);
