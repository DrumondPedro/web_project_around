import Card from "./Card.js";

import {
  profileEditor,
  profileName,
  profileAbout,
  inputName,
  inputAbout,
  galleryEditor,
  galleryFormElement,
  inputTitle,
  inputLink,
  cardsContainer,
  configCard,
  initialCards,
} from "./index.js";

function closePopup(popupElement, openPopupClass) {
  popupElement.classList.remove(openPopupClass);
  document.removeEventListener("keydown", closeWithEsc);
}

function closeWithEsc(evt, popupElement, openPopupClass) {
  if (evt.key === "Escape") {
    closePopup(popupElement, openPopupClass);
  }
}

function handleProfilePopupOpening() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  profileEditor.classList.add("editor_visible");
  document.addEventListener("keydown", closeWithEsc);
}

function controlGalleryForm(evt) {
  evt.preventDefault();
  document.addEventListener("keydown", (evt) => {
    closeWithEsc(evt, galleryEditor, "editor_visible");
  });
  if (inputLink.value.trim() != "" && inputTitle.value.trim() != "") {
    const newCard = { name: inputTitle.value, link: inputLink.value };
    cardsContainer.prepend(
      new Card(
        newCard,
        configCard,
        closeWithEsc,
        closePopup,
        initialCards
      ).generateCard()
    );
    resetForms(galleryFormElement);
    closePopup(galleryEditor, "editor_visible");
    return;
  }
  resetForms(galleryFormElement);
  galleryEditor.classList.add("editor_visible");
}

function resetForms(formElement) {
  formElement.reset();
}

export {
  closePopup,
  closeWithEsc,
  handleProfilePopupOpening,
  controlGalleryForm,
  resetForms,
};
