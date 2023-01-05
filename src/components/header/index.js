import className from './index.scss';

import { createElement } from '../../utils';

const createHeaderComponent = () => {
  const element = createElement(`<header class="${className.header}">KEEP APPLICATION</header>`);

  return { element };
};

export { createHeaderComponent };
