import { TRUE } from "@/scripts/constants";

export function toggleDataAttribute({ el, attributeName }) {
  el.dataset[attributeName] = !(el.dataset[attributeName] === TRUE);
}

export function createElementFromHtml(html) {
  const template = document.createElement("template");

  template.innerHTML = html.trim();

  return template.content.firstChild;
}
