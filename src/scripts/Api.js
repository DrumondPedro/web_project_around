export default class Api {
  constructor({ baseURL, userAuthorization }) {
    this._baseURL = baseURL;
    this._userAuthorization = userAuthorization;
  }

  getInitialCards(path) {
    // /cards
    return fetch(`${this._baseURL}${path}`, {
      method: "GET",
      headers: {
        authorization: this._userAuthorization,
      },
    });
  }

  addNewCard({ cardName, cardLink }, path) {
    // /cards
    return fetch(`${this._baseURL}${path}`, {
      method: "POST",
      headers: {
        authorization: this._userAuthorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${cardName}`,
        link: `${cardLink}`,
      }),
    });
  }

  deleteCard(cardId, path) {
    // /cards
    return fetch(`${this._baseURL}${path}/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._userAuthorization,
      },
    });
  }

  getUserInfo(path) {
    // /users/me
    return fetch(`${this._baseURL}${path}`, {
      method: "GET",
      headers: {
        authorization: this._userAuthorization,
      },
    });
  }

  updateUserInfo({ person: userName, about: userAbout }, path) {
    // /users/me
    return fetch(`${this._baseURL}${path}`, {
      method: "PATCH",
      headers: {
        authorization: this._userAuthorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${userName}`,
        about: `${userAbout}`,
      }),
    });
  }

  updateUserAvatar({ picture }, path) {
    // /users/me/avatar
    console.log(picture);
    return fetch(`${this._baseURL}${path}`, {
      method: "PATCH",
      headers: {
        authorization: this._userAuthorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: `${picture}` }),
    });
  }

  like(cardId, path) {
    // /cards/likes
    return fetch(`${this._baseURL}${path}/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._userAuthorization,
      },
    });
  }

  dislike(cardId, path) {
    // /cards/likes
    return fetch(`${this._baseURL}${path}/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._userAuthorization,
      },
    });
  }
}
