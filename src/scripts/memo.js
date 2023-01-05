import { createElementFromHtml } from "@/scripts/utils/dom";
import { loadData, saveData } from "@/scripts/utils/localStorage";
import { MEMOS } from "@/scripts/constants";

function createMemoEl({ id, memo }) {
  return createElementFromHtml(`<article class="memo" data-id="${id}">
  <div class="memo__text">${memo}</div>
  <div class="memo__buttons">
    <button class="memo__button memo__button--delete">삭제하기</button>
  </div>
</artice>`);
}

function insertMemoEl({ id, memo }) {
  const inputEl = document.body.querySelector(".input");

  inputEl.insertAdjacentElement("beforebegin", createMemoEl({ id, memo }));
}

function loadMemos() {
  return loadData(MEMOS) || {};
}

function saveMemo({ id, memo }) {
  const memos = loadMemos();

  memos[id] = memo;
  saveData({ key: MEMOS, data: memos });
}

function deleteMemo(id) {
  const memos = loadMemos();

  delete memos[id];
  saveData({ key: MEMOS, data: memos });
}

function handleAddMemo(memo) {
  const id = Date.now();

  insertMemoEl({ id, memo });
  saveMemo({ id, memo });
}

function handleRemoveMemo(memoEl) {
  const id = memoEl.dataset.id;

  memoEl.remove();
  deleteMemo(id);
}

function initMemos() {
  const memosEl = document.body.querySelector(".memos");
  const memos = loadMemos();

  Object.entries(memos).forEach(([id, memo]) => {
    insertMemoEl({ id, memo });
  });

  memosEl.addEventListener("click", (event) => {
    if (!event.target.classList.contains("memo__button--delete")) return;

    const memoEl = event.target.closest(".memo");

    handleRemoveMemo(memoEl);
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

    handleAddMemo(event.target.value);

    event.target.value = "";
    currentLengthEl.innerText = 0;
  });
}

export function initMemo() {
  initMemos();
  initInput();
}
