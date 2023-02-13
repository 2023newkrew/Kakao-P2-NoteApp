import { v4 as uuidv4 } from "uuid";
import { createElementFromHtml } from "@/scripts/utils/dom";

function initSnackbar() {
  const containerEl = createElementFromHtml(`<div class="snackbar-container"></div>`);
  document.body.appendChild(containerEl);

  containerEl.addEventListener("click", (event) => {
    const id = event.target.closest(".snackbar").dataset.id;
    console.log(id);
    popSnackbar(id);
  });

  function pushSnackbar(message) {
    const snackbarEl = createElementFromHtml(
      `<div class="snackbar" data-id=${uuidv4()}>${message}</div>`
    );
    containerEl.appendChild(snackbarEl);

    setTimeout(() => {
      snackbarEl.remove();
    }, 3000);
  }

  function popSnackbar(id) {
    const snackbarEl = containerEl.querySelector(`[data-id="${id}"]`);
    snackbarEl.remove();
  }

  return { pushSnackbar, popSnackbar };
}

export const snackbar = initSnackbar();
