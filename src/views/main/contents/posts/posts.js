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
const handleDragStartPosts = (event) => {
    event.target.classList.add("dragging");
};
const handleDragEndPosts = (event) => {
    event.target.classList.remove("dragging");
};
const handleDragOverPosts = (event) => {
    event.preventDefault();
    const postList = $posts.querySelectorAll(".post:not(.dragging,#mockup)");
    const $draggingElement = $posts.querySelector(".dragging");
    const draggingElementInfo = $draggingElement.getBoundingClientRect();
    if (
        event.clientX >= draggingElementInfo.left &&
        event.clientX <= draggingElementInfo.right &&
        event.clientY >= draggingElementInfo.top &&
        event.clientY <= draggingElementInfo.bottom
    ) {
        return;
    }

    let $closest = null;
    let minDistance = Number.MAX_SAFE_INTEGER;

    for (let $post of postList) {
        const postInfo = $post.getBoundingClientRect();
        const distance = Math.floor(
            Math.sqrt(
                Math.pow(
                    event.clientX - (postInfo.left + postInfo.width / 2),
                    2
                ) +
                    Math.pow(
                        event.clientY - (postInfo.top + postInfo.height / 2),
                        2
                    )
            )
        );
        if (minDistance > distance) {
            $closest = $post;
            minDistance = distance;
        }
    }

    if ($closest === null) {
        //
    } else {
        $posts.insertBefore($draggingElement, $closest);
    }
};
const attachEventHandler = () => {
    $posts.addEventListener("click", handleClickPosts);
    $posts.addEventListener("dragstart", handleDragStartPosts);
    $posts.addEventListener("dragend", handleDragEndPosts);
    $posts.addEventListener("dragover", handleDragOverPosts);
};
export default function setPosts() {
    attachEventHandler();
}
