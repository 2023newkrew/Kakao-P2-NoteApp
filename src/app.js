import '@styles/reset.scss';
import '@styles/general.scss';
import '@styles/header.scss';
import '@styles/sidemenu.scss';
import '@styles/main.scss';

import ThemeController from '@/themeController';
import SidemenuController from '@/sidemenuController';
import MemoController from '@/memoController';

const onLoadScript = () => {
  const header = document.body.querySelector('.header');
  const memoSection = document.body.querySelector('.contents .memo-section');
  const memoForm = memoSection.querySelector('.form');

  new ThemeController(header.querySelector('.header #theme-button'));
  new SidemenuController(header.querySelector('.header #sidemenu-button'));
  new MemoController(
    memoForm.querySelector('.content-input'),
    memoForm.querySelector('.content-info'),
    memoForm.querySelector('button'),
    memoSection.querySelector('.memo-container .memos')
  );
};
onLoadScript();
