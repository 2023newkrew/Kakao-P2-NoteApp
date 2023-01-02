import './styles/variables.scss';
import './styles/reset.scss';
import './styles/main.scss';
import './styles/header.scss';
import './styles/sidemenu.scss';

import useTheme from './js/theme';

const onLoadScript = () => {
  const {init} = useTheme(document.querySelector('.header #theme-button'));

  init();
};
onLoadScript();
