import {STORAGE_KEY_OF_THEME, THEME, THEME_ATTRIBUTE} from './constants/theme';
import {getItem, setItem} from './utils/localStorage';

const setTheme = theme => {
  setItem(STORAGE_KEY_OF_THEME, theme);
  document.body.setAttribute(THEME_ATTRIBUTE, theme);
};

const getTheme = () => {
  return getItem(STORAGE_KEY_OF_THEME) || THEME.LIGHT_THEME;
};

const toggleTheme = () => {
  const currentTheme = getItem(STORAGE_KEY_OF_THEME) || THEME.LIGHT_THEME;
  const nextTheme = currentTheme === THEME.DARK_THEME ? THEME.LIGHT_THEME : THEME.DARK_THEME;

  setTheme(nextTheme);
};

export default function useTheme(handlerElement) {
  const initTheme = () => {
    const theme = getTheme();
    setTheme(theme);
  };
  const initHandler = () => {
    if (!handlerElement) {
      return;
    }
    handlerElement.addEventListener('click', toggleTheme);
  };

  const init = () => {
    if (!handlerElement) {
      console.error('Not found theme handler element');
      return;
    }
    initTheme();
    initHandler();
  };

  return {
    getTheme,
    setTheme,
    toggleTheme,
    initHandler,
    init,
  };
}
