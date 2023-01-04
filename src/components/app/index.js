import './index.scss';

import { createHeaderComponent } from '../header';
import { createNavigatorComponent } from '../navigator';
import { createMainComponentWithDefaultProps } from '../hoc';

const createAppComponent = () => {
  const fragment = document.createDocumentFragment();

  const headerComponent = createHeaderComponent();
  fragment.appendChild(headerComponent.element);

  const navigatorComponent = createNavigatorComponent();
  fragment.appendChild(navigatorComponent.element);

  const mainComponent = createMainComponentWithDefaultProps();
  fragment.appendChild(mainComponent.element);

  return { fragment };
};

export { createAppComponent };
