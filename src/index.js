import "./pages/index.css";

import Card from "./scripts/Card.js";

import FormValidator from "./scripts/FormValidator.js";

import PopupWithImage from "./scripts/PopupWithImage.js";

import PopupWithForm from "./scripts/PopupWithForm.js";

import Section from "./scripts/Section.js";

import UserInfo from "./scripts/UserInfo.js";

import {
  profileEditButton,
  galleryAddButton,
  pictureEditButton,
  initialCards,
  configCard,
  configFormValidator,
  configPopups,
  userInfoConfig,
  inputName,
  inputAbout,
  profilePicture,
} from "./scripts/utils.js";

const viewerPopup = new PopupWithImage(configPopups.popupViewer);
viewerPopup.setEventListeners();

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item, {
        config: configCard,
        section: cardsSection,
        renderer: (item) => {
          viewerPopup.open(item);
        },
      });
      const cardElement = newCard.generateCard();
      cardsSection.addItem(cardElement);
    },
  },
  configCard.cardsContainerSelector
);

cardsSection.itemRenderer();

const popupGalery = new PopupWithForm(configPopups.popupGalery, {
  submitFunction: (item) => {
    const newCard = new Card(item, {
      config: configCard,
      section: cardsSection,
      renderer: (item) => {
        viewerPopup.open(item);
      },
    });
    const cardElement = newCard.generateCard();
    cardsSection.addItem(cardElement);

    const oldCards = cardsSection.getItems();
    oldCards.push(item);
  },
});

popupGalery.setEventListeners();

galleryAddButton.addEventListener("click", () => {
  popupGalery.open();
});

const userInfo = new UserInfo(userInfoConfig);

const popupProfile = new PopupWithForm(configPopups.popupProfile, {
  submitFunction: (item) => {
    userInfo.setUserInfo(item);
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
    profilePicture.setAttribute("src", `${item.picture}`);
  },
});

popupPicture.setEventListeners();

pictureEditButton.addEventListener("click", () => {
  popupPicture.open();
});

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
