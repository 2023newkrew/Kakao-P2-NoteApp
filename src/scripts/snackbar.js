export default class Snackbar {
    constructor() {
        this.contentElement = document.querySelector(".content");
    }

    makeSnackbar() {
        const elementString = `
        <div>
            삭제한 글을 되돌리시겠습니까 ?
            <button>되돌리기</button>
        </div>
        `

        const snackbarElement = document.createElement("div");
        snackbarElement.innerHTML = elementString;
        snackbarElement.classList.add("snackbar");
        snackbarElement.classList.add("show");


        this.contentElement.appendChild(snackbarElement);

        setTimeout(() => {
            this.removeSnackbar.apply(this,)
        }, 3000);
    }

    removeSnackbar() {
        this.contentElement.removeChild(this.contentElement.lastElementChild);
    }
}