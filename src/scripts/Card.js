class Card {
  constructor(
    { name, link, likes, _id, owner },
    { config, section, renderer, userId }
  ) {
    this._name = name;
    this._link = link;
    this._config = config;
    this._renderer = renderer;
    this._likes = likes;
    this._id = _id;
    this._ownerId = owner._id;
    this._userId = userId;
    // this._section = section;
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

    this._cardName = this._element.querySelector(this._config.cardNameSelector);
    this._cardImage = this._element.querySelector(
      this._config.cardImageSelector
    );
    this._likeButton = this._element.querySelector(
      this._config.likeButtonSelector
    );
    this._deleteButton = this._element.querySelector(
      this._config.deleteButtonSelector
    );
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle(this._config.likeButtonActive);
  }

  _handleDeleteButton(evt) {
    evt.target.parentElement.remove();

    // const oldCards = this._section.getItems();
    // const newCards = oldCards.filter((item) => {
    //   return item.name !== this._cardName.textContent;
    // });
    // this._section.setItems(newCards);
    // console.log(this._section.getItems());
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

    if (this._ownerId === this._userId) {
      this._deleteButton.classList.add(this._config.deleteButtonVisible);
    }

    // console.log(this);
    this._setEventListeners();

    return this._element;
  }
}

export default Card;
