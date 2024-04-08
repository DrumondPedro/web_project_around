let editor = document.querySelector(".editor");
let profileEditButton = document.querySelector(".profile__edit-button");
let editoCloseButton = document.querySelector(".editor__close-button");

function handlePopupDisplay() {}

editoCloseButton.addEventListener("click", handlePopupDisplay);

let formElement = document.querySelector(".form");

let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let name = formElement.querySelector(".form__input_name");
  let about = formElement.querySelector(".form__input_about");
  profileName.textContent = name.value;
  profileAbout.textContent = about.value;
}

formElement.addEventListener("submit", handleProfileFormSubmit);
