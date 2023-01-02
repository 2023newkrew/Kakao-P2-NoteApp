import {getItem, setItem} from './utils/localStorage';

const theme = {
  DARK_THEME: 'dark',
  LIGHT_THEME: 'light',
};

const themeButton = document.querySelector('.header #theme-button');

const setTheme = theme => {
  setItem('theme', theme);
  document.body.setAttribute('data-theme', theme);
};

const toggleTheme = () => {
  const currentTheme = getItem('theme') || 'light';
  const nextTheme = currentTheme === theme.DARK_THEME ? theme.LIGHT_THEME : theme.DARK_THEME;

  setTheme(nextTheme);
};

const initHandler = () => {
  themeButton.addEventListener('click', toggleTheme);
};

export const initTheme = () => {
  const theme = getItem('theme') || 'light';

  console.log('init theme', theme);
  setTheme(theme);
  initHandler();
};
