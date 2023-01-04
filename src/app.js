import '@styles/reset.scss';
import '@styles/general.scss';
import '@styles/header.scss';
import '@styles/sidemenu.scss';
import '@styles/main.scss';

import ThemeController from '@/themeController';
import SidemenuController from '@/sidemenuController';
import MemoController from '@/memoController';

const onLoadScript = () => {
  const themeController = new ThemeController(document.body.querySelector('.header #theme-button'));
  const sidemenuController = new SidemenuController(document.body.querySelector('.header #sidemenu-button'));
  const memoController = new MemoController(
    document.body.querySelector('.contents .memo-section .form .content-input'),
    document.body.querySelector('.contents .memo-section .form .content-info'),
    document.body.querySelector('.contents .memo-section .memo-container .memos')
  );

  themeController.init();
  sidemenuController.init();
  memoController.init();
};
onLoadScript();
