import { loadData, saveData } from "@/scripts/utils/localStorage";
import { HIDES_ASIDE, LIST_VIEW, GRID_VIEW } from "@/scripts/constants";

function initToggleAsideButton() {
  const toggleAsideButtonEl = document.body.querySelector(".nav__button--toggle-aside");
  const asideClassList = document.body.querySelector(".aside").classList;
  const hidesAside = !!loadData(HIDES_ASIDE);

  if (hidesAside) asideClassList.add(HIDES_ASIDE);

  toggleAsideButtonEl.addEventListener("click", () => {
    asideClassList.toggle(HIDES_ASIDE);
    saveData({ key: HIDES_ASIDE, data: asideClassList.contains(HIDES_ASIDE) });
  });
}

function initToggleViewButton() {
  const toggleViewButtonEl = document.body.querySelector(".nav__button--toggle-view");
  const toggleViewButtonClassList = toggleViewButtonEl.classList;
  const memosClassList = document.body.querySelector(".memos").classList;
  const listView = !!loadData(LIST_VIEW);

  toggleViewButtonClassList.add(listView ? LIST_VIEW : GRID_VIEW);
  memosClassList.add(listView ? LIST_VIEW : GRID_VIEW);

  toggleViewButtonEl.addEventListener("click", () => {
    [LIST_VIEW, GRID_VIEW].forEach((className) => {
      toggleViewButtonClassList.toggle(className);
      memosClassList.toggle(className);
    });
    saveData({ key: LIST_VIEW, data: memosClassList.contains(LIST_VIEW) });
  });
}

export function initHeader() {
  initToggleAsideButton();
  initToggleViewButton();
}
