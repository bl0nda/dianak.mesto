import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    // this._confirmBtn = this._popup.querySelector('.popup__submit-button_type_confirm');
  }

  submitToDelete(remove) {
    this._submitForm = remove;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt)=>{
        evt.preventDefault(); 
        this._submitForm();
    })
}

}