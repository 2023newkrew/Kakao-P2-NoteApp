import SnackbarController from '@scripts/SnackbarController';
export default class ArticleController {
    constructor() {
        this.NOTE_MAX_LENGTH = 200;
        this.getElements();
        this.addClickEvent();
        this.addWriteEvent();
        
        this.snackbarController = new SnackbarController();
    }
    getElements() {
        this.viewToggleContainerElement = document.querySelector('.view-toggle-button');
        this.viewToggleElements = this.viewToggleContainerElement.querySelectorAll('img');
        this.articlesContainerElement = document.querySelector('.notes__articles');
        this.articleInputElement = document.querySelector('.notes__header__input');
        this.articleLengthElement = document.querySelector('.notes__header__length');
    }
    addClickEvent() {
        this.viewToggleContainerElement.addEventListener('click', this.onViewToggle.bind(this));
    }
    addWriteEvent() {
        this.articleInputElement.addEventListener('input', this.onWriteNote.bind(this))
    }
    
    onViewToggle() {
        this.viewToggleElements.forEach((viewToggleElement) => {
            viewToggleElement.classList.toggle('hide')
        })
        this.articlesContainerElement.classList.toggle('list');
    }
    onWriteNote(event) {
        if (event.target.value.length > this.NOTE_MAX_LENGTH) {
            event.target.value = event.target.value.slice(0, this.NOTE_MAX_LENGTH);
        }
        if (event.inputType === 'insertLineBreak') {
            this.addNote(this.articleInputElement.value);
            this.clearInput();
        }
        this.updateLength(event.target.value.length);
    }
    addNote(content) {
        const articleElement = document.createElement('li');
        articleElement.classList.add('notes__article');
        articleElement.innerText = content;
        this.articlesContainerElement.appendChild(articleElement);
        this.snackbarController.showSnackbar('노트 내용이 추가되었습니다.');
    }
    clearInput() {
        this.articleInputElement.value = '';
    }
    updateLength(length) {
        this.articleLengthElement.innerText = `${length}/${this.NOTE_MAX_LENGTH}`;
    }
}