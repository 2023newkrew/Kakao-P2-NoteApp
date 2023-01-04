import './index.scss';

import { createElement } from '../../utils';

const createHeaderComponent = () => {
  const element = createElement(`<header class="header"></header>`);

  return { element };
};

export { createHeaderComponent };
