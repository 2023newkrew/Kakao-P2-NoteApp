import { Component } from "@/components/common";
import { NoteInput, Notes } from "@/components";

export default class NoteContainer extends Component {
  setup() {
    this.$state = { noteTexts: ["test 노트 입니다~!"] };
  }
  template() {
    return `<div id="note-input__wrapper"></div>
        <ul id="notes"></ul>
    `;
  }
  mounted() {
    const noteInputWrapperEl = this.$target.querySelector(
      "#note-input__wrapper"
    );
    const notesEl = this.$target.querySelector("#notes");
    new NoteInput(noteInputWrapperEl, {
      addNoteText: this.addNoteText.bind(this),
    });
    new Notes(notesEl, { noteTexts: this.$state.noteTexts });
  }

  addNoteText(text) {
    const newNoteTexts = this.$state.noteTexts.concat(text);
    this.$props.snackbar.showSnackbar("노트를 추가했습니다.");
    this.setState({ noteTexts: newNoteTexts });
  }
}
