import View from '../abstract/view';
import typeCheck from '../util/type-check';
import MemoGridViewModel from '../viewmodel/memo-grid-view-model';

export default class MemoGridView extends View {
  #memoGridViewModel;

  constructor(memoViewModel, _ = typeCheck(memoViewModel, MemoGridViewModel)) {
    super();
    this.#memoGridViewModel = memoViewModel;
  }

  #createMemoEl({ title, content }) {
    const memoEl = document.createElement('article');
    memoEl.classList.add('memo');
    memoEl.innerHTML = `
      <div class="memo__header">
        <div class="memo__title-container">
          <div class="memo__title">${title}</div>
        </div>
        <div class="memo__erase-button-container">
          <button class="memo__erase-button icon-button">x</button>
        </div>
      </div>
      <div class="memo-body">
        <div class="memo-content">${content}</div>
      </div>
    `;
    return memoEl;
  }

  render() {
    const memoGridEl = document.querySelector('.card-grid');

    memoGridEl.innerHTML = '';

    const memos = this.#memoGridViewModel.getMemos();
    const memoElArray = memos.map((memo) => this.#createMemoEl(memo.getData()));

    memoGridEl.append(...memoElArray);
  }
}
