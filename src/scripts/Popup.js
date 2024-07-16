class Popup {
  constructor(config) {
    this._popup = document.querySelector(config.popupSelector);
    this._openClass = config.openClass;
    this._closeButton = document.querySelector(config.closeButtonSelector);
  }

  open() {
    this._popup.classList.add(this._openClass);
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  close() {
    this._popup.classList.remove(this._openClass);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popup.addEventListener("click", (evt) => {
      evt.target.classList.remove(this._openClass);
    });
  }
}

class PopupWithImage extends Popup {
  constructor(config) {
    super(config);
    this._popup = document.querySelector(config.popupSelector);
    this._openClass = config.openClass;
    this._closeButton = document.querySelector(config.closeButtonSelector);
    this._image = document.querySelector(config.viewerImageSelector);
    this._title = document.querySelector(config.viewerTitleSelector);
  }

  open(item) {
    this._image.setAttribute("src", item.src);
    this._image.setAttribute("alt", item.alt);
    this._title.textContent = item.alt;

    super.open();
  }
}

class PopupWithForm extends Popup {
  constructor(config, { submitFunction }) {
    super(config);
    this._popup = document.querySelector(config.popupSelector);
    this._openClass = config.openClass;
    this._closeButton = document.querySelector(config.closeButtonSelector);
    this._formElement = document.querySelector(config.formElement);
    this._inputSelector = config.inputSelector;
    this._submitFunction = submitFunction;
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

      this.close();
    });
  }

  close() {
    this._formElement.reset();
    super.close();
  }
}

export { PopupWithImage, PopupWithForm };
