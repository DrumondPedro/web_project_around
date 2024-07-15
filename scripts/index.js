import Card from "./Card.js";

import FormValidator from "./FormValidator.js";

import { PopupWithImage, PopupWithForm } from "./Popup.js";

import Section from "./Section.js";

import UserInfo from "./UserInfo.js";

import {
  profileEditButton,
  galleryAddButton,
  initialCards,
  configCard,
  configFormValidator,
  configPopups,
  userInfoConfig,
  inputName,
  inputAbout,
} from "./utils.js";

// --- Cards

const viewerPopup = new PopupWithImage(configPopups.popupViewer);
viewerPopup.setEventListeners();

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item, {
        config: configCard,
        cardsList: initialCards,
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

// -- Galery

const popupGalery = new PopupWithForm(configPopups.popupGalery, {
  submitFunction: (item) => {
    const newCard = new Card(item, {
      config: configCard,
      cardsList: initialCards,
      renderer: (item) => {
        viewerPopup.open(item);
      },
    });
    const cardElement = newCard.generateCard();
    cardsSection.addItem(cardElement);
  },
});

popupGalery.setEventListeners();

galleryAddButton.addEventListener("click", () => {
  popupGalery.open();
});

// -- Profile

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

// -- Validator

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
