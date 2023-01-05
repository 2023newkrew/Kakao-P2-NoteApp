// import 경로 절대로 변경
import Component from "@/component/Component"; // component 위치 변경

export default class Header extends Component {
  template() {
    return `
    <nav class="header__content">
      <div class="header__buttons">
        <button class="header__sidebar-button">
          <img class="sidebar-button" src="" alt="side bar" />
        </button>
        <button class="header__logo-button">
          <img class="logo-button" src="" alt="logo" />
        </button>
      </div>
      <div class="header__buttons">
        <button class="header__note-toggle-button">
        </button>
        <button class="header__user-button">
          <img class="user-button" src="" alt="user" />
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
      target.classList.contains("header__sidebar-button") ||
      target.classList.contains("sidebar-button")
    ) {
      this.$props.sidebarEl.classList.toggle("hide");
    }
  }

  toggleNoteStyle({ target }) {
    if (target.classList.contains("header__note-toggle-button")) {
      this.$props.noteEl.classList.toggle("list");
      target.classList.toggle("list");
    }
  }
}
