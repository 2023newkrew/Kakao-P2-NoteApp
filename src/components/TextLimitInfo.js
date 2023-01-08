import Component from "@/components/Component";
export default class TextLimitInfo extends Component {
  template() {
    return `<span id="note-input__limit-counter">
    ${Math.min(this.$props.curSize, this.$props.maxSize)} 
    / ${this.$props.maxSize}
    </span>
    <span id="note-input__limit-alert"></span>`;
  }
  mounted() {
    const limitAlertEl = this.$target.querySelector("#note-input__limit-alert");

    if (this.$props.curSize > this.$props.maxSize) {
      limitAlertEl.innerHTML = ` | ${this.$props.maxSize}자 이내로 작성해주세요!`;
    } else {
      limitAlertEl.innerHTML = "";
    }
  }
}
