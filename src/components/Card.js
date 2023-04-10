import PopupWithImage from "./PopupWithImage.js";

export class Card {
  constructor(data, userId, templateSelector, openBigImage, handleTrashClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    // this._likes = data.likes;
    // this._likesCounter = this._element.querySelector('.cards__like-container');
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._openBigImage = openBigImage;
    this._handleTrashClick = handleTrashClick;
    // this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content.querySelector(".cards__element")
      .cloneNode(true);

    return template;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".cards__image");
    this._element.querySelector(".cards__title").textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    this._likeBtn = this._element.querySelector(".cards__like");
    this._deleteCardBtn = this._element.querySelector(".cards__delete");
    this._hasTrashHidden();

    this._setEventListeners();

    return this._element;
  }

  _toggleLike(evt) {
    evt.target.classList.toggle("cards__like_active");
  }

  _hasTrashHidden() {
    if (this._userId !== this._ownerId) {
      this._deleteCardBtn.remove();
    }
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleDeleteCardClick = () => {
    this._handleTrashClick(
      this._cardId,
      this._deleteCard
      );
  }

  _handleCardClick() {
    this._openBigImage({ title: this._name, link: this._link });
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__like")
      .addEventListener("click", (evt) => {
        this._toggleLike(evt);
      });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });

    this._deleteCardBtn.addEventListener("click", this._handleTrashClick);
  }
}
