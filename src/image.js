import sidebarImg from "@/assets/menu.png";
import logoImg from "@/assets/logo.png";
import userImg from "@/assets/user.png";
import notesImg from "@/assets/notes.svg";
import reminderImg from "@/assets/reminder.png";
import settingsImg from "@/assets/settings.svg";

export default function importImages() {
  const sidebarButton = document.querySelector(".sidebar-button");
  sidebarButton.src = sidebarImg;

  const logoButton = document.querySelector(".logo-button");
  logoButton.src = logoImg;

  const userButton = document.querySelector(".user-button");
  userButton.src = userImg;

  const notesButton = document.querySelector(".menu__icon.menu--notes");
  notesButton.src = notesImg;

  const reminderButton = document.querySelector(".menu__icon.menu--reminder");
  reminderButton.src = reminderImg;

  const settingsButton = document.querySelector(".menu__icon.menu--settings");
  settingsButton.src = settingsImg;
}
