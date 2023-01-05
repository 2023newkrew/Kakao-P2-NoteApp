import { createElementFromHtml } from "@/scripts/utils/dom";

export function showSnackbar(message) {
  const snackbarEl = createElementFromHtml(`<div class="snackbar">${message}</div>`);

  document.body.appendChild(snackbarEl);

  setTimeout(() => {
    snackbarEl.remove();
  }, 3000);
}
