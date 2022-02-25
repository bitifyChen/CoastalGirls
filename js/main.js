//============通用===========

//【Nav】-導覽列縮放與相關
const menuBtn = document.querySelector("nav > button.menu");
const menu = document.querySelector("nav");
menuBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
  menu.classList.add("no-top");
  document.body.classList.toggle("lock-scroll");
});

const body = document.querySelector('body')
body.addEventListener("scroll", function () {
  let bodyScroll = body.scrollTop
  if (bodyScroll < 50) {
    menu.classList.remove("no-top");
  } else {
    menu.classList.add("no-top");
  }
});

//【Nav】-m-導覽列縮放與相關
const dropDownBtns = document.querySelectorAll("nav li.dropdown > input[type='checkbox']");
dropDownBtns.forEach((dropDownBtn) => {
  dropDownBtn.addEventListener("click", () => {
    dropDownBtn.parentNode.classList.toggle("open");
  });
});

//【Modal】-Lightbox 用於彈出視窗
const modalCloseBtns = document.querySelectorAll("button.modal-close");
const modalOpenBtns = document.querySelectorAll(".modal-open");
const modalOpenDivs = document.querySelectorAll("div.modal-open");
const modals = document.querySelectorAll("section.modal");
//--【關閉】由關閉按鈕 關閉所有名稱modal
modalCloseBtns.forEach((modalCloseBtn) => {
  modalCloseBtn.addEventListener("click", () => {
    modals.forEach((modal) => {
      modal.classList.remove("open");
    });
    document.body.classList.remove("lock-scroll");
    stopAllYouTubeVideos();
  });
});
//--由Btn 開啟對應名稱modal
modalOpenBtns.forEach((modalOpenBtn) => {
  modalOpenBtn.addEventListener("click", () => {
    const modalName = modalOpenBtn.attributes["data-name"].value;
    document.querySelector("section.modal[data-name='" + modalName + "']").classList.add("open");
    document.body.classList.toggle("lock-scroll");
  });
});

//--由Div 開啟對應名稱modal
modalOpenDivs.forEach((modalOpenDiv) => {
  modalOpenDiv.addEventListener("click", () => {
    const modalName = modalOpenDiv.attributes["data-name"].value;
    document.querySelector("section.modal[data-name='" + modalName + "']").classList.add("open");
    document.body.classList.toggle("lock-scroll");
  });
});

//--【關閉】如點擊黑色部分關閉視窗
modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    const clickModal = e.target.classList.contains("modal");
    if (clickModal) {
      modal.classList.remove("open");
      document.body.classList.remove("lock-scroll");
      stopAllYouTubeVideos();
    }
  });
});
//--暫停撥放功能 stopAllYouTubeVideos();
/**iframe網址限用youtube，並且要在url後方加上 ?enablejsapi=1 **/
var stopAllYouTubeVideos = () => { 
  var iframes = document.querySelectorAll('iframe');
  Array.prototype.forEach.call(iframes, iframe => { 
    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', 
  func: 'pauseVideo' }), '*');
 });
}


//【分類按鈕】-全站分類按鈕
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
      } else if (filterBtn.dataset.page === "album") {
        figureDisplay(filterBtn.dataset.filter);
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


//============世界===========
//【世界】-調整Modal開啟之內容，由Sidebar決定顯示哪個對應內容
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
if (modalMenuBtn) {
  modalMenuBtn.addEventListener("click", () => {
    modalSidebar.classList.toggle("open");
  });
}

//============畫廊===========
//【畫廊】-圖片依照分類顯示與隱藏
const figures = document.querySelectorAll(".figures figure");
function figureDisplay(filter) {
  // All
  if (filter === "*") {
    figures.forEach((item) => {
      item.classList.remove("hide");
      item.querySelector(".figure-filter").style.display = "block";
    });
  } else {
    figures.forEach((item) => {
      item.querySelector(".figure-filter").style.display = "none";
      if (item.classList.contains(filter)) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  }
}


//============首頁===========
// 【新聞區段】-依照點選之分類，顯示其分類。
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

function indexNewsContentSet(name) {
  indexNewsContents.forEach((content) => {
    if (content.getAttribute("data-name") == name) {
      //Set active
      content.classList.add("active");
    } else {
      //Clear active
      content.classList.remove("active");
    }
  });
}

indexNewsBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    indexNewsBtnSet(btn);
    indexNewsContentSet(btn.getAttribute("data-filter"));
  });
});

//============商店===========
//【商店敘述】-顯示商店敘述區塊與商品列表之調整
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
