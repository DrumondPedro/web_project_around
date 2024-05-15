const showError = (parameters) => {
  const errorElement = parameters.formElement.querySelector(
    `.${parameters.inputElement.id}-error`
  );
  parameters.inputElement.classList.add(parameters.inputErrorClass);
  errorElement.textContent = parameters.inputElement.validationMessage;
  errorElement.classList.add(parameters.errorClass);
};

const hideError = (parameters) => {
  const errorElement = parameters.formElement.querySelector(
    `.${parameters.inputElement.id}-error`
  );
  parameters.inputElement.classList.remove(parameters.inputErrorClass);
  errorElement.classList.remove(parameters.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (parameters) => {
  if (parameters.inputElement.validity.valid) {
    hideError(parameters);
  } else {
    showError(parameters);
  }
};

const allInputsValid = (inputList) => {
  return inputList.every((inputElement) => {
    return inputElement.validity.valid;
  });
};

const toggleButtonState = (parameters) => {
  if (allInputsValid(parameters.inputList)) {
    parameters.submitButtonElement.classList.remove(
      parameters.inactiveButtonClass
    );
  } else {
    parameters.submitButtonElement.classList.add(
      parameters.inactiveButtonClass
    );
  }
};

const setEventListeners = (parameters) => {
  const inputList = Array.from(
    parameters.formElement.querySelectorAll(parameters.inputSelector)
  );
  const submitButtonElement = parameters.formElement.querySelector(
    parameters.submitButtonSelector
  );
  // const closeButtonElement = editor.querySelector(parameters.closeButtonSelector)

  toggleButtonState(
    Object.assign(parameters, { inputList, submitButtonElement })
  );

  // 1 adicionar ouvinte que chama uma função que quando o botão de fechar for acionado
  // remove as classses de erro
  // parameters.formElement.addEventListener("submit", () => {

  // criar um ouvinte que quando o editor do perfil abrir a priemira vez ativar o botão

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(Object.assign({ inputElement }, parameters));
      toggleButtonState(
        Object.assign({ inputList, submitButtonElement }, parameters)
      );
    });
  });
};

const enableValidation = (parameters) => {
  const formList = Array.from(
    document.querySelectorAll(parameters.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(Object.assign({ formElement }, parameters));
  });
};

enableValidation({
  formSelector: ".editor__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  closeButtonSelector: ".editor__close-button",
  inactiveButtonClass: "form__submit-button-inactive",
  inputErrorClass: "form__input_type-error",
  errorClass: "form__error_visible",
});
