import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._inputs = this._popup.querySelectorAll(".popup__field");
    this._form = this._popup.querySelector(".popup__form");
    this._submitBtn = this._popup.querySelector(".popup__submit-button");
  }

  _getInputValues() {
    const inputsValues = {};
    this._inputs.forEach((input) => {
      inputsValues[input.name] = input.value;
    });
    return inputsValues;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = 'Сохранение...';
    } else {
      this._submitBtn.textContent = 'Сохранить';
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }
}
