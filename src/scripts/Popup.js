export default class Popup {
  constructor(config) {
    this._popup = document.querySelector(config.popupSelector);
    this._openClass = config.openClass;
    this._closeButton = document.querySelector(config.closeButtonSelector);
  }

  open() {
    this._popup.classList.add(this._openClass);
    document.addEventListener("keydown", this._handleEscClose);
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }

  close() {
    this._popup.classList.remove(this._openClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      evt.target.classList.remove(this._openClass);
    });
  }
}
