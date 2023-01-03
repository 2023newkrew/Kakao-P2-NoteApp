import notesIconImg from "../../assets/notes.svg";
import reminderIconImg from "../../assets/reminder.png";
import settingIconImg from "../../assets/settings.svg";

const $notesIcon = document.querySelector(".notes-icon");
const $reminderIcon = document.querySelector(".reminder-icon");
const $settingIcon = document.querySelector(".settings-icon");

const setIconImg = () => {
    $notesIcon.src = notesIconImg;
    $reminderIcon.src = reminderIconImg;
    $settingIcon.src = settingIconImg;
};

export default function setNav() {
    setIconImg();
}
