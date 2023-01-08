import { Component } from "@/components/common";

export default class Snackbar extends Component {
  setup() {
    this.$state = { text: "" };
  }
  template() {
    return `
    <div id="snackbar__text">${this.$state.text}</div>
    `;
  }

  showSnackbar = (text) => {
    this.setState({ text: text });
    this.$target.classList.add("show");
    setTimeout(() => {
      this.$target.classList.remove("show");
    }, 3000);
  };
}
