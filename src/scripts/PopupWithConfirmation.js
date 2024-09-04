import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(config) {
    super(config);

    this._confirmationButton = document.querySelector(
      config.confirmationButtonSelector
    );
    this._buttonText = config.buttonText;
  }

  renderDeleting(isDeleting) {
    if (isDeleting) {
      this._confirmationButton.textContent = "Deletando...";
    } else {
      this._confirmationButton.textContent = this._buttonText;
    }
  }

  isDelete(callBack) {
    this._confirmationButton.addEventListener("click", () => {
      callBack();
    });
  }
}
