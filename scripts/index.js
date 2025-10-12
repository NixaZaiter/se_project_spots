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

// General Modal Setup and Buttons
const editProfileBtn = document.querySelector(".profile__button_type_edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileClose = editProfileModal.querySelector(".modal__close");
const profile = document.querySelector(".profile");
const editProfileName = profile.querySelector(".profile__name");
const editProfileDescription = profile.querySelector(".profile__description");

const newPostBtn = document.querySelector(".profile__button_type_post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostClose = newPostModal.querySelector(".modal__close");

const prevImgModal = document.querySelector("#image-preview-modal");
const prevImgText = prevImgModal.querySelector(".modal__title");
const prevImgImage = prevImgModal.querySelector(".modal__image");
const prevImgCloseBtn = prevImgModal.querySelector(".modal__close");

// Profile Modal Inputs
const editProfileForm = editProfileModal.querySelector(".modal__content");
const inputName = editProfileModal.querySelector("#input-name");
const inputDescription = editProfileModal.querySelector("#input-description");

// Post Modal Inputs
const newPostForm = newPostModal.querySelector(".modal__content");
const inputImg = newPostModal.querySelector("#input-img");
const inputCaption = newPostModal.querySelector("#input-caption");

// Card Template
const cardTemplate = document
  .querySelector("#new-cards")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

prevImgCloseBtn.addEventListener("click", function (evt) {
  closeModal(prevImgModal);
});

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
    prevImgImage.src = cardImageElement.src;
    prevImgImage.alt = cardImageElement.alt;
    prevImgText.textContent = cardTitleElement.textContent;
    openModal(prevImgModal);
  });

  return cardElement;
}

// Modal Open/Close Listeners + Current Profile Inputs
editProfileBtn.addEventListener("click", function (evt) {
  openModal(editProfileModal);
  inputName.value = editProfileName.textContent;
  inputDescription.value = editProfileDescription.textContent;
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

// Functions and Submits
function openModal(modal) {
  modal.classList.add("modal_is-open");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  const inputValues = {
    name: inputName.value,
    description: inputDescription.value,
  };

  editProfileName.textContent = inputValues.name;
  editProfileDescription.textContent = inputValues.description;

  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(event) {
  event.preventDefault();

  const inputValues = {
    name: inputCaption.value,
    link: inputImg.value,
  };

  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);

  newPostForm.reset();

  closeModal(newPostModal);
}

newPostForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
