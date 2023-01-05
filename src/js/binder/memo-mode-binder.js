import Binder from '../abstract/binder';
import MemoModeView from '../view/memo-mode-view';

export default class MemoModeBinder extends Binder {
  #memoModeView;

  constructor() {
    super();
    this.#memoModeView = new MemoModeView();
    this._bindEvents();
  }

  _bindEvents() {
    const memoModeButton = document.querySelector('.header__memo-mode-button');

    memoModeButton.addEventListener(
      'click',
      this.#onMemoModeButtonClick.bind(this),
    );
  }

  #onMemoModeButtonClick() {
    this.#memoModeView.render();
  }
}
