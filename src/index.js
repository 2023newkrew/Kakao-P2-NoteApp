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
import closeImage from "./assets/close.svg"

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
            const elementString = `
                <div class="close-button">
                    <img src="../assets/close.svg" alt="close"/>
                </div>
                ${text}
            `

            postElement.classList.add("post");
            postElement.innerHTML = elementString;

            const closeButtonElement = postElement.querySelector('.close-button');

            postElement.addEventListener("mouseenter", function (event) {
                closeButtonElement.classList.add("active");
            })

            postElement.addEventListener("mouseleave", function (event) {
                closeButtonElement.classList.remove("active");
            })

            closeButtonElement.addEventListener("click", function (event) {
                const targetPostElement = closeButtonElement.parentElement;
                postsElement.removeChild(targetPostElement);
            })

            postsElement.appendChild(postElement);
        }

        sunEditor.setContents("");
        event.preventDefault();
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
})
