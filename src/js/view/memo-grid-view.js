import View from '../abstract/view';
import typeCheck from '../util/type-check';
import MemoGridViewModel from '../viewmodel/memo-grid-view-model';

export default class MemoGridView extends View {
  #memoGridViewModel;

  #diffMemos;

  constructor(memoViewModel, _ = typeCheck(memoViewModel, MemoGridViewModel)) {
    super();
    this.#memoGridViewModel = memoViewModel;
    this.#diffMemos = this.#memoGridViewModel.diffMemos();
  }

  #createMemoEl({ title, content, createdAt }) {
    const memoEl = document.createElement('article');
    memoEl.classList.add('memo');
    memoEl.dataset.createdAt = createdAt.getTime();
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

  #renderOnAdded({ memoGridEl, addedMemosArray }) {
    const memoElArray = addedMemosArray.map((memo) =>
      this.#createMemoEl(memo.getData()),
    );
    memoGridEl.append(...memoElArray);
  }

  #renderOnRemoved({ memoGridEl, deletedMemosArray }) {
    deletedMemosArray.forEach((memo) => {
      const memoEl = memoGridEl.querySelector(
        `[data-created-at="${memo.getData().createdAt.getTime()}"]`,
      );
      memoGridEl.removeChild(memoEl);
    });
  }

  render() {
    const memoGridEl = document.querySelector('.card-grid');

    const { addedMemosArray, deletedMemosArray } = this.#diffMemos.next().value;

    if (addedMemosArray.length > 0) {
      this.#renderOnAdded({ memoGridEl, addedMemosArray });
    }

    if (deletedMemosArray.length > 0) {
      this.#renderOnRemoved({
        memoGridEl,
        deletedMemosArray,
      });
    }
  }
}
