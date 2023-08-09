(function () {
  const header = document.querySelector(".header");
  const close = document.querySelector(".menu__close");
  window.onscroll = () => {
    if (window.pageYOffset > 60) {
      header.classList.add("header__active");
      close.style.top = "25px";
    } else {
      header.classList.remove("header__active");
      close.style.top = "75px";
    }
  };
})();

(function () {
  const btn = document.querySelector(".header__menu");
  const menu = document.querySelector(".menu");
  const close = document.querySelector(".menu__close");
  btn.addEventListener("click", function () {
    menu.style.transform = "translateX(0)";
    menu.style.opacity = "1";
  });
  close.addEventListener("click", function () {
    menu.style.transform = "translateX(100%)";
    menu.style.opacity = "0";
  });
})();

// (function () {
//   const close = document.querySelector(".popup__close");
//   const popup = document.querySelector(".popup");
//   const open = document.querySelectorAll(".ingredients__item-but");
//   close.addEventListener("click", function () {
//     popup.style.display = "none";
//   });
//   for (let elem of open) {
//     elem.addEventListener("click", function () {
//       popup.style.display = "block";
//     });
//   }
// })();

(function () {
  const popuButOpen = document.querySelectorAll(".popup__open");
  const body = document.querySelector("body");
  const lockPadding = document.querySelectorAll(".lock__padding");

  let unlock = true;

  const timeout = 800;

  for (let but of popuButOpen) {
    but.addEventListener("click", function (event) {
      const target = event.target;
      const popupName = target.getAttribute("data-id");
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
    });
  }

  const popupCloseBtn = document.querySelectorAll(".popup__close");
  for (let but of popupCloseBtn) {
    but.addEventListener("click", function (event) {
      popupClose(this.closest(".popup")); //  !!!!
    });
  }

  function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
      const popupActive = document.querySelector(".popup.open");
      if (popupActive) {
        popupClose(popupActive);
      } else {
        bodyLock();
      }
      curentPopup.classList.add("open");
      curentPopup.addEventListener("click", function (event) {
        if (!event.target.closest(".popup__body")) {
          popupClose(event.target.closest(".popup"));
        }
      });
    }
  }

  function bodyLock() {
    const lockPaddingValue =
      window.innerWidth -
      document.querySelector(".lock__wrapper").offsetWidth +
      "px";

    for (let elem of lockPadding) {
      elem.style.paddingRight = lockPaddingValue;
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add("lock");

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove("open");
      if (doUnlock) {
        setTimeout(function () {
          for (let elem of lockPadding) {
            elem.style.paddingRight = "0px";
          }

          body.style.paddingRight = "0px";
          body.classList.remove("lock");
        }, timeout);
        setTimeout(function () {
          unlock = true;
        }, timeout);
      }
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.which === 27) {
      const popupActive = document.querySelector(".popup.open");
      popupClose(popupActive);
    }
  });
})();

// popupClose(this.closest(".popup")); //  !!!!
