import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(config) {
    super(config);
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
