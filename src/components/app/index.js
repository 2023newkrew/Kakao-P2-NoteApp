import './index.scss';

import { createHeaderComponent } from '../header';
import { createNavigatorComponent } from '../navigator';
import { createMainComponentWithDefaultProps } from '../mainWithDefaultProps';
import { createSnackBarContainerComponent } from '../snackBarContainer';

const createAppComponent = () => {
  const documentFragment = document.createDocumentFragment();

  // 지금과 같은 경우엔 app 컴포넌트가 이벤트 중개만 한다.
  document.body.addEventListener('note-view-set', ({ detail }) => {
    const noteViewSetEvent = new CustomEvent('note-view-set', { detail });
    headerComponent.documentFragment.dispatchEvent(noteViewSetEvent);
    mainComponent.documentFragment.dispatchEvent(noteViewSetEvent);
  });

  document.body.addEventListener('snack-bar-request', ({ detail }) => {
    const snackBarRequestEvent = new CustomEvent('snack-bar-request', { detail });
    snackBarContainerComponent.documentFragment.dispatchEvent(snackBarRequestEvent);
  });

  const headerComponent = createHeaderComponent();
  documentFragment.appendChild(headerComponent.documentFragment);

  const navigatorComponent = createNavigatorComponent();
  documentFragment.appendChild(navigatorComponent.documentFragment);

  const mainComponent = createMainComponentWithDefaultProps();
  documentFragment.appendChild(mainComponent.documentFragment);

  const snackBarContainerComponent = createSnackBarContainerComponent();
  documentFragment.appendChild(snackBarContainerComponent.documentFragment);

  document.body.dispatchEvent(new CustomEvent('snack-bar-request', {
    detail: {
      content: '안녕하세요',
      buttonValue: '해해',
      handleButtonClick: () => { console.log('clicked') },
    },
  }));

  document.body.dispatchEvent(new CustomEvent('snack-bar-request', {
    detail: {
      content: '안녕하세요',
      buttonValue: '해해',
      handleButtonClick: () => { console.log('clicked') },
    },
  }));

  return { documentFragment };
};

export { createAppComponent };
