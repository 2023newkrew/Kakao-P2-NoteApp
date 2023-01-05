import Component from "@/component/Component";
export default class NoteInputText extends Component {
  setup() {}
  template() {
    return `<span>${this.$props.textSize} / 200</span>`;
  }
}
