export default class Snackbar {
  constructor(targetPostElement) {
    this.contentElement = document.body.querySelector(".content");

    this.targetPostElement = targetPostElement;
    this.siblingTargetPostElement = targetPostElement.nextSibling;

    this.timeout = null;
  }

  makeSnackbar() {
    const snackbarElement = document.createElement("div");
    const elementString = `
            삭제한 글을 되돌리시겠습니까 ?
            <button>되돌리기</button>
        `;

    snackbarElement.innerHTML = elementString;
    snackbarElement.classList.add("snackbar", "show");

    this.contentElement.appendChild(snackbarElement);

    this.setSnackbarTimeout(snackbarElement);
    this.listenClickEvent(snackbarElement);
  }

  setSnackbarTimeout(snackbarElement) {
    // * 3초 후 snackBar를 제거하는 로직 실행
    this.timeout = setTimeout(() => {
      // * 자동으로 해제되는 타이머지만 코드의 일관성을 위해 timeout 변수를 삽입
      this.removeSnackbar(snackbarElement, this.timeout);
    }, 3000);
  }

  listenClickEvent(snackbarElement) {
    const postsElement = document.body.querySelector(".posts");
    const revertButtonElement = snackbarElement.querySelector("button");

    revertButtonElement.addEventListener("click", (event) => {
      // ! siblingTargetPostElement가 null일 경우에는 가장 마지막 위치로 삽입
      postsElement.insertBefore(this.targetPostElement, this.siblingTargetPostElement);
      this.removeSnackbar(snackbarElement);
    });
  }

  removeSnackbar(snackbarElement, timeout) {
    this.contentElement.removeChild(snackbarElement);
    clearTimeout(this.timeout);
  }
}
