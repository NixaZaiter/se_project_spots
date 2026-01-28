export const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input_type_text",
  submitBtnSelector: ".modal__input_type_btn",
  inactiveBtnClass: "modal__input_type_btn-disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error-visible",
};

const showInputError = (formEl, inputEl, errorMessage, config) => {
  const errorElement = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formEl, inputEl, config) => {
  const errorElement = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};
const toggleBtnState = (inputList, btnElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableBtn(btnElement, config);
  } else {
    btnElement.classList.remove(config.inactiveBtnClass);
    btnElement.disabled = false;
  }
};

export const disableBtn = (btnElement, config) => {
  btnElement.classList.add(config.inactiveBtnClass);
  btnElement.disabled = true;
};

export const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

export const resetValidation = (formEl, inputList, config) => {
  const btnElement = formEl.querySelector(config.submitBtnSelector);
  inputList.forEach((input) => {
    hideInputError(formEl, input, config);
  });
  toggleBtnState(inputList, btnElement, config);
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const btnElement = formEl.querySelector(config.submitBtnSelector);
  toggleBtnState(inputList, btnElement, config);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, config);
      toggleBtnState(inputList, btnElement, config);
    });
  });
};

enableValidation(validationConfig);
