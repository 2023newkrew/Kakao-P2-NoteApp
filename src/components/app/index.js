import './index.scss';

import { createHeaderComponent } from '../header';
import { createNavigatorComponent } from '../navigator';
import { createMainComponentWithDefaultProps } from '../mainWithDefaultProps';

const createAppComponent = () => {
  const documentFragment = document.createDocumentFragment();

  document.body.addEventListener('note-view-set', ({ detail }) => {
    const noteViewSetEvent = new CustomEvent('note-view-set', { detail });

    headerComponent.documentFragment.dispatchEvent(noteViewSetEvent);
    mainComponent.documentFragment.dispatchEvent(noteViewSetEvent);
  });

  const headerComponent = createHeaderComponent();
  documentFragment.appendChild(headerComponent.documentFragment);

  const navigatorComponent = createNavigatorComponent();
  documentFragment.appendChild(navigatorComponent.documentFragment);

  const mainComponent = createMainComponentWithDefaultProps();
  documentFragment.appendChild(mainComponent.documentFragment);

  return { documentFragment };
};

export { createAppComponent };
