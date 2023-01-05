import { createMemoEl } from "./memo";

function addMemo(memo) {
  const inputEl = document.body.querySelector(".input");
  const memos = JSON.parse(localStorage.getItem("memos")) || {};
  const id = Date.now();

  inputEl.insertAdjacentElement("beforebegin", createMemoEl({ id, memo }));
  memos[id] = memo;
  localStorage.setItem("memos", JSON.stringify(memos));
}

export function initInput() {
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
