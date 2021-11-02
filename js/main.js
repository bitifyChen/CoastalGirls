//Nav JS
const menuBtn = document.querySelector("nav > button.menu");
const menu = document.querySelector("nav");
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
  menu.classList.add("no-top");
  document.body.classList.toggle("lock-scroll");
});
window.addEventListener("scroll", function () {
  if (window.scrollY < 50) {
    menu.classList.remove("no-top");
  } else {
    menu.classList.add("no-top");
  }
});

//Modal JS
const modalCloseBtn = document.querySelector("button.modal-close");
const modalOpenBtns = document.querySelectorAll("button.modal-open");
const modals = document.querySelectorAll("section.modal");
modals.forEach((modal) => {
  modal.addEventListener("click", () => {
    modal.classList.remove("open");
    document.body.classList.remove("lock-scroll");
  });
});

modalCloseBtn.addEventListener("click", () => {
  modals.forEach((modal) => {
    modal.classList.remove("open");
  });
  document.body.classList.remove("lock-scroll");
});

modalOpenBtns.forEach((modalOpenBtn) => {
  modalOpenBtn.addEventListener("click", () => {
    const modalName = modalOpenBtn.attributes["data-name"].value;
    document
      .querySelector("section.modal[data-name='" + modalName + "']")
      .classList.add("open");
    document.body.classList.toggle("lock-scroll");
  });
});