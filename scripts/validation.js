const settings = {
  formSelector: ".modal__content",
  inputSelector: ".input",
  submitButtonSelector: ".input__button",
  inactiveButtonClass: "input__button_disabled",
  inputErrorClass: "input__text_type_error",
  errorClass: "input__error_visible",
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("input__text_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("input__error_visible");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("input__text_type_error");
  errorElement.classList.remove("input__error_visible");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.querySelector(".input__text").validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

const setEventListeners = (formElement, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

// enableValidation(settings);
