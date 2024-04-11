const editor = document.querySelector(".editor");

const profileEditButton = document.querySelector(".profile__edit-button");
const editorCloseButton = document.querySelector(".editor__close-button");

const formElement = document.querySelector(".form");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

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
