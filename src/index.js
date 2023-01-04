import "./styles/index.scss"

// 이미지 로드

import gridImage from "./assets/grid.svg"
import listImage from "./assets/list.svg"
import logoImage from "./assets/logo.svg"
import menuImage from "./assets/menu.svg"
import notesImage from "./assets/notes.svg"
import reminderImage from "./assets/reminder.svg"
import settingsImage from "./assets/settings.svg"
import userImage from "./assets/user.svg"

// 이미지 로드

import 'suneditor/src/assets/css/suneditor.css'
import suneditor from 'suneditor'

import plugins from 'suneditor/src/plugins'

const sunEditor = suneditor.create('text-area', {
    plugins: plugins,
    buttonList: [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
    ],
    value: "",
    maxCharCount: 200,
    className: "sun-editor",
    width: "100%",
    defaultTag: "div"
})

const textAreaElement = document.body.querySelector(".sun-editor");

textAreaElement.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const textarea = event.target;
        const text = textarea.innerHTML;

        if (text !== "") {
            const postsElement = document.body.querySelector(".posts");
            const postElement = document.createElement("div");

            postElement.innerHTML = text;
            postElement.classList.add("post");
            postsElement.appendChild(postElement);
        }

        sunEditor.setContents("");
    }
});

const menuButtonElement = document.body.querySelector(".menu-button");

menuButtonElement.addEventListener("click", function (event) {
    const sideMenuElement = document.body.querySelector(".side-menu");
    sideMenuElement.classList.toggle("active");
})

const listButtonElement = document.body.querySelector(".list-button");

listButtonElement.addEventListener("click", function (event) {
    const postsElement = document.body.querySelector(".posts");
    postsElement.classList.toggle("list");
    console.log("listButton Click")
})