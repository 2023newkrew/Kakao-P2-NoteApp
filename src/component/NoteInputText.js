import Component from "@/component/Component";

// 받은 props를 더 직관적으로 확인하는 방법은 없을지?
export default class NoteInputText extends Component {
  setup() {}
  template() {
    return `<span>${this.$props.textSize} / 200</span>`;
  }
}
