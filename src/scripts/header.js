import { toggleDataAttribute } from "./utils/dom";

function initToggleAsideButton() {
  const toggleAsideButtonEl = document.body.querySelector(".nav__button--toggle-aside");
  const asideEl = document.body.querySelector(".aside");

  toggleAsideButtonEl.addEventListener("click", () => {
    toggleDataAttribute({ el: asideEl, attributeName: "hidden" });
  });
}

function initToggleViewButton() {
  const toggleViewButtonEl = document.body.querySelector(".nav__button--toggle-view");
  const listViewImgEl = toggleViewButtonEl.querySelector(".nav__img--list-view");
  const gridViewImgEl = toggleViewButtonEl.querySelector(".nav__img--grid-view");
  const memosEl = document.body.querySelector(".memos");

  toggleViewButtonEl.addEventListener("click", () => {
    toggleDataAttribute({ el: listViewImgEl, attributeName: "hidden" });
    toggleDataAttribute({ el: gridViewImgEl, attributeName: "hidden" });
    toggleDataAttribute({ el: memosEl, attributeName: "listView" });
  });
}

export function initHeader() {
  initToggleAsideButton();
  initToggleViewButton();
}
