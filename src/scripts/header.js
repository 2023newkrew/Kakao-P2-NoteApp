import { toggleDataAttribute } from "./utils/dom";
import { HIDDEN, HIDDEN_ASIDE, LIST_VIEW } from "./constants";

function initToggleAsideButton() {
  const toggleAsideButtonEl = document.body.querySelector(".nav__button--toggle-aside");
  const asideEl = document.body.querySelector(".aside");
  const hiddenAside = JSON.parse(localStorage.getItem(HIDDEN_ASIDE));

  asideEl.dataset[HIDDEN] = hiddenAside;

  toggleAsideButtonEl.addEventListener("click", () => {
    toggleDataAttribute({ el: asideEl, attributeName: "hidden" });
    localStorage.setItem(HIDDEN_ASIDE, asideEl.dataset[HIDDEN]);
  });
}

function initToggleViewButton() {
  const toggleViewButtonEl = document.body.querySelector(".nav__button--toggle-view");
  const listViewImgEl = toggleViewButtonEl.querySelector(".nav__img--list-view");
  const gridViewImgEl = toggleViewButtonEl.querySelector(".nav__img--grid-view");
  const memosEl = document.body.querySelector(".memos");
  const listView = JSON.parse(localStorage.getItem(LIST_VIEW));

  listViewImgEl.dataset[HIDDEN] = listView;
  gridViewImgEl.dataset[HIDDEN] = !listView;
  memosEl.dataset[LIST_VIEW] = listView;

  toggleViewButtonEl.addEventListener("click", () => {
    toggleDataAttribute({ el: listViewImgEl, attributeName: "hidden" });
    toggleDataAttribute({ el: gridViewImgEl, attributeName: "hidden" });
    toggleDataAttribute({ el: memosEl, attributeName: "listView" });
    localStorage.setItem(LIST_VIEW, memosEl.dataset[LIST_VIEW]);
  });
}

export function initHeader() {
  initToggleAsideButton();
  initToggleViewButton();
}
