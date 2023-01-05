import { createElementFromHtml } from "./utils/dom";

export function createMemoEl({ id, memo }) {
  return createElementFromHtml(`<article class="memo" data-id="${id}">
  <div class="memo__text">
    ${memo}
  </div>
  <div class="memo__buttons">
    <button class="memo__button memo__button--delete">삭제하기</button>
  </div>
</artice>`);
}

function removeMemo(id) {
  const memos = JSON.parse(localStorage.getItem("memos")) || {};

  delete memos[id];
  localStorage.setItem("memos", JSON.stringify(memos));
}

export function initMemo() {
  const memosEl = document.body.querySelector(".memos");
  const inputEl = document.body.querySelector(".input");
  const memos = JSON.parse(localStorage.getItem("memos")) || {};

  Object.entries(memos).forEach(([id, memo]) => {
    inputEl.insertAdjacentElement("beforebegin", createMemoEl({ id, memo }));
  });

  memosEl.addEventListener("click", (event) => {
    if (!event.target.classList.contains("memo__button--delete")) return;

    const memoEl = event.target.closest(".memo");
    const id = memoEl.dataset.id;

    memoEl.remove();
    removeMemo(id);
  });
}
