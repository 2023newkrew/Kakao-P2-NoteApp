import {STORAGE_KEY_OF_THEME, THEME, THEME_ATTRIBUTE} from '@constants/theme';
import {getItem, setItem} from '@utils/localStorage';

export default class ThemeController {
  constructor(handlerElement) {
    if (!handlerElement) {
      throw new Error('Must provicde theme hander element');
    }
    this.handlerElement = handlerElement;
  }
  init() {
    this._initTheme();
    this._initHandler();
  }
  _initTheme() {
    const theme = ThemeController.getTheme();
    ThemeController.setTheme(theme);
  }
  _initHandler() {
    this.handlerElement.addEventListener('click', () => ThemeController.toggleTheme());
  }
  static setTheme(theme) {
    setItem(STORAGE_KEY_OF_THEME, theme);
    document.body.setAttribute(THEME_ATTRIBUTE, theme);
  }
  static getTheme() {
    return getItem(STORAGE_KEY_OF_THEME) || THEME.LIGHT;
  }
  static toggleTheme() {
    const currentTheme = ThemeController.getTheme();
    const nextTheme = currentTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK;

    ThemeController.setTheme(nextTheme);
  }
}
