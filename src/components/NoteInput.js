import Component from "@/components/Component";
import TextLimitInfo from "@/components/TextLimitInfo";

// 받은 props를 더 직관적으로 확인하는 방법은 없을지?
export default class NoteInput extends Component {
  setup() {
    this.$state = { maxTextLength: 200 };
  }

  template() {
    return ` <input id="note-input" type="text" autofocus />
    <div id="note-input__info-text"></div>
    `;
  }

  setEvent() {
    this.$target.addEventListener("input", this.handleOnChange.bind(this));
    this.$target.addEventListener(
      "keydown",
      this.handleOnkeydownEnter.bind(this)
    );
  }
  mounted() {
    this.setNoteInputText(0);
  }

  handleOnChange({ target }) {
    if (target.id === "note-input") {
      const text = target.value;
      const curSize = text.length;
      target.value = text.slice(0, this.$state.maxTextLength);
      this.setNoteInputText(curSize);
    }
  }
  handleOnkeydownEnter({ code, target }) {
    if (target.id === "note-input") {
      if (code === "Enter") {
        this.$props.addNoteText(target.value);
      }
    }
  }

  setNoteInputText(curSize) {
    const noteInputTextEl = this.$target.querySelector(
      "#note-input__info-text"
    );
    new TextLimitInfo(noteInputTextEl, {
      curSize: curSize,
      maxSize: this.$state.maxTextLength,
    });
  }
}
