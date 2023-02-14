import { Component } from "@/components/common";

import notesImg from "@/assets/notes.svg";
import reminderImg from "@/assets/reminder.png";
import settingsImg from "@/assets/settings.svg";

export default class Sidebar extends Component {
  template() {
    return `
    <ul id="sidebar__menu-list">
      <li class="sidebar__menu">
        <a class="menu__wrapper">
          <img 
            class="menu__icon menu--notes" 
            src="${notesImg}" 
            alt="notes menu" 
          />
          <span class="menu_text">Notes</span>
        </a>
      </li>
      <li class="sidebar__menu">
        <a class="menu__wrapper">
          <img
            class="menu__icon menu--reminder"
            src="${reminderImg}"
            alt="reminder menu"
          />
          <span class="menu_text">Reminder</span>
        </a>
      </li>
      <li class="sidebar__menu">
        <a class="menu__wrapper">
          <img
            class="menu__icon menu--settings"
            src="${settingsImg}"
            alt="settings menu"
          />
          <span class="menu_text">Settings</span>
        </a>
      </li>
    </ul>
    `;
  }
}
