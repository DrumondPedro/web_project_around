class UserInfo {
  constructor({ nameSelector, aboutSelector, inputsData }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    this._userInfo = {};

    this._userInfo["name"] = this._name.textContent;
    this._userInfo["about"] = this._bout.textContent;

    return this._userInfo;
  }

  setUserInfo() {
    this._name.textContent = inputsData[0];
    this._about.textContent = inputsData[1];
  }
}
