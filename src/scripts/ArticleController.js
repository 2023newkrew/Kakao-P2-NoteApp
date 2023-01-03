
export default class ArticleController {
    constructor() {
        this.getElements();
        this.addClickEvent();
        
    }
    getElements() {
        this.viewToggleContainerElement = document.querySelector('.view-toggle-button');
        this.viewToggleElements = this.viewToggleContainerElement.querySelectorAll('img');
        this.articlesContainerElement = document.querySelector('.notes__articles');
    }
    addClickEvent() {
        this.viewToggleContainerElement.addEventListener('click', () => {
            this.onViewToggle();
        })
    }
    onViewToggle() {
        this.viewToggleElements.forEach((viewToggleElement) => {
            viewToggleElement.classList.toggle('hide')
        })
        this.articlesContainerElement.classList.toggle('list');
    }
}