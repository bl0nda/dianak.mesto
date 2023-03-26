import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__big-image");
    this._title = this._popup.querySelector(".popup__image-caption");
  }

  open({title, link}) {
    super.open();
    this._title.textContent = title;
    this._image.alt = title;
    this._image.src = link;
  }
}
