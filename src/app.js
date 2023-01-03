import './styles/reset.scss';
import './styles/general.scss';
import './styles/header.scss';
import './styles/sidemenu.scss';
import './styles/main.scss';

import ThemeController from './js/themeController';
import SidemenuController from './js/sidemenuController';
import MemoController from './js/memoController';

const onLoadScript = () => {
  const themeController = new ThemeController(document.body.querySelector('.header #theme-button'));
  const sidemenuController = new SidemenuController(document.body.querySelector('.header #sidemenu-button'));
  const memoController = new MemoController(
    document.body.querySelector('.contents .memo .form .content-input'),
    document.body.querySelector('.contents .memo .form .content-info')
  );

  themeController.init();
  sidemenuController.init();
  memoController.init();
};
onLoadScript();
