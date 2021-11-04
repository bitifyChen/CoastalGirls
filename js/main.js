//Nav JS
const menuBtn = document.querySelector("nav > button.menu");
const menu = document.querySelector("nav");
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
  menu.classList.add("no-top");
  document.body.classList.toggle("lock-scroll");
});

window.addEventListener("scroll", function () {
  const firstSection = document.querySelector("section");
  const firstSectionToTop = firstSection.getBoundingClientRect().y;
  console.log(firstSectionToTop);
  if (firstSectionToTop < -50) {
    menu.classList.remove("no-top");
  } else {
    menu.classList.add("no-top");
  }
});

//Mobile Second Nav
const dropDownBtns = document.querySelectorAll("nav li.dropdown > input[type='checkbox']");
dropDownBtns.forEach((dropDownBtn) => {
  dropDownBtn.addEventListener("click", () => {
    dropDownBtn.parentNode.classList.toggle("open");
  });
});

//Modal JS
const modalCloseBtns = document.querySelectorAll("button.modal-close");
const modalOpenBtns = document.querySelectorAll("button.modal-open");
const modals = document.querySelectorAll("section.modal");

modalCloseBtns.forEach((modalCloseBtn) => {
  modalCloseBtn.addEventListener("click", () => {
    modals.forEach((modal) => {
      modal.classList.remove("open");
    });
    document.body.classList.remove("lock-scroll");
  });
});

modalOpenBtns.forEach((modalOpenBtn) => {
  modalOpenBtn.addEventListener("click", () => {
    const modalName = modalOpenBtn.attributes["data-name"].value;
    document.querySelector("section.modal[data-name='" + modalName + "']").classList.add("open");
    document.body.classList.toggle("lock-scroll");
  });
});

modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    const clickModal = e.target.classList.contains("modal");
    if (clickModal) {
      modal.classList.remove("open");
      document.body.classList.remove("lock-scroll");
    }
  });
});

// filter Main
const filterBtns = document.querySelectorAll(".main-btns li");
const items = document.querySelectorAll(".items a");
filterBtns.forEach((filterBtn) => {
  filterBtn.addEventListener("click", () => {
    filterBtnsSet(filterBtn);
    //custom page
    if ("page" in filterBtn.dataset) {
      //shop
      if (filterBtn.dataset.page === "shop") {
        shopDisplay(filterBtn.dataset.filter);
      }
    } else {
      itemDisplay(filterBtn.dataset.filter);
    }
  });
});
function filterBtnsSet(thisBtn){
  
  //Clear active 
  filterBtns.forEach((filterBtn)=>{
    filterBtn.classList.remove('active')
  })

  //Set active
  thisBtn.classList.add('active');
}

function itemDisplay(filter) {
  // All
  if (filter === "*") {
    items.forEach((item) => {
      item.classList.remove("hide");
    });
  } else {
    items.forEach((item) => {
      if (item.classList.contains(filter)) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  }
}

//shop custom
const shopPageContent = document.querySelector(".shop-page-content");
const shopPageItems = document.querySelector(".items-main .items");

function shopDisplay(filter) {
  if (filter === "shop-page-content") {
    shopPageContent.classList.remove("display-none");
    shopPageItems.classList.add("display-none");
  } 
  else {
    shopPageContent.classList.add("display-none");
    shopPageItems.classList.remove("display-none");
    if (filter === "*") {
      items.forEach((item) => {
        item.classList.remove("hide");
      });
    } else {
      items.forEach((item) => {
        if (item.classList.contains(filter)) {
          item.classList.remove("hide");
        } else {
          item.classList.add("hide");
        }
      });
    }
  }
}
