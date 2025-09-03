const editProfileBtn = document.querySelector(".profile__button_type_edit");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileClose = editProfileModal.querySelector(".modal__close");

const newPostBtn = document.querySelector(".profile__button_type_post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostClose = newPostModal.querySelector(".modal__close");

editProfileBtn.addEventListener("click", function (event) {
  editProfileModal.classList.add("modal_is-open");
});

editProfileClose.addEventListener("click", function (event) {
  editProfileModal.classList.remove("modal_is-open");
});

newPostBtn.addEventListener("click", function (event) {
  newPostModal.classList.add("modal_is-open");
});

newPostClose.addEventListener("click", function (event) {
  newPostModal.classList.remove("modal_is-open");
});
