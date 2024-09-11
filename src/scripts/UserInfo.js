class UserInfo {
  constructor({ personSelector, aboutSelector }, { handleUser }) {
    this._name = document.querySelector(personSelector);
    this._about = document.querySelector(aboutSelector);
    this._handleUser = handleUser;
  }

  _getUserInfo() {
    this._handleUser()
      .then((user) => {
        this._userInfo = user;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserInfo() {
    this._getUserInfo();

    return this._userInfo;
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}

export default UserInfo;

// this._userInfo = {};

// this._userInfo["name"] = this._name.textContent;
// this._userInfo["about"] = this._about.textContent;

// return this._userInfo;
// }

// setUserInfo({ name, about }) {
//   this._name.textContent = name;
//   this._about.textContent = about;
// }
