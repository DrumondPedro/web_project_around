class Card {
  constructor({ name, link }, config, closeWithEsc, closePopup, cardsList) {
    this._name = name;
    this._link = link;
    this._config = config;
    this._closeWithEsc = closeWithEsc;
    this._closePopup = closePopup;
    this._cardsList = cardsList;
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

    this._viewerPopup = document.querySelector(this._config.viewerPopup);
    this._viewerImage = this._viewerPopup.querySelector(
      this._config.viewerImage
    );
    this._viewerTitle = this._viewerPopup.querySelector(
      this._config.viewerTitle
    );

    this._viewerCloseButton = this._viewerPopup.querySelector(
      this._config.viewerCloseButton
    );
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle(this._config.likeButtonActive);
  }

  _handleDeleteButton(evt) {
    evt.target.parentElement.remove();
    this._cardsList = this._cardsList.filter((item) => {
      return item.name !== this._cardName.textContent;
    });
  }

  _handleOpenViewerPopup() {
    this._viewerImage.setAttribute("src", this._link);
    this._viewerImage.setAttribute("alt", this._name);
    this._viewerTitle.textContent = this._name;

    document.addEventListener("keydown", (evt) => {
      this._closeWithEsc(
        evt,
        this._viewerPopup,
        this._config.viewerPopupVisible
      );
    });

    this._viewerPopup.classList.add(this._config.viewerPopupVisible);
  }

  _handleCloseViewerPopup() {
    this._closePopup(this._viewerPopup, this._config.viewerPopupVisible);
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

    this._viewerCloseButton.addEventListener("click", () => {
      this._handleCloseViewerPopup();
    });

    this._viewerPopup.addEventListener("click", (evt) => {
      evt.target.classList.remove(this._viewerPopupVisible);
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
