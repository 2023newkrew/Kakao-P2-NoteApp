import Snackbar from "./snackbar";

export default class Post {
    constructor() {
        this.postsElement = document.body.querySelector(".posts");
    }

    makePost(text) {
        const postElement = document.createElement("div");
        const elementString = `
        <div class="close-button">
            <img src="../assets/close.svg" alt="close"/>
        </div>
        ${text}
        `

        postElement.classList.add("post");
        postElement.innerHTML = elementString;

        return postElement;
    }

    attachPosts(postElement) {
        this.postsElement.appendChild(postElement);
    }

    makeCloseButton(postElement) {
        const listenCloseButtonEvent = () => {
            closeButtonElement.addEventListener("click", (event) => {
                const targetPostElement = closeButtonElement.parentElement;

                closeButtonElement.classList.remove("active");

                const snackbar = new Snackbar(targetPostElement);
                const snackbarElement = snackbar.makeSnackbar();
                const timeout = snackbar.setSnackbarTimeout(snackbarElement);
                snackbar.listenClickEvent(snackbarElement, timeout);

                this.postsElement.removeChild(targetPostElement);
            })
        }

        const listenMouseEvent = (postElement) => {
            postElement.addEventListener("mouseenter", function (event) {
                closeButtonElement.classList.add("active");
            })

            postElement.addEventListener("mouseleave", function (event) {
                closeButtonElement.classList.remove("active");
            })
        }

        const closeButtonElement = postElement.querySelector(".close-button");
        listenMouseEvent(postElement);
        listenCloseButtonEvent();
    }
}