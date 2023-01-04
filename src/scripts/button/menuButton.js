export default class MenuController {
    constructor() {
        this.menuButtonElement = document.body.querySelector(".menu-button");
        this.sideMenuElement = document.body.querySelector(".side-menu");

        this.listenClickEvent();
    }

    listenClickEvent() {
        this.menuButtonElement.addEventListener("click", function (event) {
            this.sideMenuElement.classList.toggle("active");
        }.bind(this))

    }
}