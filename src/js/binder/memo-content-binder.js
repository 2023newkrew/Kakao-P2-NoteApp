import Binder from '../abstract/binder';
import MemoContentView from '../view/memo-content-view';
import MemoContentViewModel from '../viewmodel/memo-content-view-model';

export default class MemoContentBinder extends Binder {
  #memoContentView;

  #memoContentViewModel;

  #contentTextareaEl;

  constructor() {
    super();
    this.#memoContentViewModel = new MemoContentViewModel();
    this.#memoContentView = new MemoContentView(this.#memoContentViewModel);
    this.#contentTextareaEl = document.querySelector('.content-textarea');

    this._bindEvents();
  }

  _bindEvents() {
    this.#contentTextareaEl.addEventListener(
      'input',
      this.#onTextareaInput.bind(this),
    );
  }

  #onTextareaInput() {
    this.#memoContentViewModel.setContent(this.#contentTextareaEl.value);
    this.#memoContentView.render();
  }
}
