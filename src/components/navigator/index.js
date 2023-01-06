import './index.scss';

import { createDocumentFragment } from '../../utils';

const createNavigatorComponent = () => {
  const documentFragment = createDocumentFragment(`<nav class="navigator"></nav>`);

  return { documentFragment };
};

export { createNavigatorComponent };
