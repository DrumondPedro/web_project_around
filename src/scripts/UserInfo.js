class UserInfo {
  constructor({ personSelector, aboutSelector }) {
    this._name = document.querySelector(personSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    this._userInfo = {};

    this._userInfo["name"] = this._name.textContent;
    this._userInfo["about"] = this._about.textContent;

    return this._userInfo;
  }

  setUserInfo({ person, about }) {
    this._name.textContent = person;
    this._about.textContent = about;
  }
}

export default UserInfo;
