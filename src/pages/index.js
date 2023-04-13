import "./index.css";

import { Card } from "../components/Card.js";
import { validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidate.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
import {
  popupOpenButtonForProfile,
  popupOpenButtonForCard,
  popupOpenButtonAvatar,
  popupEditProfileContainer,
  popupAddCardContainer,
  popupChangeAvatarContainer,
} from "../utils/constants.js";
import { data } from "autoprefixer";

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
  ([data, cards]) => {
    userInfo.setUserInfo(data);
    userInfo.setUserId(data._id);
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

// редактирование данных профиля

const handleFormProfileSubmit = (data) => {
  popupEditProfile.renderLoading(true);
  api.setProfileData(data).then((res) => {
    userInfo.setUserInfo(res);
    popupEditProfile.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupEditProfile.renderLoading(false);
  });
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

// смена аватара

const handleFormAvatarSubmit = (avatar) => {
  popupChangeAvatar.renderLoading(true);
  api.setNewAvatar(avatar).then((avatar) => {
    userInfo.setUserInfo(avatar);
    popupChangeAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupChangeAvatar.renderLoading(false);
});
};

const popupChangeAvatar = new PopupWithForm(
  ".popup_type_cnange-avatar",
  handleFormAvatarSubmit
);

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

// удаление карточки

const popupDeleteCard = new PopupWithConfirmation(".popup_type_confirm-delete");
popupDeleteCard.setEventListeners();

// добавление новых карточек

const handleFormAddCardSubmit = (obj) => {
  popupAddCard.renderLoading(true);
  api.pushNewCard(obj).then((res) => {
    cardSection.addItem(createCard(res, res.owner._id));
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupAddCard.renderLoading(false);
    popupAddCard.close();
  });
};

const popupAddCard = new PopupWithForm(
  ".popup_type_card",
  handleFormAddCardSubmit
);
popupAddCard.setEventListeners();

function createCard(data) {
  const userId = userInfo.getUserId();
  const card = new Card({
    data,
    userId,
    templateSelector: ".cards",
    openBigImage: handleOpenCardImage,
    handleTrashClick: (data) => {
      popupDeleteCard.open();
      popupDeleteCard.submitToDelete(() => {
        api.deleteCard(data).then(() => {
          card.deleteCard(data._id);
          popupDeleteCard.close();
        })
        .catch((err) => {
          console.log(err);
        });
      });
    },
    handleLikeClick: () => {
      if (!card.getCardLike()) {
        console.log(card.getCardLike());
        api
          .setLike(data._id)
          .then((data) => {
            card.likeCard(data);
          })
          .catch((err) => {
            console.log(err);
          })
      } else {
        api
          .deleteLike(data._id)
          .then((data) => {
            card.likeCard(data);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  });

  return card.generateCard(data);
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
