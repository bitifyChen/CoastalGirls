//---【Base】 ---
//Nav
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
const modalOpenBtns = document.querySelectorAll(".modal-open");
const modalOpenDivs = document.querySelectorAll("div.modal-open");
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

modalOpenDivs.forEach((modalOpenDiv) => {
  modalOpenDiv.addEventListener("click", () => {
    const modalName = modalOpenDiv.attributes["data-name"].value;
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

 //world info display to
 const worldBtns = document.querySelectorAll(".modal-sidebar>ul>li");
 const worldInfos = document.querySelectorAll(".modal-info");
 worldBtns.forEach((worldBtn, index) => {
   worldBtn.addEventListener("click", () => {
     worldBtns.forEach((worldBtn) => worldBtn.classList.remove("active"));
     worldBtn.classList.add("active");
     showInfo(index);
   });
 });

 function showInfo(btnIndex) {
   worldInfos.forEach((worldInfo, index) => {
     if (index === btnIndex) {
       worldInfo.classList.add("active");
       modalSidebar.classList.remove("open");
     } else {
       worldInfo.classList.remove("active");
     }
   });
 }

 const modalMenuBtn = document.querySelector("button.modal-menu");
 const modalSidebar = document.querySelector(".modal-sidebar");
 modalMenuBtn.addEventListener("click", () => {
   modalSidebar.classList.toggle("open");
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
      } else {
        itemDisplay(filterBtn.dataset.filter);
      }
    } else {
      itemDisplay(filterBtn.dataset.filter);
    }
  });
});

function filterBtnsSet(thisBtn) {
  //Clear active
  filterBtns.forEach((filterBtn) => {
    filterBtn.classList.remove("active");
  });

  //Set active
  thisBtn.classList.add("active");
}

function itemDisplay(filter) {
  // All
  if (filter === "*") {
    items.forEach((item) => {
      item.classList.remove("hide");
      item.querySelector(".item-filter").style.display = "block";
    });
  } else {
    items.forEach((item) => {
      item.querySelector(".item-filter").style.display = "none";
      if (item.classList.contains(filter)) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  }
}

//---【Index__news-section】 ---
const indexNewsBtns = document.querySelectorAll("#indexNews ul.nav li");
const indexNewsContents = document.querySelectorAll("#indexNews ul.news-in-tab");
function indexNewsBtnSet(btn) {
  //Clear active
  indexNewsBtns.forEach((btn) => {
    btn.classList.remove("active");
  });

  //Set active
  btn.classList.add("active");
}

function indexNewsContentSet(name){
   indexNewsContents.forEach((content)=>{
    if(content.getAttribute('data-name') == name){
      //Set active
      content.classList.add('active')
    }else{
        //Clear active
      content.classList.remove('active')
    }   
  })

}

indexNewsBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    indexNewsBtnSet(btn)
    indexNewsContentSet(btn.getAttribute('data-filter'))
  });
});



//---【Shop__】 ---
const shopPageContent = document.querySelector(".shop-page-content");
const shopPageItems = document.querySelector(".items-main .items");

function shopDisplay(filter) {
  if (filter === "shop-page-content") {
    shopPageContent.classList.remove("display-none");
    shopPageItems.classList.add("display-none");
  } else {
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
