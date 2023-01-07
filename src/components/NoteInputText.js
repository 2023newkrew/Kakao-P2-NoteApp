import Component from "@/components/Component";
export default class NoteInput extends Component {
  setup() {}
  template() {
    return `<span>${this.$props.textSize} / 200</span>`;
  }
}
