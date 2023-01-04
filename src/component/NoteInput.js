import Component from "./Component";

// 받은 props를 더 직관적으로 확인하는 방법은 없을지?
export default class NoteInput extends Component {
  setup() {
    this.$state = { text: "", textSize: 0 };
  }
  template() {
    return ` <input class="note-input" type="text" maxlength="200" value="${this.$state.text}" />
    <div class="note-input__info-text">${this.$state.textSize} / 200</div>
    `;
  }
  mounted() {
    const noteInputEl = this.$target.querySelector(".note-input");
    noteInputEl.focus();
    noteInputEl.value = "";
    noteInputEl.value = this.$state.text;
  }

  setEvent() {
    this.$target.addEventListener("input", this.handleOnChange.bind(this));
    this.$target.addEventListener(
      "keydown",
      this.handleOnkeydownEnter.bind(this)
    );
  }

  handleOnChange(event) {
    if (event.target.classList.contains("note-input")) {
      if (event.target.value.length < 200)
        this.setState({
          text: event.target.value,
          textSize: event.target.value.length,
        });
      else {
        alert("200!");
      }
    }
  }
  handleOnkeydownEnter(event) {
    if (event.target.classList.contains("note-input")) {
      if (event.code === "Enter") {
        this.$props.addNoteText(event.target.value);
      }
    }
  }
}
