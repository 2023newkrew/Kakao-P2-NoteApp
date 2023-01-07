import className from './index.scss';

import { createDocumentFragment } from '../../utils';

const SNACK_BAR_DISPLAY_MS = 2000;

const createSnackBarContainerComponent = () => {
  const documentFragment = createDocumentFragment(`<div class="${className.snackBarContainer}"></div>`);
  const snackBarContainerElement = documentFragment.querySelector(`.${className.snackBarContainer}`);

  documentFragment.addEventListener('snack-bar-request', ({ detail }) => {
    const documentFragment = createDocumentFragment(`<div class="${className.snackBar}">${detail.content}<button class="${className.button}">${detail.buttonValue}</button></div>`);
    const snackBarElement = documentFragment.querySelector(`.${className.snackBar}`);
    const snackBarButton = snackBarElement.querySelector(`.${className.button}`);

    snackBarButton.addEventListener('click', detail.handleButtonClick);
    snackBarContainerElement.appendChild(documentFragment);

    let timeoutId = null;

    const remove = () => {
      snackBarElement.classList.add(className.remove);
      snackBarElement.addEventListener('animationend', () => {
        snackBarContainerElement.removeChild(snackBarElement);
      });
    };

    const clearSnackBarTimeout = () => {
      clearTimeout(timeoutId);
    };

    const setSnackBarTimout = () => {
      timeoutId = setTimeout(remove, SNACK_BAR_DISPLAY_MS);
    };

    snackBarElement.addEventListener('mouseenter', clearSnackBarTimeout);
    snackBarElement.addEventListener('mouseleave', setSnackBarTimout);
    setSnackBarTimout();
  });

  return { documentFragment };
};

export { createSnackBarContainerComponent };
