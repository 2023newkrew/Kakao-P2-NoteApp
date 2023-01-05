import { createElementFromHtml } from "./utils/dom";
import { loadData, saveData } from "./utils/localStorage";

function createMemoEl({ id, memo }) {
  return createElementFromHtml(`<article class="memo" data-id="${id}">
  <div class="memo__text">${memo}</div>
  <div class="memo__buttons">
    <button class="memo__button memo__button--delete">삭제하기</button>
  </div>
</artice>`);
}

function addMemo(memo) {
  const inputEl = document.body.querySelector(".input");
  const memos = loadData("memos") || {};
  const id = Date.now();

  inputEl.insertAdjacentElement("beforebegin", createMemoEl({ id, memo }));
  memos[id] = memo;
  saveData({ key: "memos", data: memos });
}

function removeMemo(id) {
  const memos = loadData("memos") || {};

  delete memos[id];
  saveData({ key: "memos", data: memos });
}

function initMemos() {
  const memosEl = document.body.querySelector(".memos");
  const inputEl = document.body.querySelector(".input");
  const memos = loadData("memos") || {};

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

function initInput() {
  const textareaEl = document.body.querySelector(".input__textarea");
  const currentLengthEl = document.body.querySelector(".input__current-length");

  textareaEl.addEventListener("input", (event) => {
    currentLengthEl.innerText = event.target.value.length;
  });

  textareaEl.addEventListener("keydown", (event) => {
    if (event.key != "Enter" || event.shiftKey || event.isComposing) return;

    event.preventDefault();
    addMemo(event.target.value);
    event.target.value = "";
    currentLengthEl.innerText = 0;
  });
}

export function initMemo() {
  initMemos();
  initInput();
}
