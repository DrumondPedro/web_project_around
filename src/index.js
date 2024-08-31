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
  userId,
} from "./scripts/utils.js";

const apiTripleTen = new Api(apiConfig);

const viewerPopup = new PopupWithImage(configPopups.popupViewer);

viewerPopup.setEventListeners();

let cardsSection;

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

// adiciona um card novo no servidor, e com a resposta de confirmação do servidor
// renderiza o novo cartão

// {
//   createdAt: "2024-08-28T23:52:45.747Z",
//   likes: [],
//   link: "https://images.unsplash.com/photo-1517751243320-0cc45ec82da7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   name: "Ilhas Faroés",
//   owner: {
//     about: "Web Dev",
//     avatar:
//       "https://images.unsplash.com/photo-1724075682633-4664473db52c?q=80&w=2572&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     cohort: "web-ptbr-cohort-11",
//     name: "Pedro Drumond",
//     _id: "57ad3ec977745486d8c3e581",
//   },
//   _id: "66cfb84ddde07005db2db385",
// };

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
  popupGalery.open();
});

const userInfo = new UserInfo(userInfoConfig);

apiTripleTen
  .getUserInfo("/users/me")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  })
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
  popupPicture.open();
});

const deleteCardConfirmationPoup = new PopupWithConfirmation(
  configPopups.popupDeleteImage
);

deleteCardConfirmationPoup.setEventListeners();

new FormValidator(
  ".form_profile",
  configFormValidator,
  ".editor__profile-close-button"
).enableValidation();

new FormValidator(
  ".form_gallery",
  configFormValidator,
  ".editor__gallery-close-button"
).enableValidation();

new FormValidator(
  ".form_picture",
  configFormValidator,
  ".editor__picture-close-button"
).enableValidation();
