import View from '../abstract/view';

export default class SideBarView extends View {
  render() {
    const sideBarContainerEl = document.querySelector('.side-bar-container');

    sideBarContainerEl.classList.toggle('side-bar-container--collapsed');
  }
}
