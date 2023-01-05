export default class ListController {
  constructor() {
    this.listButtonElement = document.body.querySelector(".list-button");
    this.postsElement = document.body.querySelector(".posts");

    this.listenClickEvent();
  }

  listenClickEvent() {
    this.listButtonElement.addEventListener("click", (event) => {
      this.postsElement.classList.toggle("list");
      this.listButtonElement.classList.toggle("list");
    });
  }
}
