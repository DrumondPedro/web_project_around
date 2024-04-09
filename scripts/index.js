const editor = document.querySelector(".editor");

const profileEditButton = document.querySelector(".profile__edit-button");
const editorCloseButton = document.querySelector(".editor__close-button");

const formElement = document.querySelector(".form");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

function handleProfileFormSubmit(evt) {
  const inputName = formElement.querySelector(".form__input_name");
  const inputAbout = formElement.querySelector(".form__input_about");
  if (editor.classList.contains("editor_visible")) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    editor.classList.toggle("editor_visible");
  } else {
    editor.classList.toggle("editor_visible");
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
  }
}

formElement.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", handleProfileFormSubmit);

function closePopup() {
  editor.classList.toggle("editor_visible");
}

editorCloseButton.addEventListener("click", closePopup);
