import { initialCards } from "./data.js";
import { Card } from "./Card.js";
import { validationConfig } from "./data.js";
import { FormValidator } from "./validate.js";

// попапы
const popupElements = document.querySelectorAll(".popup");
const popupElementEditProfile = document.querySelector(
  ".popup_type_profile-info"
);
const popupElementAddCard = document.querySelector(".popup_type_card");
const popupElementBigImage = document.querySelector(".popup_type_big-image");

// кнопки открытия и закрытия попапов данные профиля и карточки
const popupOpenButtonForProfile = document.querySelector(
  ".profile__edit-button"
);
const popupOpenButtonForCard = document.querySelector(".profile__add-button");

const popupCloseButtons = document.querySelectorAll(".popup__close-button");

//переменные для редактирование данных профиля
const nameInput = document.querySelector(".popup__field_change_name");
const jobInput = document.querySelector(".popup__field_change_job");
const name = document.querySelector(".profile__name");
const job = document.querySelector(".profile__job");

// контейнеры попапов данные профиля и карточки
const popupEditProfileContainer = popupElementEditProfile.querySelector(
  ".popup__form_type_profile-info"
);
const popupAddCardContainer = popupElementAddCard.querySelector(
  ".popup__form_type_card"
);

const container = document.querySelector(".cards-container");

//переменные с данными для карточек
const imageInput = popupElementAddCard.querySelector(
  ".popup__field_change_image"
);
const mestoNameInput = popupElementAddCard.querySelector(
  ".popup__field_change_cards-name"
);

// функции закрытия и открытия
const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
};

// открытие формы для редактирования профиля
function editProfile() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  editProfileValidator.resetValidationMessage();
  openPopup(popupElementEditProfile);
}

// редактирование данных профиля

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupElementEditProfile);
}

// переменные для попапа увеличения изображения
const popupImage = popupElementBigImage.querySelector(".popup__big-image"); 
const bigImageCaption = popupElementBigImage.querySelector(".popup__image-caption");

// функции закрытия для всех попапов
// по крестику
popupCloseButtons.forEach((item) => {
  const closestPopup = item.closest(".popup");
  item.addEventListener("click", () => closePopup(closestPopup));
});

// по темной области попапа
popupElements.forEach((area) => {
  area.addEventListener("click", function (event) {
    if (event.target === event.currentTarget) {
      closePopup(area);
    }
  });
});

// по нажатию Esc
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

// отображение карточек

function createCard({ name, link }) {
  const card = new Card({ name, link }, ".cards", handleCardClick);

  return card.generateCard();
}

const renderCards = (item) => {
  const cardContainer = createCard(item);
  container.prepend(cardContainer);
};

initialCards.forEach(function (item) {
  renderCards(item);
});

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  bigImageCaption.textContent = name;
  openPopup(popupElementBigImage);
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

// открытие формы для добавления карточек

function addCard() {
  openPopup(popupElementAddCard);
  addCardValidator.resetValidationMessage();
}

// валидация форм
const editProfileValidator = new FormValidator(
  validationConfig,
  popupEditProfileContainer
);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(
  validationConfig,
  popupAddCardContainer
);
addCardValidator.enableValidation();

//
popupOpenButtonForProfile.addEventListener("click", editProfile);
popupEditProfileContainer.addEventListener("submit", handleFormProfileSubmit);

popupOpenButtonForCard.addEventListener("click", addCard);
popupAddCardContainer.addEventListener("submit", handleFormAddCardSubmit);
