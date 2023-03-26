import { initialCards } from "./utils/constants.js";
import { Card } from "./components/Card.js";
import { validationConfig } from "./utils/constants.js";
import { FormValidator } from "./components/FormValidate.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import {
  popupOpenButtonForProfile,
  popupOpenButtonForCard,
  popupEditProfileContainer,
  popupAddCardContainer,
} from "./utils/constants.js";

const userInfo = new UserInfo(".profile__name", ".profile__job");

const handleFormProfileSubmit = ({ name, job }) => {
  userInfo.setUserInfo(name, job);
};

const popupEditProfile = new PopupWithForm(
  ".popup_type_profile-info",
  handleFormProfileSubmit
);

// открытие формы для редактирования профиля
function editProfile() {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  editProfileValidator.resetValidationMessage();
  popupEditProfile.open();
}

popupEditProfile.setEventListeners();

const popupBigImage = new PopupWithImage(".popup_type_big-image");

const handleOpenCardImage = ({ title, link }) => {
  popupBigImage.open({ title, link });
};

popupBigImage.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards-container"
);

cardSection.renderItems();

// отображение карточек

function createCard(data) {
  const card = new Card(data, ".cards", handleOpenCardImage);

  return card.generateCard();
}

const handleFormAddCardSubmit = (obj) => {
  cardSection.addItem(createCard({ name: obj.title, link: obj.link }));
};

const popupAddCard = new PopupWithForm(
  ".popup_type_card",
  handleFormAddCardSubmit
);
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
