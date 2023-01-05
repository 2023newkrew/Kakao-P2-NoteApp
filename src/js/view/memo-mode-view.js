import View from '../abstract/view';

export default class MemoModeView extends View {
  render() {
    const memoGridEl = document.querySelector('.card-grid');
    const memoModeButtonEl = document.querySelector(
      '.header__memo-mode-button',
    );

    memoGridEl.classList.toggle('card-grid--list-mode');
    memoGridEl.classList.toggle('card-grid--grid-mode');
    memoModeButtonEl.classList.toggle('grid-mode-button');
  }
}
