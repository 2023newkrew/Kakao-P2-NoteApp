const $hamburgerButton = document.querySelector(".hamburger-button");
const $listButton = document.querySelector(".list-button");
const $nav = document.querySelector("nav");
const $posts = document.querySelector(".posts");

const handleClickHamburgerButton = (event) => {
    $nav.classList.toggle("hidden");
};

const handleClickListButton = (event) => {
    $posts.classList.toggle("list-active");
    const postList = $posts.querySelectorAll(".post");
    postList.forEach((post) => {
        post.classList.toggle("list-item-active");
    });
};

const attachEventHandler = () => {
    $hamburgerButton.addEventListener("click", handleClickHamburgerButton);
    $listButton.addEventListener("click", handleClickListButton);
};
export default function setHeader() {
    attachEventHandler();
}
