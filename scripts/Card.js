class Card {
  constructor({ name, link }, config, closeWithEsc, closePopup, cardsList) {
    this._name = name;
    this._link = link;
    this._templateSelector = config.templateSelector;
    this._cardSelector = config.cardSelector;
    this._cardName = config.cardName;
    this._cardImage = config.cardImage;
    this._likeButton = config.likeButton;
    this._likeButtonActive = config.likeButtonActive;
    this._deleteButton = config.deleteButton;
    this._viewerPopup = config.viewerPopup;
    this._viewerPopupVisible = config.viewerPopupVisible;
    this._viewerImage = config.viewerImage;
    this._viewerTitle = config.viewerTitle;
    this._viewerCloseButton = config.viewerCloseButton;
    this._closeWithEsc = closeWithEsc;
    this._closePopup = closePopup;
    this._cardsList = cardsList;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(this._cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  _createConsts() {
    this._element = this._getTemplate();

    this._cardName = this._element.querySelector(this._cardName);
    this._cardImage = this._element.querySelector(this._cardImage);
    this._likeButton = this._element.querySelector(this._likeButton);
    this._deleteButton = this._element.querySelector(this._deleteButton);

    this._viewerPopup = document.querySelector(this._viewerPopup);
    this._viewerImage = this._viewerPopup.querySelector(this._viewerImage);
    this._viewerTitle = this._viewerPopup.querySelector(this._viewerTitle);

    this._viewerCloseButton = this._viewerPopup.querySelector(
      this._viewerCloseButton
    );
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle(this._likeButtonActive);
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
      this._closeWithEsc(evt, this._viewerPopup, this._viewerPopupVisible);
    });

    this._viewerPopup.classList.add(this._viewerPopupVisible);
  }

  _handleCloseViewerPopup() {
    this._closePopup(this._viewerPopup, this._viewerPopupVisible);
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
