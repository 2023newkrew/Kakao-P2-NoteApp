// import 경로 절대로 변경
import Component from "./Component"; // component 위치 변경
import NoteInput from "./NoteInput";
import Notes from "./Notes";

export default class NoteContainer extends Component {
  setup() {
    this.$state = { noteTexts: ["test", "test"] };
    console.log(this.addNoteText);
  }
  template() {
    return `<div class="note-input__wrapper"></div>
        <ul class="notes"></ul>
    `;
  }
  mounted() {
    const noteInputWrapperEl = document.querySelector(".note-input__wrapper");
    const notesEl = document.querySelector(".notes");
    new NoteInput(noteInputWrapperEl, {
      addNoteText: this.addNoteText.bind(this),
    });
    new Notes(notesEl, { noteTexts: this.$state.noteTexts });
  }

  addNoteText(text) {
    console.log(this);
    const newNoteTexts = this.$state.noteTexts.concat(text);

    this.setState({ noteTexts: newNoteTexts });
  }
}
