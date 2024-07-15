import Card from "./Card.js";

import FormValidator from "./FormValidator.js";

import { PopupWithImage, PopupWithForm } from "./Popup.js";

import Section from "./Section.js";

import UserInfo from "./UserInfo.js";

import {
  profileEditor,
  profileEditButton,
  profileCloseButton,
  profileFormElement,
  profileName,
  profileAbout,
  inputName,
  inputAbout,
  galleryEditor,
  galleryAddButton,
  galleryCloseButton,
  galleryFormElement,
  cardsContainer,
  initialCards,
  configCard,
  configFormValidator,
  configPopups,
  closePopup,
  closeWithEsc,
  // handleProfilePopupOpening,
  // controlGalleryForm,
  // resetForms,
} from "./utils.js";

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileName.textContent = inputName.value;
//   profileAbout.textContent = inputAbout.value;
//   closePopup(profileEditor, "editor_visible");
// }

// profileFormElement.addEventListener("submit", handleProfileFormSubmit);

// profileEditButton.addEventListener("click", () => {
//   handleProfilePopupOpening();
// });

// profileCloseButton.addEventListener("click", () => {
//   closePopup(profileEditor, "editor_visible");
// });

// profileEditor.addEventListener("click", (evt) => {
//   evt.target.classList.remove("editor_visible");
// });

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
          newViewerPopup.open(item);
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
  submitFunction: () => {},
});

popupGalery.setEventListeners();

// galleryFormElement.addEventListener("submit", controlGalleryForm);
// galleryAddButton.addEventListener("click", controlGalleryForm);

// galleryCloseButton.addEventListener("click", () => {
//   resetForms(galleryFormElement);
//   closePopup(galleryEditor, "editor_visible");
// });

// galleryEditor.addEventListener("click", (evt) => {
//   evt.target.classList.remove("editor_visible");
// });

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

// const popup = new PopupWithForm(configPopups.popupProfile, {
//   submitFunction: () => {},
// });

// pop.open();
// pop._getInputValues();
