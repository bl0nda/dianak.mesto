const popupElementBigImage = document.querySelector(".popup_type_big-image");
const popupImage = popupElementBigImage.querySelector('.popup__big-image');
const bigImageCaption = popupElementBigImage.querySelector(".popup__image-caption");
const popupCloseButton = popupElementBigImage.querySelector('.popup__close-button');

export class Card {
  constructor(data, templateSelector) {
   this._name = data.name;
   this._link = data.link;
   this._templateSelector = templateSelector;
  }

  _getTemplate() {
   const template = document
      .querySelector(".cards")
      .content.querySelector(".cards__element")
      .cloneNode(true);

      return template;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.cards__title').textContent = this._name;
    this._element.querySelector('.cards__image').alt = this._name;
    this._element.querySelector('.cards__image').src = this._link;

    return this._element;
  }

  _keyHandlerEsc(evt) {
    if (evt.key === "Escape") {
      this._handleClosePopup();
    }
  }

  _handleOpenPopup() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    bigImageCaption.textContent = this._name;
    popupElementBigImage.classList.add('popup_opened');
    document.addEventListener("keydown", (evt) => this._keyHandlerEsc(evt));
  }

  _handleClosePopup() {
    popupImage.src = "";
    popupElementBigImage.classList.remove('popup_opened');
    document.removeEventListener("keydown", (evt) => this._keyHandlerEsc(evt));
  }

  _setEventListeners() {
    this._element.querySelector('.cards__like').addEventListener("click", (evt) => {
        evt.target.classList.toggle('cards__like_active');
    });

    this._element.addEventListener('click', () => {
      this._handleOpenPopup();
    });
  
    popupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    });

    this._element.querySelector('.cards__delete').addEventListener("click", (e) => {
      this._element.remove();
      e.stopImmediatePropagation();
    });
}
} 