import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(config) {
    super(config);
    this._confirmationButton = document.querySelector(
      config.confirmationButtonSelector
    );
  }

  // log() {
  //   console.log(this);
  // }

  setEventListeners() {
    super.setEventListeners();

    this._confirmationButton.addEventListener("click", (evt) => {
      // this._submitFunction(this._data);

      this.close();
    });
  }
}
