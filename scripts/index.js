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

// Profile Modal Inputs
const editProfileForm = editProfileModal.querySelector(".modal__content");
const inputName = editProfileModal.querySelector("#input-name");
const inputDescription = editProfileModal.querySelector("#input-description");

// Post Modal Inputs
const newPostForm = newPostModal.querySelector(".modal__content");
const inputImg = newPostModal.querySelector("#input-img");
const inputCaption = newPostModal.querySelector("#input-caption");

// Modal Open/Close Listeners + Current Profile Inputs
editProfileBtn.addEventListener("click", function (evt) {
  toggleModal(editProfileModal);
  inputName.value = editProfileName.textContent;
  inputDescription.value = editProfileDescription.textContent;
});

editProfileClose.addEventListener("click", function (evt) {
  toggleModal(editProfileModal);
});

newPostBtn.addEventListener("click", function (evt) {
  toggleModal(newPostModal);
});

newPostClose.addEventListener("click", function (evt) {
  toggleModal(newPostModal);
});

// Functions and Submits
function toggleModal(modal) {
  modal.classList.toggle("modal_is-open");
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  const inputValues = {
    name: inputName.value,
    description: inputDescription.value,
  };

  editProfileName.textContent = inputValues.name;
  editProfileDescription.textContent = inputValues.description;

  editProfileModal.classList.remove("modal_is-open");
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(event) {
  event.preventDefault();

  console.log(inputImg.value);
  console.log(inputCaption.value);

  newPostModal.classList.remove("modal_is-open");
}

newPostForm.addEventListener("submit", handleAddCardSubmit);
