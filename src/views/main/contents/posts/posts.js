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
const isHover = (elementInfo, mouseX, mouseY) => {
    return (
        mouseX >= elementInfo.left &&
        mouseX <= elementInfo.right &&
        mouseY >= elementInfo.top &&
        mouseY <= elementInfo.bottom
    );
};
const handleDragEndPosts = (event) => {
    const postExceptDraggingList = $posts.querySelectorAll(
        ".post:not(.dragging,#mockup)"
    );
    const $draggingElement = $posts.querySelector(".dragging");
    const draggingElementInfo = $draggingElement.getBoundingClientRect();

    event.target.classList.remove("dragging");

    if (isHover(draggingElementInfo, event.clientX, event.clientY)) return;

    let $closest = null;
    let closestInfo = null;
    let minDistance = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < postExceptDraggingList.length; i++) {
        const $post = postExceptDraggingList[i];
        const postInfo = $post.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(event.clientX - (postInfo.left + postInfo.width / 2), 2) +
                Math.pow(
                    event.clientY - (postInfo.top + postInfo.height / 2),
                    2
                )
        );
        if (minDistance > distance) {
            $closest = $post;
            closestInfo = postInfo;
            minDistance = distance;
        }
    }

    if ($closest === null) return;
    if (!isHover(closestInfo, event.clientX, event.clientY)) return;

    const $draggingElementClone = $draggingElement.cloneNode(true);
    const $closestClone = $closest.cloneNode(true);

    $posts.replaceChild($draggingElementClone, $closest);
    $posts.replaceChild($closestClone, $draggingElement);
    console.log($closestClone.classList);
    $closestClone.querySelector("textarea").classList.remove("drag-hover");
    console.log($closestClone.classList);
};

const handleDragOverPosts = (event) => {
    event.preventDefault();
};

const handleDragEnterPosts = (event) => {
    if (event.target.tagName === "TEXTAREA")
        event.target.classList.add("drag-hover");
};
const handleDragLeavePosts = (event) => {
    if (event.target.tagName === "TEXTAREA")
        event.target.classList.remove("drag-hover");
};

const attachEventHandler = () => {
    $posts.addEventListener("click", handleClickPosts);
    $posts.addEventListener("dragstart", handleDragStartPosts);
    $posts.addEventListener("dragend", handleDragEndPosts);
    $posts.addEventListener("dragover", handleDragOverPosts);
    $posts.addEventListener("dragenter", handleDragEnterPosts);
    $posts.addEventListener("dragleave", handleDragLeavePosts);
};
export default function setPosts() {
    attachEventHandler();
}
