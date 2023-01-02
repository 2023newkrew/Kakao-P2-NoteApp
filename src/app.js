import './styles/variables.scss';
import './styles/reset.scss';
import './styles/main.scss';
import './styles/header.scss';
import './styles/sidemenu.scss';

import {initTheme} from './js/theme';

const onLoadScript = () => {
  console.log('load script...');
  initTheme();
};
onLoadScript();
