import "./index.css";
import {
  enableValidation,
  resetValidation,
  disableBtn,
  validationConfig,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
const currentCards = [
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
    currentAvatar.src = user.avatar;
    currentName.textContent = user.name;
    currentDescription.textContent = user.about;
  })
  .catch((err) => {
    console.error(err);
  });

// Current Profile
const profile = document.querySelector(".profile");
const currentAvatar = profile.querySelector(".profile__avatar");
const currentName = profile.querySelector(".profile__name");
const currentDescription = profile.querySelector(".profile__description");

// General Modal
const allModals = document.querySelectorAll(".modal");

// Open Modal Btns
const avatarBtn = document.querySelector(".profile__btn_type_avatar");
const cardBtn = document.querySelector(".profile__btn_type_card");
const profileBtn = document.querySelector(".profile__btn_type_profile");

// Avatar modal elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarImg = avatarModal.querySelector("#input-avatar-img");
const avatarSubmitBtn = avatarModal.querySelector("#avatar-save-btn");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close");

// Card modal elements
const cardModal = document.querySelector("#card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardImg = cardModal.querySelector("#input-card-img");
const cardCaption = cardModal.querySelector("#input-card-caption");
const cardSubmitBtn = cardModal.querySelector("#card-save-btn");
const cardClose = cardModal.querySelector(".modal__close");

// Image Preview Modal elements
const previewImgModal = document.querySelector("#image-preview-modal");
const previewImgText = previewImgModal.querySelector(".modal__title");
const previewImgImage = previewImgModal.querySelector(".modal__image");
const previewImgCloseBtn = previewImgModal.querySelector(".modal__close");

// Profile modal elements
const profileModal = document.querySelector("#profile-modal");
const profileForm = profileModal.querySelector(".modal__form");
const profileName = profileModal.querySelector("#input-name");
const profileDescription = profileModal.querySelector("#input-description");
const profileClose = profileModal.querySelector(".modal__close");

// Card Template
const cardTemplate = document
  .querySelector("#new-cards")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

// Modal Open/Close Listeners + Current Profile Inputs

profileBtn.addEventListener("click", function (evt) {
  profileName.value = currentName.textContent;
  profileDescription.value = currentDescription.textContent;
  resetValidation(
    profileForm,
    [profileName, profileDescription],
    validationConfig,
  );
  openModal(profileModal);
});
profileClose.addEventListener("click", function (evt) {
  closeModal(profileModal);
});

// Open/Close for avatar
avatarBtn.addEventListener("click", function (evt) {
  openModal(avatarModal);
});
avatarModalCloseBtn.addEventListener("click", function (evt) {
  closeModal(avatarModal);
});

// Open/Close for new cards
cardBtn.addEventListener("click", function (evt) {
  openModal(cardModal);
});
cardClose.addEventListener("click", function (evt) {
  closeModal(cardModal);
});

// Close for image preview
previewImgCloseBtn.addEventListener("click", function (evt) {
  closeModal(previewImgModal);
});

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

cardForm.addEventListener("submit", handleCardFormSubmit);

profileForm.addEventListener("submit", handleProfileFormSubmit);

// Functions and Submits

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitleElement = cardElement.querySelector(".card__text");
  cardTitleElement.textContent = data.name;

  const cardImageElement = cardElement.querySelector(".card__image");
  cardImageElement.alt = data.name;
  cardImageElement.src = data.link;

  const likeBtn = cardElement.querySelector(".card__like-btn");
  likeBtn.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-btn_active");
    console.log(cardElement);
  });

  const deleteBtn = cardElement.querySelector(".card__delete-btn");
  deleteBtn.addEventListener("click", function () {
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

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  api
    .editUserAvatar({ avatar: avatarImg.value })
    .then((data) => {
      currentAvatar.src = data.avatar;
      avatarForm.reset();
      closeModal(avatarModal);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  api
    .createCard({ name: cardCaption.value, link: cardImg.value })
    .then((data) => {
      const cardElement = getCardElement({
        name: data.name,
        link: data.link,
      });
      cardsList.prepend(cardElement);
      cardForm.reset();
      disableBtn(cardSubmitBtn, validationConfig);
      closeModal(cardModal);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  api
    .editUserInfo({ name: profileName.value, about: profileDescription.value })
    .then((data) => {
      currentName.textContent = data.name;
      currentDescription.textContent = data.about;
      closeModal(profileModal);
    })
    .catch((err) => {
      console.error(err);
    });
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
