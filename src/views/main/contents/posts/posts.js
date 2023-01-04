const $posts = document.body.querySelector(".posts");
const $snackBar = document.body.querySelector(".snackbar");

const handleClickPosts = (event) => {
    $snackBar.classList.add("show");
    const postList = $posts.querySelectorAll(".post");
    const $clickedPost = event.target.closest(".post");
    /* 목업 post가 존재 하므로 1부터 시작해야함 */
    for (let i = 1; i < postList.length; i++) {
        if (postList[i] !== $clickedPost) continue;

        $snackBar.dataset.clicked = i;
        break;
    }
};
const attachEventHandler = () => {
    $posts.addEventListener("click", handleClickPosts);
};
export default function setPosts() {
    attachEventHandler();
}
