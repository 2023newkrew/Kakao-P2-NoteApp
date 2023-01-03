import sidebarImg from "@/assets/menu.png";
import logoImg from "@/assets/logo.png";
import toggleGridImg from "@/assets/grid.png";
import toggleListImg from "@/assets/list.png";
import userImg from "@/assets/user.png";
import notesImg from "@/assets/notes.svg";
import reminderImg from "@/assets/reminder.png";
import settingsImg from "@/assets/settings.svg";

const sidebarButton = document.querySelector(".sidebar-button");
sidebarButton.src = sidebarImg;

const logoButton = document.querySelector(".logo-button");
logoButton.src = logoImg;

const toggleGridButton = document.querySelector(".note-toggle-button--grid");
toggleGridButton.src = toggleGridImg;

const toggleListButton = document.querySelector(".note-toggle-button--list");
toggleListButton.src = toggleListImg;

const userButton = document.querySelector(".user-button");
userButton.src = userImg;

const notesButton = document.querySelector(".menu__icon.menu--notes");
notesButton.src = notesImg;

const reminderButton = document.querySelector(".menu__icon.menu--reminder");
reminderButton.src = reminderImg;

const settingsButton = document.querySelector(".menu__icon.menu--settings");
settingsButton.src = settingsImg;
