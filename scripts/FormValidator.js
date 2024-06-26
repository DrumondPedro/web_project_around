class FormValidator {
  constructor(formElement, config, closeButton) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._closeButton = closeButton;
  }

  _createConsts() {
    this._formElement = document.querySelector(this._formElement);
    this._submitButtonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._closeButton = document.querySelector(this._closeButton);
  }

  _showError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideError(inputElement);
    } else {
      this._showError(inputElement);
    }
  }

  _allInputsValid = () => {
    return this._inputList.every((inputElement) => {
      return inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._allInputsValid(this._inputList)) {
      this._submitButtonElement.classList.remove(this._inactiveButtonClass);
    } else {
      this._submitButtonElement.classList.add(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._closeButton.addEventListener("click", (evt) => {
      this._resetValidation();
    });
  }

  enableValidation() {
    this._createConsts();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitButtonElement.classList.add(this._inactiveButtonClass);
    });

    this._toggleButtonState();
    this._setEventListeners();
  }

  _resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }
}

export default FormValidator;
