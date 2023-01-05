import { TRUE } from "../constants";

export function toggleDataAttribute({ el, attributeName }) {
  el.dataset[attributeName] = !(el.dataset[attributeName] === TRUE);
}
