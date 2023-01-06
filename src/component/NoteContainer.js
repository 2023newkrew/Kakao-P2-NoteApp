// import 경로 절대로 변경
import Component from "@/component/Component"; // component 위치 변경
import NoteInput from "@/component/NoteInput";
import Notes from "@/component/Notes";

export default class NoteContainer extends Component {
  setup() {
    this.$state = { noteTexts: ["test", "test"] };
    console.log(this.addNoteText);
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
