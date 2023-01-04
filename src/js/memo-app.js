import Memo from './model/memo';
import MemoGridView from './view/memo-grid-view';
import MemoGridViewModel from './viewmodel/memo-grid-view-model';

export default class MemoApp {
  #memoGridView;

  #memoGridViewModel;

  constructor() {
    this.#memoGridViewModel = new MemoGridViewModel();
    this.#memoGridView = new MemoGridView(this.#memoGridViewModel);

    this.#bindEvents();
  }

  #bindEvents() {
    const submitButtonEl = document.querySelector('.submit-button');
    submitButtonEl.addEventListener(
      'click',
      this.onAddNoteButtonClick.bind(this),
    );
  }

  onAddNoteButtonClick() {
    const memo = new Memo({
      title: 'hello world',
      content: 'hello world',
    });

    this.#memoGridViewModel.appendMemo(memo);
    this.#memoGridView.render();
  }
}
