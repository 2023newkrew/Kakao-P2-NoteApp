import Component from "./Component";

export default class Notes extends Component {
  template() {
    const notes = this.$props.noteTexts;
    return `
      ${notes.map(
        (note) => `<li class="note">
        <span class="note__content">${note}</span>
      </li>`
      )}
    `;
  }
}
