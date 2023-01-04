import './index.scss';

import { createElement } from '../../utils';

const createHeaderComponent = () => {
  const headerElement = createElement(`<header class="header"></header>`);

  return { headerElement };
};

export { createHeaderComponent };
