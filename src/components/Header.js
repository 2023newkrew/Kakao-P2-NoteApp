import { Component } from "@/components/common";

import sidebarImg from "@/assets/menu.png";
import logoImg from "@/assets/logo.png";
import userImg from "@/assets/user.png";

export default class Header extends Component {
  template() {
    return `
    <nav id="header__content">
      <div class="header__buttons">
        <button id="header__sidebar-button">
          <img id="sidebar-button" src="${sidebarImg}" alt="side bar" />
        </button>
        <button id="header__logo-button">
          <img id="logo-button" src="${logoImg}" alt="logo" />
        </button>
      </div>
      <div class="header__buttons">
        <button id="header__note-toggle-button">
        </button>
        <button id="header__user-button">
          <img id="user-button" src="${userImg}" alt="user" />
        </button>
      </div>
    </nav>
    `;
  }
  setEvent() {
    this.$target.addEventListener("click", this.toggleSidebar.bind(this));
    this.$target.addEventListener("click", this.toggleNoteStyle.bind(this));
  }

  toggleSidebar({ target }) {
    if (
      target.id === "header__sidebar-button" ||
      target.id === "sidebar-button"
    ) {
      this.$props.sidebarEl.classList.toggle("hide");
    }
  }

  toggleNoteStyle({ target }) {
    if (target.id === "header__note-toggle-button") {
      this.$props.noteEl.classList.toggle("list");
      target.classList.toggle("list");
    }
  }
}
