export default class Snackbar {
    constructor(targetPostElement) {
        this.contentElement = document.body.querySelector(".content");

        this.targetPostElement = targetPostElement;
        this.siblingTargetPostElement = targetPostElement.nextSibling;
    }

    makeSnackbar() {
        const snackbarElement = document.createElement("div");
        const elementString = `
            삭제한 글을 되돌리시겠습니까 ?
            <button>되돌리기</button>
        `

        snackbarElement.innerHTML = elementString;
        snackbarElement.classList.add("snackbar", "show");

        this.contentElement.appendChild(snackbarElement);

        // * setSnackbarTimeout 실행 후 listenClickEvent 순차 실행
        this.listenClickEvent(snackbarElement, this.setSnackbarTimeout(snackbarElement));
    }

    setSnackbarTimeout(snackbarElement) {
        // * 3초 후 snackBar를 제거하는 로직 실행
        const timeout = setTimeout(() => {
            // * 자동으로 해제되는 타이머지만 코드의 일관성을 위해 timeout 변수를 삽입
            this.removeSnackbar(snackbarElement, timeout);
        }, 3000);
        return timeout;
    }

    listenClickEvent(snackbarElement, timeout) {
        const postsElement = document.body.querySelector(".posts");
        const revertButtonElement = snackbarElement.querySelector("button");

        revertButtonElement.addEventListener("click", function (event) {
            // ! siblingTargetPostElement가 null일 경우에는 가장 마지막 위치로 삽입
            postsElement.insertBefore(this.targetPostElement, this.siblingTargetPostElement);
            this.removeSnackbar(snackbarElement, timeout);
        }.bind(this));
    }

    removeSnackbar(snackbarElement, timeout) {
        this.contentElement.removeChild(snackbarElement);
        clearTimeout(timeout);
    }
}