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
        `;

    postElement.classList.add("post");
    postElement.innerHTML = elementString;

    this.makeCloseButton(postElement);
    this.attachPostsElement(postElement);
  }

  attachPostsElement(postElement) {
    this.postsElement.appendChild(postElement);
  }

  makeCloseButton(postElement) {
    const listenCloseButtonEvent = () => {
      closeButtonElement.addEventListener("click", (event) => {
        const targetPostElement = closeButtonElement.parentElement;

        closeButtonElement.classList.remove("active");

        const snackbar = new Snackbar(targetPostElement);
        snackbar.makeSnackbar();

        this.postsElement.removeChild(targetPostElement);
      });
    };

    const listenMouseEvent = (postElement) => {
      postElement.addEventListener("mouseenter", (event) => {
        closeButtonElement.classList.add("active");
      });

      postElement.addEventListener("mouseleave", (event) => {
        closeButtonElement.classList.remove("active");
      });
    };

    const closeButtonElement = postElement.querySelector(".close-button");
    listenMouseEvent(postElement);
    listenCloseButtonEvent();
  }
}
