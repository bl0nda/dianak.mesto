// попапы
const popupElementEditProfile = document.querySelector('.popup_type_profile-info');
const popupElementAddCard = document.querySelector('.popup_type_card');

// кнопки открытия и закрытия попапов
const popupOpenButtonForProfile = document.querySelector('.profile__edit-button');
const popupOpenButtonForCard = document.querySelector('.profile__add-button');

const popupCloseButton = document.querySelectorAll('.popup__close-button');

//переменные для редактирование данных профиля
const nameInput = document.querySelector('.popup__field_change_name');
const jobInput = document.querySelector('.popup__field_change_job');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

// контейнеры попапов
const popupEditProfileContainer = popupElementEditProfile.querySelector('.popup__form_type_profile-info');
const popupAddCardContainer = popupElementAddCard.querySelector('.popup__form_type_card');

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

popupOpenButtonForProfile.addEventListener('click', editProfile);

// редактирование данных профиля 

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(popupElementEditProfile)
}

popupEditProfileContainer.addEventListener('submit', handleFormSubmit);

// открытие формы для добавления карточек

function addCard () {
    openPopup(popupElementAddCard);
}

popupOpenButtonForCard.addEventListener('click', addCard);

// функция закрытия для всех попапов

popupCloseButton.forEach(item => {
    const closestPopup = item.closest('.popup');
    item.addEventListener('click', () => closePopup(closestPopup));
  });

  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


// переменные шаблон для карточек

const template = document.querySelector('.cards').content;
// const card = template.querySelector('.cards__element');
const cardsContainer = document.querySelector('.cards__container');

//переменные с данными для карточек

const imageInput = popupElementAddCard.querySelector('.popup__field_change_image');
const mestoNameInput = popupElementAddCard.querySelector('.popup__field_change_cards-name');

// функция добавления карточек

function createCard(evt) {
  evt.preventDefault();
  const card = template.querySelector('.cards__element').cloneNode(true);
  const image = card.querySelector('.cards__image');
  const mestoName = card.querySelector('.cards__title');

  card.querySelector('.cards__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__like_active');
    });

  image.src = imageInput.value;
  image.alt = mestoNameInput.value;
  mestoName.textContent = mestoNameInput.value;

  cardsContainer.prepend(card);

  closePopup(popupElementAddCard);
}

popupAddCardContainer.addEventListener('submit', createCard);

// отображение карточек из массива

function renderCards(items) {
    items.forEach((item) => {
      const arrayCards = template.cloneNode(true);
      arrayCards.querySelector('.cards__title').textContent = item.name;
      arrayCards.querySelector('.cards__image').src = item.link;
      
      arrayCards.querySelector('.cards__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('cards__like_active');
        });

      cardsContainer.append(arrayCards);
    });
  }

  renderCards(initialCards);