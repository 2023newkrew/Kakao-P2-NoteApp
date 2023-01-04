import './index.scss';

import { createHeaderComponent } from '../header';
import { createNavigatorComponent } from '../navigator';
import { createMainComponentWithDefaultProps } from '../hoc';

const createAppComponent = () => {
  const appFragment = document.createDocumentFragment();

  const { headerElement } = createHeaderComponent();
  appFragment.appendChild(headerElement);

  const { navigatorElement } = createNavigatorComponent();
  appFragment.appendChild(navigatorElement);

  const { mainElement } = createMainComponentWithDefaultProps();
  appFragment.appendChild(mainElement);

  return { appFragment };
};

export { createAppComponent };
