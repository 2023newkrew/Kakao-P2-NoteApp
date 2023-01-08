import { createElementFromHtml } from "@/scripts/utils/dom";
import { snackbar } from "@/scripts/utils/snackbar";
import { loadData, saveData } from "@/scripts/utils/localStorage";
import { MEMOS, TEMP_MEMO } from "@/scripts/constants";

function createMemoEl({ id, memo }) {
  return createElementFromHtml(`<article class="memo" data-id="${id}">
  <div class="memo__text">${memo}</div>
  <div class="memo__buttons">
    <button class="memo__button memo__button--delete">삭제하기</button>
  </div>
</artice>`);
}

function insertMemoEl({ id, memo }) {
  const editorEl = document.body.querySelector(".editor");

  editorEl.insertAdjacentElement("beforebegin", createMemoEl({ id, memo }));
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
  snackbar.pushSnackbar("메모가 추가되었습니다.");
}

function handleRemoveMemo(memoEl) {
  const id = memoEl.dataset.id;

  memoEl.remove();
  deleteMemo(id);
  snackbar.pushSnackbar("메모가 삭제되었습니다.");
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

function initEditor() {
  const textareaEl = document.body.querySelector(".editor__textarea");
  const currentLengthEl = document.body.querySelector(".editor__current-length");

  textareaEl.value = loadData(TEMP_MEMO) ?? "";

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

  window.addEventListener("beforeunload", () => {
    saveData({ key: TEMP_MEMO, data: textareaEl.value });
  });
}

export function initMemo() {
  initMemos();
  initEditor();
}
