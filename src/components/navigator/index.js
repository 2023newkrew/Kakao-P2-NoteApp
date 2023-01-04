import './index.scss';

import { createElement } from '../../utils';

const createNavigatorComponent = () => {
  const navigatorElement = createElement(`<nav class="navigator"></nav>`);

  return { navigatorElement };
};

export { createNavigatorComponent };
