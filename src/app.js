import './styles/variables.scss';
import './styles/reset.scss';
import './styles/main.scss';
import './styles/header.scss';
import './styles/sidemenu.scss';

import ThemeController from './js/themeController';

const onLoadScript = () => {
  const themeController = new ThemeController(document.body.querySelector('.header #theme-button'));
  themeController.init();
};
onLoadScript();
