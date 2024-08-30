const profileEditButton = document.querySelector(".profile__edit-button");

const galleryAddButton = document.querySelector(".profile__add-button");

const pictureEditButton = document.querySelector(
  ".profile__picture-edit-button"
);

const inputName = document.querySelector(".form__input_name");
const inputAbout = document.querySelector(".form__input_about");

const profilePicture = document.querySelector(".profile__picture");

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

const userId = "57ad3ec977745486d8c3e581";

const apiConfig = {
  baseURL: "https://around.nomoreparties.co/v1/web-ptbr-cohort-11",
  userAuthorization: "3fda8d28-174d-4647-9b4c-9acb9effd1bc",
};

const configCard = {
  cardsContainerSelector: ".gallery__cards",
  templateSelector: "#template-cards",
  cardSelector: ".gallery__card",
  cardNameSelector: ".gallery__card-name",
  cardImageSelector: ".gallery__card-image",
  likeButtonSelector: ".gallery__card-like-button",
  likeButtonActive: "gallery__card-like-button-active",
  deleteButtonSelector: ".gallery__card-delete-button",
  deleteButtonVisible: "gallery__card-delete-button-visible",
};

const configFormValidator = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button-inactive",
  inputErrorClass: "form__input_type-error",
  errorClass: "form__error_visible",
};

const configPopups = {
  popupProfile: {
    popupSelector: ".editor_profile",
    openClass: "editor_visible",
    closeButtonSelector: ".editor__profile-close-button",
    formElement: ".form_profile",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit-button",
    buttonText: "Salvar",
  },
  popupGalery: {
    popupSelector: ".editor_gallery",
    openClass: "editor_visible",
    closeButtonSelector: ".editor__gallery-close-button",
    formElement: ".form_gallery",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit-button",
    buttonText: "Criar",
  },
  popupPicture: {
    popupSelector: ".editor_picture",
    openClass: "editor_visible",
    closeButtonSelector: ".editor__picture-close-button",
    formElement: ".form_picture",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit-button",
    buttonText: "Salvar",
  },
  popupViewer: {
    popupSelector: ".viewer",
    openClass: "viewer_visible",
    closeButtonSelector: ".viewer__close-button",
    viewerImageSelector: ".viewer__image",
    viewerTitleSelector: ".viewer__title",
  },
  popupDeleteImage: {
    popupSelector: ".confirmer_image-delete",
    openClass: "confirmer_visible",
    closeButtonSelector: ".confirmer__image-delete-close-button",
    confirmationButtonSelector: ".confirmer__confirmation-button",
  },
};

const userInfoConfig = {
  personSelector: ".profile__name",
  aboutSelector: ".profile__about",
};

export {
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
};
