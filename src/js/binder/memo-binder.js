import Binder from '../abstract/binder';
import { NO_NAME_MEMO_TITLE } from '../constants/message';
import Memo from '../model/memo';
import MemoGridView from '../view/memo-grid-view';
import MemoGridViewModel from '../viewmodel/memo-grid-view-model';

export default class MemoBinder extends Binder {
  #memoGridView;

  #memoGridViewModel;

  #titleInputEl;

  #contentTextAreaEl;

  constructor() {
    super();
    this.#memoGridViewModel = new MemoGridViewModel();
    this.#memoGridView = new MemoGridView(this.#memoGridViewModel);
    this.#titleInputEl = document.querySelector('.title-input');
    this.#contentTextAreaEl = document.querySelector('.content-textarea');

    this._bindEvents();
  }

  _bindEvents() {
    const submitButtonEl = document.querySelector('.submit-button');
    const cardGridEl = document.querySelector('.card-grid');

    submitButtonEl.addEventListener(
      'click',
      this.#onAddNoteButtonClick.bind(this),
    );

    cardGridEl.addEventListener(
      'click',
      this.#onDeleteNoteButtonClick.bind(this),
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

  #onDeleteNoteButtonClick({ target }) {
    if (target.className !== 'memo__erase-button icon-button') return;

    const { createdAt } = target.closest('.memo').dataset;

    this.#memoGridViewModel.deleteMemo(createdAt);
    this.#memoGridView.render();
  }
}
