const editor = document.querySelector(".editor");

const profileEditButton = document.querySelector(".profile__edit-button");
const editorCloseButton = document.querySelector(".editor__close-button");

const formElement = document.querySelector(".form");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

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

function handleProfileFormSubmit(evt) {
  const inputName = formElement.querySelector(".form__input_name");
  const inputAbout = formElement.querySelector(".form__input_about");
  evt.preventDefault();
  if (inputName.value != "" && inputAbout.value != "") {
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    editor.classList.toggle("editor_visible");
    return;
  }
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  editor.classList.toggle("editor_visible");
}

formElement.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", handleProfileFormSubmit);

function closePopup() {
  editor.classList.toggle("editor_visible");
}

editorCloseButton.addEventListener("click", closePopup);

function createCard(card) {
  const cardsTemplate = document.querySelector("#template-cards").content;
  const cardElement = cardsTemplate
    .querySelector(".gallery__card")
    .cloneNode(true);
  const cardName = cardElement.querySelector(".gallery__card-name");
  const cardImage = cardElement.querySelector(".gallery__card-image");

  cardName.textContent = card.name;
  cardImage.setAttribute("src", card.link);

  const likeButton = cardElement.querySelector(".gallery__card-like-button");
  likeButton.addEventListener("click", (evt) =>
    evt.target.classList.toggle("gallery__card-like-button-active")
  );

  cardsContainer.prepend(cardElement);
}

initialCards.forEach((card) => createCard(card));
