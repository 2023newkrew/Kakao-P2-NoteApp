import { Component } from "@/components/common";

export default class Notes extends Component {
  template() {
    const notes = this.$props.noteTexts;
    return `
      ${notes
        .map(
          (note) => `<li class="note">
        <div class="note__content">${note}</div>
      </li>`
        )
        .join("")}
    `;
  }
}
