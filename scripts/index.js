const editProfileBtn = document.querySelector(".profile__button_type_edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileClose = editProfileModal.querySelector(".modal__close");
const profile = document.querySelector(".profile");
const editProfileName = profile.querySelector(".profile__name");
const editProfileDescription = profile.querySelector(".profile__description");
const editProfileForm = editProfileModal.querySelector(".modal__content");
const inputName = editProfileModal.querySelector("#input-name");
const inputDescription = editProfileModal.querySelector("#input-description");

const newPostBtn = document.querySelector(".profile__button_type_post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostClose = newPostModal.querySelector(".modal__close");
const addCardForm = newPostModal.querySelector(".modal__content");
const inputImg = newPostModal.querySelector("#input-img");
const inputCaption = newPostModal.querySelector("#input-caption");

editProfileBtn.addEventListener("click", function (evt) {
  editProfileModal.classList.add("modal_is-open"); //open profile modal
  inputName.value = editProfileName.textContent; //get current name
  inputDescription.value = editProfileDescription.textContent; //get current description
});

editProfileClose.addEventListener("click", function (evt) {
  editProfileModal.classList.remove("modal_is-open"); //close profile modal
});

newPostBtn.addEventListener("click", function (evt) {
  newPostModal.classList.add("modal_is-open"); //open post modal
});

newPostClose.addEventListener("click", function (evt) {
  newPostModal.classList.remove("modal_is-open"); //close post modal
});

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

addCardForm.addEventListener("submit", handleAddCardSubmit);
