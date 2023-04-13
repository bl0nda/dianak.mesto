export class Card {
  constructor({data, userId, templateSelector, openBigImage, handleTrashClick, handleLikeClick}) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._openBigImage = openBigImage;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._isLiked = this._likes.some(function (like) {
      return like._id === userId;
    })
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
    this._likesCounter = this._element.querySelector(".cards__like-counter");
    this._likesCounter.textContent = this._likes.length;
    this._updateLikes();

    this._deleteCardBtn = this._element.querySelector(".cards__delete");
    this._hasTrashHidden();

    this._setEventListeners();

    return this._element;
  }

  _updateLikes() {
    if(this._isLiked){
      this._likeBtn.classList.add('cards__like_active')
    }else{
      this._likeBtn.classList.remove('cards__like_active')
    }
  }

  getCardLike(){
    return this._isLiked;
  }

  likeCard(data){
    this._likesCounter.textContent = data.likes.length;
    this._isLiked = !this._isLiked;
    this._updateLikes();
  }

  _hasTrashHidden() {
    if (this._userId !== this._ownerId) {
      this._deleteCardBtn.remove();
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleCardClick() {
    this._openBigImage({ title: this._name, link: this._link });
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });

    this._deleteCardBtn.addEventListener("click", () =>
      this._handleTrashClick(this._cardId)
    );
  }
}
