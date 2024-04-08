let editor = document.querySelector(".editor");
let profileEditButton = document.querySelector(".profile__edit-button");
let editorCloseButton = document.querySelector(".editor__close-button");
let formElement = document.querySelector(".form");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");

function handleProfileFormSubmit(evt) {
  let inputName = formElement.querySelector(".form__input_name");
  let inputAbout = formElement.querySelector(".form__input_about");
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

function closePopup() {
  editor.classList.toggle("editor_visible");
}

formElement.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", handleProfileFormSubmit);
editorCloseButton.addEventListener("click", closePopup);

// function handlePopupDisplay() {
//   editor.classList.toggle("editor_visible");
//   name.value = profileName.textContent;
//   about.value = profileAbout.textContent;
// }

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileName.textContent = name.value;
//   profileAbout.textContent = about.value;
//   handlePopupDisplay();
// }

// formElement.addEventListener("submit", handleProfileFormSubmit);
// profileEditButton.addEventListener("click", handlePopupDisplay);
// editorCloseButton.addEventListener("click", handlePopupDisplay);
