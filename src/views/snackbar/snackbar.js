const $snackBar = document.querySelector(".snackbar");
const $delButton = $snackBar.querySelector(".snackbar__delete-button");
const $undoButton = $snackBar.querySelector(".snackbar__undo-button");
const $undoCount = $snackBar.querySelector(".snackbar__undo-count");
const $closeButton = $snackBar.querySelector(".snackbar__close-button");
const $posts = document.body.querySelector(".posts");

const delStack = [];

const setUndoCount = () => {
    $undoCount.innerText = delStack.length;
};

const handleClickUndoButton = (event) => {
    event.stopPropagation();

    if (delStack.length === 0) return;

    $posts.appendChild(delStack.pop());
    setUndoCount();
};

const handleClickDelButton = (event) => {
    event.stopPropagation();
    const clickedPostIndex = $snackBar.dataset.clicked;
    const postList = $posts.querySelectorAll(".post");

    const target = postList[clickedPostIndex];
    $posts.removeChild(target);
    delStack.push(target);

    $snackBar.dataset.clicked = -1;
    setUndoCount();
};

const attachEventHandler = () => {
    $delButton.addEventListener("click", handleClickDelButton);
    $undoButton.addEventListener("click", handleClickUndoButton);
};

export default function setSnackbar() {
    attachEventHandler();
    setUndoCount();
}
