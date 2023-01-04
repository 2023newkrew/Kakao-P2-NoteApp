import './index.scss';

import { createElement } from '../../utils';

const createNavigatorComponent = () => {
  const element = createElement(`<nav class="navigator"></nav>`);

  return { element };
};

export { createNavigatorComponent };
