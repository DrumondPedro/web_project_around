class Popup {
  constructor({ popupSelector, openClass, closeButton }) {
    this._popup = document.querySelector(popupSelector);
    this._openClass = openClass;
    this._closeButton = document.querySelector(closeButton);
  }

  open() {
    this._popup.classList.add(this._openClass);
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  close() {
    this._popup.classList.remove(this._openClass);
    // document.removeEventListener("keydown", this._handleEscClose) --
    // como remover o listener sendo que preciso passar a função como
    // uma arowfunction anonima pra funcionar????;
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

    console.log(this._closeButton);

    this._popup.addEventListener("click", (evt) => {
      evt.target.classList.remove(this._openClass);
    });
  }
}

class PopupWithImage extends Popup {
  constructor({
    popupSelector,
    openClass,
    closeButton,
    viewerImage,
    viewerTitle,
    card,
  }) {
    super(popupSelector, openClass, closeButton);
    this._popup = document.querySelector(popupSelector);
    this._openClass = openClass;
    this._closeButton = document.querySelector(closeButton);
    this._image = document.querySelector(viewerImage);
    this._title = document.querySelector(viewerTitle);
    this._card = card;
  }

  open() {
    this._image.setAttribute("src", card.src);
    this._image.setAttribute("alt", card.alt);
    this._title.textContent = card.alt;

    super.open();
  }
}

class PopupWithForm extends Popup {
  constructor({
    popupSelector,
    openClass,
    closeButton,
    submitFunction,
    formElement,
    inputSelector,
  }) {
    super(popupSelector, openClass, closeButton);
    this._popup = document.querySelector(popupSelector);
    this._openClass = openClass;
    this._closeButton = document.querySelector(closeButton);
    this._submitFunction = submitFunction;
    this._formElement = document.querySelector(formElement);
    this._inputSelector = inputSelector;
  }

  _getInputValues() {
    this._inputsData = [];

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._inputList.forEach((inputElement) => {
      this._inputsData.push(inputElement.value);
    });

    return this._inputsData;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction;
      this.close();
    });
  }

  close() {
    this._formElement.reset();
    super.close();
  }
}

export { PopupWithImage, PopupWithForm };

// this._inputsData = ["nome", "trabalho"];

// this._textosHtml = ["nome", "trabalho"];

// this._textosHtml.forEach((element, index) => {
//   element.textcontent = this._inputsData[index];
// });
