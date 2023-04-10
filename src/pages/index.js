import "./index.css";

import { Card } from "../components/Card.js";
import { validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidate.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import {
  popupOpenButtonForProfile,
  popupOpenButtonForCard,
  popupOpenButtonAvatar,
  popupEditProfileContainer,
  popupAddCardContainer,
  popupChangeAvatarContainer,
} from "../utils/constants.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    "content-type": "application/json",
    authorization: "33553b4a-ee5d-444d-b863-91098d8d5da2",
  },
});

const cardSection = new Section(createCard, ".cards-container");

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__job",
  ".profile__avatar"
);

// загрузка данных с сервера

Promise.all([api.getProfileData(), api.getInitialCards()]).then(
  ([userData, cards]) => {
    const { name, about, avatar, _id } = userData;
    userInfo.setUserInfo({ name, about });
    userInfo.setAvatar(avatar);
    userInfo.setUserId(_id);
    cardSection.renderItems(cards);
  }
);

// редактирование данных профиля

const handleFormProfileSubmit = ({ name, about }) => {
  api.setProfileData(userInfo.setUserInfo({name, about}));
};

const popupEditProfile = new PopupWithForm(
  ".popup_type_profile-info",
  handleFormProfileSubmit
);

// смена аватара

const handleFormAvatarSubmit = ({ link }) => {
  api.setNewAvatar(userInfo.setAvatar(link));
};

const popupChangeAvatar = new PopupWithForm(
  ".popup_type_cnange-avatar",
  handleFormAvatarSubmit
);

// открытие формы для редактирования профиля

function editProfile() {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  editProfileValidator.resetValidationMessage();
  popupEditProfile.open();
}

popupEditProfile.setEventListeners();

// открытие формы для смены аватарки

function changeAvatar() {
  changeAvatarValidator.resetValidationMessage();
  popupChangeAvatar.open();
}

popupChangeAvatar.setEventListeners();

// увеличение изображения

const popupBigImage = new PopupWithImage(".popup_type_big-image");

const handleOpenCardImage = ({ title, link }) => {
  popupBigImage.open({ title, link });
};

popupBigImage.setEventListeners();

// добавление новых карточек

const handleFormAddCardSubmit = (obj) => {
  cardSection.addItem(createCard({ name: obj.title, link: obj.link }));
  api.pushNewCard(obj);
};

const popupAddCard = new PopupWithForm(
  ".popup_type_card",
  handleFormAddCardSubmit
);
popupAddCard.setEventListeners();

function createCard(data) {
  const userId = userInfo.getUserId();
  const card = new Card(
    data,
    userId,
    ".cards",
    handleOpenCardImage);

  return card.generateCard();
}

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

const changeAvatarValidator = new FormValidator(
  validationConfig,
  popupChangeAvatarContainer
);
changeAvatarValidator.enableValidation();

//
popupOpenButtonForProfile.addEventListener("click", editProfile);

popupOpenButtonForCard.addEventListener("click", openPopupAddCard);

popupOpenButtonAvatar.addEventListener("click", changeAvatar);
