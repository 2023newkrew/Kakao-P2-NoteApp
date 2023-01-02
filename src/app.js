import './styles/variables.scss';
import './styles/reset.scss';
import './styles/main.scss';
import './styles/header.scss';
import './styles/sidemenu.scss';

import ThemeController from './js/themeController';
import SidemenuController from './js/sidemenuController';

const onLoadScript = () => {
  const themeController = new ThemeController(document.body.querySelector('.header #theme-button'));
  const sidemenuController = new SidemenuController(document.body.querySelector('.header #sidemenu-button'));

  themeController.init();
  sidemenuController.init();
};
onLoadScript();
