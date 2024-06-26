import Card from "./Card.js";

const profileEditor = document.querySelector(".editor_profile");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileCloseButton = profileEditor.querySelector(
  ".editor__profile-close-button"
);

const profileFormElement = document.querySelector(".form_profile");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const inputName = profileFormElement.querySelector(".form__input_name");
const inputAbout = profileFormElement.querySelector(".form__input_about");

const galleryEditor = document.querySelector(".editor_gallery");

const galleryAddButton = document.querySelector(".profile__add-button");
const galleryCloseButton = document.querySelector(
  ".editor__gallery-close-button"
);

const galleryFormElement = document.querySelector(".form_gallery");

const inputTitle = galleryFormElement.querySelector(".form__input_title");
const inputLink = galleryFormElement.querySelector(".form__input_link");

const cardsContainer = document.querySelector(".gallery__cards");

const initialCards = [
  {
    name: "Parque Nacional de Zion",
    link: "https://images.unsplash.com/photo-1443632864897-14973fa006cf?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lago Tahoe",
    link: "https://images.unsplash.com/photo-1539209446455-bba018698d1b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Horseshoe Bend",
    link: "https://images.unsplash.com/photo-1548815056-de4dab9bfd9d?q=80&w=2544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Escadaria de Haiku",
    link: "https://images.unsplash.com/photo-1517896506879-23e137ea45df?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Montanhas Great Smoky",
    link: "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ilha Dry Tortugas",
    link: "https://images.unsplash.com/photo-1617371603397-c093612c88a5?q=80&w=2531&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const configCard = {
  templateSelector: "#template-cards",
  cardSelector: ".gallery__card",
  cardName: ".gallery__card-name",
  cardImage: ".gallery__card-image",
  likeButton: ".gallery__card-like-button",
  likeButtonActive: "gallery__card-like-button-active",
  deleteButton: ".gallery__card-delete-button",
  viewerPopup: ".viewer",
  viewerPopupVisible: "viewer_visible",
  viewerImage: ".viewer__image",
  viewerTitle: ".viewer__title",
  viewerCloseButton: ".viewer__close-button",
};

const configForm = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button-inactive",
  inputErrorClass: "form__input_type-error",
  errorClass: "form__error_visible",
};

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
  document.addEventListener("keydown", (evt) => {
    closeWithEsc(evt, profileEditor, "editor_visible");
  });
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
};
