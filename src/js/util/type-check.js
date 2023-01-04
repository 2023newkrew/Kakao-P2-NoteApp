/* eslint-disable valid-typeof */

import { InvalidTypeException } from '../exception';

const typeCheck = (target, type) => {
  if (typeof type === 'string') {
    if (typeof target !== type) {
      throw new InvalidTypeException(target, type);
    }
  } else if (!(target instanceof type)) {
    throw new InvalidTypeException(target, type);
  }
  return target;
};

export default typeCheck;
