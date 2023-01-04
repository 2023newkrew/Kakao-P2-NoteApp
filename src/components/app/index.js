import './index.scss';

import { createHeaderComponent } from '../header';
import { createMainComponent } from '../main';
import { createNavigatorComponent } from '../navigator';

const createAppComponent = () => {
  const appFragment = document.createDocumentFragment();

  const { headerElement } = createHeaderComponent();
  appFragment.appendChild(headerElement);

  const { navigatorElement } = createNavigatorComponent();
  appFragment.appendChild(navigatorElement);

  const { mainElement } = createMainComponent();
  appFragment.appendChild(mainElement);

  return { appFragment };
};

export { createAppComponent };
