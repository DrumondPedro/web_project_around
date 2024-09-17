import "./pages/index.css";

import Card from "./scripts/Card.js";

import FormValidator from "./scripts/FormValidator.js";

import PopupWithImage from "./scripts/PopupWithImage.js";

import PopupWithForm from "./scripts/PopupWithForm.js";

import PopupWithConfirmation from "./scripts/PopupWithConfirmation.js";

import Section from "./scripts/Section.js";

import UserInfo from "./scripts/UserInfo.js";

import Api from "./scripts/Api.js";

import {
  profileEditButton,
  galleryAddButton,
  pictureEditButton,
  configCard,
  configFormValidator,
  configPopups,
  userInfoConfig,
  inputName,
  inputAbout,
  profilePicture,
  apiConfig,
} from "./scripts/utils.js";

const apiTripleTen = new Api(apiConfig);

let userId = "57ad3ec977745486d8c3e581";

function updateUserId() {
  apiTripleTen
    .getUserInfo("/users/me")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      userId = data._id;
    })
    .catch((err) => {
      console.log(err);
    });
}

updateUserId();

const viewerPopup = new PopupWithImage(configPopups.popupViewer);

viewerPopup.setEventListeners();

let cardsSection;

const deleteCardConfirmationPopup = new PopupWithConfirmation(
  configPopups.popupDeleteImage
);

deleteCardConfirmationPopup.setEventListeners();

function deleteCard(cardId) {
  console.log(`deletou o card: ${cardId}`);
  deleteCardConfirmationPopup.renderDeleting(true);
  apiTripleTen
    .deleteCard(cardId, "/cards")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      console.log(`deletou o cartão: ${data}`);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      deleteCardConfirmationPopup.renderDeleting(false);
      deleteCardConfirmationPopup.close();
    });
}

apiTripleTen
  .getInitialCards("/cards")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
  .then((cards) => {
    cardsSection = new Section(
      {
        items: cards,
        renderer: (item) => {
          const newCard = new Card(item, {
            config: configCard,
            renderer: (item) => {
              viewerPopup.open(item);
            },
            liker: (id, path, executor) => {
              apiTripleTen
                .like(id, path)
                .then((res) => {
                  if (res.ok) {
                    return res.json();
                  }
                  return Promise.reject(`Error: ${res.status}`);
                })
                .then((res) => {
                  executor(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            },
            disliker: (id, path, executor) => {
              apiTripleTen
                .dislike(id, path)
                .then((res) => {
                  if (res.ok) {
                    return res.json();
                  }
                  return Promise.reject(`Error: ${res.status}`);
                })
                .then((res) => {
                  executor(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            },
            excluder: deleteCard,
            deletePopup: deleteCardConfirmationPopup,
            userId,
          });
          const cardElement = newCard.generateCard();
          cardsSection.addItem(cardElement);
        },
      },
      configCard.cardsContainerSelector
    );
    cardsSection.itemRenderer();
  })
  .catch((err) => {
    console.log(err);
  });

const popupGalery = new PopupWithForm(configPopups.popupGalery, {
  submitFunction: (item) => {
    popupGalery.renderSaving(true);
    apiTripleTen
      .addNewCard(item, "/cards")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        const newCard = new Card(data, {
          config: configCard,
          renderer: (item) => {
            viewerPopup.open(item);
          },
          liker: (id, path, executor) => {
            apiTripleTen
              .like(id, path)
              .then((res) => {
                if (res.ok) {
                  return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
              })
              .then((res) => {
                executor(res);
              })
              .catch((err) => {
                console.log(err);
              });
          },
          disliker: (id, path, executor) => {
            apiTripleTen
              .dislike(id, path)
              .then((res) => {
                if (res.ok) {
                  return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
              })
              .then((res) => {
                executor(res);
              })
              .catch((err) => {
                console.log(err);
              });
          },
          excluder: deleteCard,
          deletePopup: (back) => {
            hendleOpenDeletePopup(back);
          },
          userId,
        });
        const cardElement = newCard.generateCard();
        cardsSection.addItem(cardElement);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupGalery.renderSaving(false);
        popupGalery.close();
      });
  },
});

popupGalery.setEventListeners();

galleryAddButton.addEventListener("click", () => {
  popupGaleryValidation.toggleButtonState();
  popupGalery.open();
});

const getUserApiData = () =>
  apiTripleTen.getUserInfo("/users/me").then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });

const userInfo = new UserInfo(userInfoConfig, { handleUser: getUserApiData });

userInfo.getUserInfo();

getUserApiData()
  .then((data) => {
    userInfo.setUserInfo(data);
    profilePicture.setAttribute("src", `${data.avatar}`);
  })
  .catch((err) => {
    console.log(err);
  });

const popupProfile = new PopupWithForm(configPopups.popupProfile, {
  submitFunction: (item) => {
    popupProfile.renderSaving(true);
    apiTripleTen
      .updateUserInfo(item, "/users/me")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupProfile.close();
        popupProfile.renderSaving(false);
      });
  },
});

popupProfile.setEventListeners();

profileEditButton.addEventListener("click", () => {
  popupProfileValidation.toggleButtonState();

  const data = userInfo.getUserInfo();

  inputName.value = data.name;
  inputAbout.value = data.about;

  popupProfile.open();
});

const popupPicture = new PopupWithForm(configPopups.popupPicture, {
  submitFunction: (item) => {
    popupPicture.renderSaving(true);
    apiTripleTen
      .updateUserAvatar(item, "/users/me/avatar")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        profilePicture.setAttribute("src", `${data.avatar}`);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupPicture.close();
        popupPicture.renderSaving(false);
      });
  },
});

popupPicture.setEventListeners();

pictureEditButton.addEventListener("click", () => {
  popupPictureValidation.toggleButtonState();
  popupPicture.open();
});

const popupProfileValidation = new FormValidator(
  ".form_profile",
  configFormValidator,
  ".editor__profile-close-button"
);

popupProfileValidation.enableValidation();

const popupGaleryValidation = new FormValidator(
  ".form_gallery",
  configFormValidator,
  ".editor__gallery-close-button"
);

popupGaleryValidation.enableValidation();

const popupPictureValidation = new FormValidator(
  ".form_picture",
  configFormValidator,
  ".editor__picture-close-button"
);

popupPictureValidation.enableValidation();
