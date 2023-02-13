import Binder from '../abstract/binder';
import SideBarView from '../view/side-bar-view';

export default class SideBarBinder extends Binder {
  #sideBarView;

  constructor() {
    super();
    this.#sideBarView = new SideBarView();
    this._bindEvents();
  }

  _bindEvents() {
    const menuBtnEl = document.querySelector('.header__menu-button');

    menuBtnEl.addEventListener('click', this.#onMenuBtnClick.bind(this));
  }

  #onMenuBtnClick() {
    this.#sideBarView.render();
  }
}
