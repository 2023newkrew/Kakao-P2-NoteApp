import hamburgerButtonImg from "../../assets/hamburger.png";
import listButtonImg from "../../assets/list.png";
import userButtonImg from "../../assets/user.png";

const $hamburgerButton = document.querySelector(".hamburger-button");
const $hamburgerButtonIcon = document.querySelector(".hamburger-icon");
const $listButton = document.querySelector(".list-button");
const $listButtonIcon = document.querySelector(".list-icon");
const $usesrButtonIcon = document.querySelector(".user-icon");
const $nav = document.querySelector("nav");
const $posts = document.querySelector(".posts");

const setIconImg = () => {
    $hamburgerButtonIcon.src = hamburgerButtonImg;
    $listButtonIcon.src = listButtonImg;
    $usesrButtonIcon.src = userButtonImg;
};

const onClickHamburgerButton = (event) => {
    $nav.classList.toggle("hidden");
};

const onClickListButton = (event) => {
    $posts.classList.toggle("list-active");
    const postList = $posts.querySelectorAll(".post");
    postList.forEach((post) => {
        post.classList.toggle("list-item-active");
    });
};

const attachEventHandler = () => {
    $hamburgerButton.addEventListener("click", onClickHamburgerButton);
    $listButton.addEventListener("click", onClickListButton);
};
export default function setHeader() {
    setIconImg();
    attachEventHandler();
}
