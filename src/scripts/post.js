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

        this.makeCloseButton(postElement);
        this.postsElement.appendChild(postElement);
    }

    makeCloseButton(postElement) {
        const closeButtonElement = postElement.querySelector(".close-button");
        listenMouseEvent(postElement, closeButtonElement);
        listenCloseButtonEvent.apply(this, [closeButtonElement]);

        function listenMouseEvent(postElement, closeButtonElement) {
            postElement.addEventListener("mouseenter", function (event) {
                closeButtonElement.classList.add("active");
            })

            postElement.addEventListener("mouseleave", function (event) {
                closeButtonElement.classList.remove("active");
            })
        }

        function listenCloseButtonEvent(closeButtonElement) {
            closeButtonElement.addEventListener("click", function (event) {
                const targetPostElement = closeButtonElement.parentElement;

                closeButtonElement.classList.remove("active");

                const snackbar = new Snackbar(targetPostElement);
                snackbar.makeSnackbar();

                this.postsElement.removeChild(targetPostElement);
            }.bind(this))
        }
    }
}