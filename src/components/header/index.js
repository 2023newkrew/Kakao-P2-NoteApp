import className from './index.scss';

import { createDocumentFragment } from '../../utils';

const createHeaderComponent = () => {
  const documentFragment = createDocumentFragment(`<header class="${className.header}">KEEP APPLICATION</header>`);

  return { documentFragment };
};

export { createHeaderComponent };
