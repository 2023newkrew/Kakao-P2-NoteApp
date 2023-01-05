import { createElementFromHtml } from "./utils/dom";

export function createMemoEl(memo) {
  return createElementFromHtml(`<article class="memo">${memo}</artice>`);
}

export function initMemo() {
  const inputEl = document.body.querySelector(".input");
  const memos = JSON.parse(localStorage.getItem("memos")) || {};

  Object.values(memos).forEach((memo) => {
    inputEl.insertAdjacentElement("beforebegin", createMemoEl(memo));
  });
}
