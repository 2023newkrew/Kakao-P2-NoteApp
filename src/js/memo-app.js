import { NO_NAME_MEMO_TITLE } from './constants/message';
import Memo from './model/memo';
import MemoGridView from './view/memo-grid-view';
import MemoGridViewModel from './viewmodel/memo-grid-view-model';

export default class MemoApp {
  #memoGridView;

  #memoGridViewModel;

  #titleInputEl;

  #contentTextAreaEl;

  constructor() {
    this.#memoGridViewModel = new MemoGridViewModel();
    this.#memoGridView = new MemoGridView(this.#memoGridViewModel);
    this.#titleInputEl = document.querySelector('.title-input');
    this.#contentTextAreaEl = document.querySelector('.content-textarea');

    this._bindEvents();
  }

  _bindEvents() {
    const submitButtonEl = document.querySelector('.submit-button');
    submitButtonEl.addEventListener(
      'click',
      this.#onAddNoteButtonClick.bind(this),
    );
  }

  #onAddNoteButtonClick() {
    let title = this.#titleInputEl.value;
    const content = this.#contentTextAreaEl.value;

    if (title === '' || title === null) title = NO_NAME_MEMO_TITLE;

    const memo = new Memo({ title, content });

    this.#memoGridViewModel.appendMemo(memo);
    this.#memoGridView.render();
  }
}
