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

const viewerPopup = document.querySelector(".viewer");

function closePopupProfile() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  profileEditor.classList.remove("editor_visible");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (inputName.value.trim() != "" && inputAbout.value.trim() != "") {
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    profileEditor.classList.toggle("editor_visible");
    return;
  }
  closePopupProfile();
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", handleProfileFormSubmit);

profileCloseButton.addEventListener("click", closePopupProfile);

profileEditor.addEventListener("click", (evt) => {
  evt.target.classList.remove("editor_visible");
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopupProfile();
  }
});

function createCard(card) {
  const cardsTemplate = document.querySelector("#template-cards").content;
  const cardElement = cardsTemplate
    .querySelector(".gallery__card")
    .cloneNode(true);

  const cardName = cardElement.querySelector(".gallery__card-name");
  const cardImage = cardElement.querySelector(".gallery__card-image");

  cardName.textContent = card.name;
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);

  const likeButton = cardElement.querySelector(".gallery__card-like-button");
  likeButton.addEventListener("click", (evt) =>
    evt.target.classList.toggle("gallery__card-like-button-active")
  );

  const deleteButton = cardElement.querySelector(
    ".gallery__card-delete-button"
  );
  deleteButton.addEventListener("click", () =>
    deleteButton.closest(".gallery__card").remove()
  );

  const viwerImage = viewerPopup.querySelector(".viewer__image");
  const viewerTitle = viewerPopup.querySelector(".viewer__title");

  cardImage.addEventListener("click", () => {
    viewerPopup.classList.toggle("viewer_visible");
    viwerImage.setAttribute("src", card.link);
    viwerImage.setAttribute("alt", card.name);
    viewerTitle.textContent = card.name;
  });

  cardsContainer.prepend(cardElement);
}

initialCards.forEach((card) => createCard(card));

function closePopupGallery() {
  inputTitle.value = "";
  inputLink.value = "";
  galleryEditor.classList.remove("editor_visible");
}

function controlGalleryForm(evt) {
  evt.preventDefault();
  if (inputLink.value.trim() != "" && inputTitle.value.trim() != "") {
    const newCard = { name: inputTitle.value, link: inputLink.value };
    createCard(newCard);
    closePopupGallery();
    return;
  }
  inputTitle.value = "";
  inputLink.value = "";
  galleryEditor.classList.add("editor_visible");
}

galleryFormElement.addEventListener("submit", controlGalleryForm);
galleryAddButton.addEventListener("click", controlGalleryForm);

galleryCloseButton.addEventListener("click", () => {
  closePopupGallery();
});

galleryEditor.addEventListener("click", (evt) => {
  evt.target.classList.remove("editor_visible");
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopupGallery();
  }
});

const viewerCloseButton = viewerPopup.querySelector(".viewer__close-button");

function closeViewer() {
  viewerPopup.classList.remove("viewer_visible");
}

viewerCloseButton.addEventListener("click", () => closeViewer());

viewerPopup.addEventListener("click", (evt) => {
  evt.target.classList.remove("viewer_visible");
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closeViewer();
  }
});
