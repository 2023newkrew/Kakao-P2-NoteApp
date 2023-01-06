import './index.scss';

import { createHeaderComponent } from '../header';
import { createNavigatorComponent } from '../navigator';
import { createMainComponentWithDefaultProps } from '../mainWithDefaultProps';

const createAppComponent = () => {
  const documentFragment = document.createDocumentFragment();

  const headerComponent = createHeaderComponent();
  documentFragment.appendChild(headerComponent.documentFragment);

  const navigatorComponent = createNavigatorComponent();
  documentFragment.appendChild(navigatorComponent.documentFragment);

  const mainComponent = createMainComponentWithDefaultProps();
  documentFragment.appendChild(mainComponent.documentFragment);

  return { documentFragment };
};

export { createAppComponent };
