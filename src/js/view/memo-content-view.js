import View from '../abstract/view';
import { MAXIMUM_CONTENT_LENGTH } from '../constants/content';
import typeCheck from '../util/type-check';
import MemoContentViewModel from '../viewmodel/memo-content-view-model';

export default class MemoContentView extends View {
  #memoContentViewModel;

  constructor(
    memoContentViewModel,
    _ = typeCheck(memoContentViewModel, MemoContentViewModel),
  ) {
    super();
    this.#memoContentViewModel = memoContentViewModel;
  }

  render() {
    const contentTextareaEl = document.querySelector('.content-textarea');
    const contentLengthContainerEl = document.querySelector(
      '.content-length-container',
    );

    const contentLength = this.#memoContentViewModel.getContentLength();

    if (contentLength >= MAXIMUM_CONTENT_LENGTH) {
      contentTextareaEl.value = this.#memoContentViewModel.getContent();
    }

    contentLengthContainerEl.innerHTML = `${contentLength}/${MAXIMUM_CONTENT_LENGTH}`;
  }
}
