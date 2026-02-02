import "./index.css";
import {
  enableValidation,
  resetValidation,
  disableBtn,
  validationConfig,
} from "../scripts/validation.js";
import { setBtnText } from "../utils/helpers.js";
import Api from "../utils/Api.js";

let selectedCard, selectedCardId;

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
  .catch(console.error);

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

// Delete modal elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteConfirmBtn = deleteModal.querySelector("#delete-btn");
const deleteCancelBtn = deleteModal.querySelector("#cancel-btn");
const deleteCloseBtn = deleteModal.querySelector(".modal__close");

// Card Template
const cardTemplate = document
  .querySelector("#new-cards")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

// Modal Open/Close Listeners + Current Profile Inputs

profileBtn.addEventListener("click", function () {
  profileName.value = currentName.textContent;
  profileDescription.value = currentDescription.textContent;
  resetValidation(
    profileForm,
    [profileName, profileDescription],
    validationConfig,
  );
  openModal(profileModal);
});
profileClose.addEventListener("click", function () {
  closeModal(profileModal);
});

// Open/Close for avatar
avatarBtn.addEventListener("click", function () {
  openModal(avatarModal);
});
avatarModalCloseBtn.addEventListener("click", function () {
  closeModal(avatarModal);
});

// Open/Close for new cards
cardBtn.addEventListener("click", function () {
  openModal(cardModal);
});
cardClose.addEventListener("click", function () {
  closeModal(cardModal);
});

// Close for image preview
previewImgCloseBtn.addEventListener("click", function () {
  closeModal(previewImgModal);
});

// Close/Cancel for delete modal
deleteCloseBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});
deleteCancelBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  selectedCard = null;
  selectedCardId = null;
  closeModal(deleteModal);
});

avatarForm.addEventListener("submit", handleAvatarFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);

// Functions and Submits
function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}
function handleLikeCard(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-btn_active");
  api
    .toggleLikeStatus(id, isLiked)
    .then(evt.target.classList.toggle("card__like-btn_active"))
    .catch(console.error);
}
function handleImageClick(data) {
  previewImgImage.src = data.link;
  previewImgImage.alt = data.name;
  previewImgText.textContent = data.name;
  openModal(previewImgModal);
}
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitleElement = cardElement.querySelector(".card__text");
  const cardImageElement = cardElement.querySelector(".card__image");
  const likeBtn = cardElement.querySelector(".card__like-btn");
  const deleteBtn = cardElement.querySelector(".card__delete-btn");

  data.isLiked
    ? likeBtn.classList.add("card__like-btn_active")
    : likeBtn.classList.remove("card__like-btn_active");

  cardTitleElement.textContent = data.name;
  cardImageElement.alt = data.name;
  cardImageElement.src = data.link;

  likeBtn.addEventListener("click", (evt) => handleLikeCard(evt, data._id));
  deleteBtn.addEventListener("click", () =>
    handleDeleteCard(cardElement, data),
  );

  cardImageElement.addEventListener("click", () => handleImageClick(data));

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

// Form handlers
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  setBtnText(evt, "Saving...");

  api
    .editUserAvatar({ avatar: avatarImg.value })
    .then((data) => {
      currentAvatar.src = data.avatar;
      avatarForm.reset();
      disableBtn(avatarSubmitBtn, validationConfig);
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setBtnText(evt, "Save");
    });
}
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  setBtnText(evt, "Saving...");

  api
    .createCard({ name: cardCaption.value, link: cardImg.value })
    .then((data) => {
      const cardElement = getCardElement({
        name: data.name,
        link: data.link,
        _id: data._id,
      });
      cardsList.prepend(cardElement);
      cardForm.reset();
      disableBtn(cardSubmitBtn, validationConfig);
      closeModal(cardModal);
    })
    .catch(console.error)
    .finally(() => {
      setBtnText(evt, "Save");
    });
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  setBtnText(evt, "Saving...");
  api
    .editUserInfo({ name: profileName.value, about: profileDescription.value })
    .then((data) => {
      currentName.textContent = data.name;
      currentDescription.textContent = data.about;
      closeModal(profileModal);
    })
    .catch(console.error)
    .finally(() => {
      setBtnText(evt, "Save");
    });
}
function handleDeleteSubmit(evt) {
  evt.preventDefault();

  setBtnText(evt, "Deleting...");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setBtnText(evt, "Delete");
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
