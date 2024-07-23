class Card {
  constructor({ name, link }, { config, section, renderer }) {
    this._name = name;
    this._link = link;
    this._config = config;
    this._section = section;
    this._renderer = renderer;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._config.templateSelector)
      .content.querySelector(this._config.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  _createConsts() {
    this._element = this._getTemplate();

    this._cardName = this._element.querySelector(this._config.cardName);
    this._cardImage = this._element.querySelector(this._config.cardImage);
    this._likeButton = this._element.querySelector(this._config.likeButton);
    this._deleteButton = this._element.querySelector(this._config.deleteButton);
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle(this._config.likeButtonActive);
  }

  _handleDeleteButton(evt) {
    evt.target.parentElement.remove();

    const oldCards = this._section.getItems();
    const newCards = oldCards.filter((item) => {
      return item.name !== this._cardName.textContent;
    });
    this._section.setItems(newCards);
    console.log(this._section.getItems());
  }

  _handleOpenViewerPopup() {
    this._renderer(this._cardImage);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", (evt) => {
      this._handleLikeButton(evt);
    });

    this._deleteButton.addEventListener("click", (evt) => {
      this._handleDeleteButton(evt);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleOpenViewerPopup();
    });
  }

  generateCard() {
    this._createConsts();

    this._cardName.textContent = this._name;
    this._cardImage.setAttribute("src", this._link);
    this._cardImage.setAttribute("alt", this._name);

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
