// import 경로 절대로 변경
import Component from "@/component/Component"; // component 위치 변경
export default class Sidebar extends Component {
  template() {
    return `
    <ul class="sidebar__menu-list">
      <li class="sidebar__menu">
        <a class="menu__wrapper">
          <img class="menu__icon menu--notes" src="" alt="notes menu" />
          <span class="menu_text">Notes</span>
        </a>
      </li>
      <li class="sidebar__menu">
        <a class="menu__wrapper">
          <img
            class="menu__icon menu--reminder"
            src=""
            alt="reminder menu"
          />
          <span class="menu_text">Reminder</span>
        </a>
      </li>
      <li class="sidebar__menu">
        <a class="menu__wrapper">
          <img
            class="menu__icon menu--settings"
            src=""
            alt="settings menu"
          />
          <span class="menu_text">Settings</span>
        </a>
      </li>
    </ul>
    `;
  }
}
