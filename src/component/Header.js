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
          <img
            class="note-toggle-button--grid"
            src=""
            alt="note toggle grid"
          />
          <img
            class="note-toggle-button--list hide"
            src=""
            alt="note toggle list"
          />
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
  }

  toggleSidebar({ target }) {
    if (target.classList.contains("header__sidebar-button")) {
      this.$props.sidebarEl.classList.toggle("hide");
    }
  }
}
