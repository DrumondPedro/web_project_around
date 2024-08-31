class Card {
  constructor(
    { name, link, likes, _id, owner },
    { config, section, renderer, liker, disliker, userId }
  ) {
    this._name = name;
    this._link = link;
    this._cardId = _id;
    this._ownerId = owner._id;
    this._likes = likes;
    this._config = config;
    this._renderer = renderer;
    this._liker = liker;
    this._disliker = disliker;
    this._userId = userId;
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
    this._likeCounter = this._element.querySelector(
      this._config.likeCounterSelector
    );
  }

  _isLike() {
    if (
      this._likes.find((element) => {
        return element._id === this._userId;
      })
    ) {
      this._likeButton.classList.add(this._config.likeButtonActive);
    }
  }

  _handleLikeButton(evt) {
    if (
      this._likes.find((element) => {
        return element._id === this._userId;
      })
    ) {
      this._disliker(this._cardId, "/cards/likes", (res) => {
        this._likeCounter.textContent = res.likes.length;
        this._likes = res.likes;
        evt.target.classList.remove(this._config.likeButtonActive);
      });
      return;
    } else {
      this._liker(this._cardId, "/cards/likes", (res) => {
        this._likeCounter.textContent = res.likes.length;
        this._likes = res.likes;
        evt.target.classList.add(this._config.likeButtonActive);
      });
    }
  }

  _handleDeleteButton(evt) {
    evt.target.parentElement.remove();
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

    this._isLike();

    this._likeCounter.textContent = this._likes.length;

    // console.log(this);
    this._setEventListeners();

    return this._element;
  }
}

export default Card;
