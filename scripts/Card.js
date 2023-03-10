export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

    this._setEventListeners();

    return this._element;
  }

  _toggleLike(evt) {
    evt.target.classList.toggle("cards__like_active");
  }

  _deleteCard() {
    this._element.remove();
  }

  _handleCardClick() {
    this._handleCardClick(this._name, this._link);
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

    this._element
      .querySelector(".cards__delete")
      .addEventListener("click", () => {
        this._deleteCard();
        // e.stopImmediatePropagation();
      });
  }
}
