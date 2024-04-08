let editor = document.querySelector(".editor");
let profileEditButton = document.querySelector(".profile__edit-button");
let editorCloseButton = document.querySelector(".editor__close-button");
let formElement = document.querySelector(".form");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
let name = formElement.querySelector(".form__input_name");
let about = formElement.querySelector(".form__input_about");

function handlePopupDisplay() {
  editor.classList.toggle("editor_visible");
  name.value = profileName.textContent;
  about.value = profileAbout.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = name.value;
  profileAbout.textContent = about.value;
  handlePopupDisplay();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", handlePopupDisplay);
editorCloseButton.addEventListener("click", handlePopupDisplay);
