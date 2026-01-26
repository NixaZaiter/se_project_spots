import "./index.css";
import {
  enableValidation,
  resetValidation,
  disableButton,
  validationConfig,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8c8207a4-2f8d-4453-b863-c38d8ef61086",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, user]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
    editProfileAvatar.src = user.avatar;
    editProfileName.textContent = user.name;
    editProfileDescription.textContent = user.about;
  })
  .catch((err) => {
    console.error(err);
  });

// General Modal
const allModals = document.querySelectorAll(".modal");

// Open Modal Buttons
const editProfileBtn = document.querySelector(".profile__button_type_edit");
const newPostBtn = document.querySelector(".profile__button_type_post");

// Base Profile
const profile = document.querySelector(".profile");
const editProfileAvatar = profile.querySelector(".profile__avatar");
const editProfileName = profile.querySelector(".profile__name");
const editProfileDescription = profile.querySelector(".profile__description");

// Image Preview Modal(s)
const previewImgModal = document.querySelector("#image-preview-modal");
const previewImgText = previewImgModal.querySelector(".modal__title");
const previewImgImage = previewImgModal.querySelector(".modal__image");
const previewImgCloseBtn = previewImgModal.querySelector(".modal__close");

// Profile Modal Inputs
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const inputName = editProfileModal.querySelector("#input-name");
const inputDescription = editProfileModal.querySelector("#input-description");
const editProfileClose = editProfileModal.querySelector(".modal__close");

// Post Modal Inputs
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = newPostModal.querySelector(".modal__form");
const inputImg = newPostModal.querySelector("#input-img");
const inputCaption = newPostModal.querySelector("#input-caption");
const postSubmitBtn = newPostModal.querySelector("#post-save-button");
const newPostClose = newPostModal.querySelector(".modal__close");

// Card Template
const cardTemplate = document
  .querySelector("#new-cards")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

// Modal Open/Close Listeners + Current Profile Inputs

editProfileBtn.addEventListener("click", function (evt) {
  inputName.value = editProfileName.textContent;
  inputDescription.value = editProfileDescription.textContent;
  resetValidation(
    editProfileForm,
    [inputName, inputDescription],
    validationConfig,
  );
  openModal(editProfileModal);
});

editProfileClose.addEventListener("click", function (evt) {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function (evt) {
  openModal(newPostModal);
});

newPostClose.addEventListener("click", function (evt) {
  closeModal(newPostModal);
});

previewImgCloseBtn.addEventListener("click", function (evt) {
  closeModal(previewImgModal);
});

newPostForm.addEventListener("submit", handleAddCardSubmit);

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

// Functions and Submits

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitleElement = cardElement.querySelector(".card__text");
  cardTitleElement.textContent = data.name;

  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.alt = data.name;
  cardImageElement.src = data.link;

  const likeButton = cardElement.querySelector(".card__like-btn");
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-btn_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-btn");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImageElement.addEventListener("click", function () {
    previewImgImage.src = cardImageElement.src;
    previewImgImage.alt = cardImageElement.alt;
    previewImgText.textContent = cardTitleElement.textContent;
    openModal(previewImgModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-open");
  document.addEventListener("keydown", closeOnEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
  document.removeEventListener("keydown", closeOnEscape);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  api
    .editUserInfo({ name: inputName.value, about: inputDescription.value })
    .then((data) => {
      editProfileName.textContent = data.name;
      editProfileDescription.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleAddCardSubmit(event) {
  event.preventDefault();

  const cardElement = getCardElement({
    name: inputCaption.value,
    link: inputImg.value,
  });

  cardsList.prepend(cardElement);

  newPostForm.reset();

  disableButton(postSubmitBtn, validationConfig);

  closeModal(newPostModal);
}

// Close on clicking outside modal
allModals.forEach((modal) => {
  modal.addEventListener("click", function (evt) {
    if (evt.target == modal) {
      closeModal(modal);
    }
  });
});

const closeOnEscape = (evt) => {
  if (evt.key !== `Escape`) {
    return;
  }

  const currentModal = document.querySelector(".modal_is-open");

  if (currentModal) {
    closeModal(currentModal);
  }
};

enableValidation(validationConfig);
