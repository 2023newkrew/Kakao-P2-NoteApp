export default class NavController {
    constructor() {
        this.getElements();
        this.addClickEvent();
    }
    getElements() {
        this.toggleNavElement = document.querySelector('.menu-toggle-button');
        this.navElement = document.querySelector('.nav');
    }
    addClickEvent() {
        this.toggleNavElement.addEventListener('click', this.onNavToggle.bind(this));
    }
    onNavToggle() {
        this.navElement.classList.toggle('hide');
    }
}