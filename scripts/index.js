import { initialCards } from "./data.js";
import { Card } from "./Card.js";
import { validationConfig } from "./data.js";
import { FormValidator } from "./FormValidate.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";


// кнопки открытия и закрытия попапов данные профиля и карточки
const popupOpenButtonForProfile = document.querySelector(
  ".profile__edit-button"
);
const popupOpenButtonForCard = document.querySelector(".profile__add-button");

// контейнеры попапов данные профиля и карточки
const popupEditProfileContainer = document.querySelector(
  ".popup__form_type_profile-info"
);
const popupAddCardContainer = document.querySelector(
  ".popup__form_type_card"
);


const handleFormProfileSubmit = ({name, job}) => {
  userInfo.setUserInfo(name, job);
}

const popupEditProfile = new PopupWithForm('.popup_type_profile-info', handleFormProfileSubmit);
const userInfo = new UserInfo('.profile__name', '.profile__job');

// открытие формы для редактирования профиля
function editProfile() {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  editProfileValidator.resetValidationMessage();
  popupEditProfile.open();
}

popupEditProfile.setEventListeners();

const popupBigImage = new PopupWithImage('.popup_type_big-image');

const handleOpenCardImage = ({ title, link }) => {
  popupBigImage.open({ title, link });
};

popupBigImage.setEventListeners();

const cardSection = new Section({
  items: initialCards,
  renderer: createCard
}, 
".cards-container");

cardSection.renderItems();


// отображение карточек

function createCard(data) {
  const card = new Card(data, ".cards", handleOpenCardImage);

  return card.generateCard();
}

const handleFormAddCardSubmit = (obj) => {
  cardSection.addItem(createCard({name: obj.title, link: obj.link}));
}

const popupAddCard = new PopupWithForm(".popup_type_card", handleFormAddCardSubmit);
popupAddCard.setEventListeners();

// открытие формы для добавления карточек

function openPopupAddCard() {
  popupAddCard.open();
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

popupOpenButtonForCard.addEventListener("click", openPopupAddCard);