import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(config, { submitFunction }) {
    super(config);
    this._formElement = document.querySelector(config.formElement);
    this._inputSelector = config.inputSelector;
    this._submitFunction = submitFunction;
    this._submitButton = this._formElement.querySelector(
      config.submitButtonSelector
    );
    this._buttonText = config.buttonText;
  }

  _getInputValues() {
    this._inputsData = {};

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._inputList.forEach((inputElement) => {
      this._inputsData[inputElement.id] = inputElement.value;
    });

    return this._inputsData;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._data = this._getInputValues();

      this._submitFunction(this._data);
    });
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  renderSaving(isSaving) {
    if (isSaving) {
      this._submitButton.textContent = "Salvando...";
    } else {
      this._submitButton.textContent = this._buttonText;
    }
  }
}
