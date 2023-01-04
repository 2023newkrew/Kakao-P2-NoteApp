export default class Snackbar {
    constructor(targetPostElement, siblingTargetPostElement, postsElement) {
        this.contentElement = document.querySelector(".content");
        this.targetPostElement = targetPostElement;
        this.siblingTargetPostElement = siblingTargetPostElement;
        this.postsElement = postsElement;
    }

    makeSnackbar() {
        const elementString = `
            삭제한 글을 되돌리시겠습니까 ?
            <button>되돌리기</button>
        `

        const snackbarElement = document.createElement("div");
        snackbarElement.innerHTML = elementString;
        snackbarElement.classList.add("snackbar");
        snackbarElement.classList.add("show");


        const timeout = setTimeout(() => {
            this.removeSnackbar.apply(this)
        }, 3000);

        this.contentElement.appendChild(snackbarElement);
        this.listenClickEvent(snackbarElement, timeout);
    }

    removeSnackbar(timeout) {
        this.contentElement.removeChild(this.contentElement.lastElementChild);
        clearTimeout(timeout);
    }

    listenClickEvent(snackbarElement, timeout) {
        const revertButtonElement = snackbarElement.querySelector("button");

        revertButtonElement.addEventListener("click", function (event) {
            if (this.siblingTargetPostElement === null) {
                this.postsElement.appendChild(this.targetPostElement);
            }
            else if (this.siblingTargetPostElement !== null) {
                this.postsElement.insertBefore(this.targetPostElement, this.siblingTargetPostElement);
            }

            this.removeSnackbar(timeout);
        }.bind(this));
    }
}