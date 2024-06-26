import Card from "./Card.js";

import FormValidator from "./FormValidator.js";

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
  configForm,
  closePopup,
  closeWithEsc,
  handleProfilePopupOpening,
  controlGalleryForm,
  resetForms,
} from "./utils.js";

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (inputName.value.trim() != "" && inputAbout.value.trim() != "") {
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    closePopup(profileEditor, "editor_visible");
  }
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

profileEditButton.addEventListener("click", () => {
  handleProfilePopupOpening();
});

profileCloseButton.addEventListener("click", () => {
  closePopup(profileEditor, "editor_visible");
});

profileEditor.addEventListener("click", (evt) => {
  evt.target.classList.remove("editor_visible");
});

initialCards.forEach((card) => {
  cardsContainer.prepend(
    new Card(
      card,
      configCard,
      closeWithEsc,
      closePopup,
      initialCards
    ).generateCard()
  );
});

galleryFormElement.addEventListener("submit", controlGalleryForm);
galleryAddButton.addEventListener("click", controlGalleryForm);

galleryCloseButton.addEventListener("click", () => {
  resetForms(galleryFormElement);
  closePopup(galleryEditor, "editor_visible");
});

galleryEditor.addEventListener("click", (evt) => {
  evt.target.classList.remove("editor_visible");
});

new FormValidator(
  ".form_profile",
  configForm,
  ".editor__profile-close-button"
).enableValidation();

new FormValidator(
  ".form_gallery",
  configForm,
  ".editor__gallery-close-button"
).enableValidation();
