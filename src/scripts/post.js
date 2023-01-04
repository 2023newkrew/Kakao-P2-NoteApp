import Snackbar from "./snackbar";

export default class Post {
    constructor() {
        this.postsElement = document.body.querySelector(".posts");
        this.snackBar = new Snackbar();
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
                const siblingTargetPostElement = targetPostElement.nextSibling;

                this.postsElement.classList.remove("active");
                this.postsElement.removeChild(targetPostElement);

                const snackbar = new Snackbar();
                snackbar.makeSnackbar();
            }.bind(this))
        }
    }
}