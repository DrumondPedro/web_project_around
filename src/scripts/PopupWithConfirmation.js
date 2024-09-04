import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(config) {
    super(config);

    this._confirmationButton = document.querySelector(
      config.confirmationButtonSelector
    );
  }

  // renderDeleting(isDeleting) {
  //   if (isDeleting) {
  //     this._confirmationButton.textContent = "Deletando...";
  //   } else {
  //     this._confirmationButton.textContent = this._buttonText;
  //   }
  // }

  teste() {
    console.log("testado");
  }

  isDelete(callBack) {
    this._confirmationButton.addEventListener("click", () => {
      callBack();
    });
  }
}
