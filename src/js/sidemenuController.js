const sidemenu = document.body.querySelector('nav.sidemenu');

export default class SidemenuController {
  constructor(handlerElement) {
    if (!handlerElement || !sidemenu) {
      throw new Error('Must provide sidemnu and handler element');
    }
    this.handlerElement = handlerElement;

    this._initHandler();
  }
  _initHandler() {
    this.handlerElement.addEventListener('click', () => this._toggleSidemenu());
  }
  _toggleSidemenu() {
    sidemenu.classList.toggle('active');
  }
}
