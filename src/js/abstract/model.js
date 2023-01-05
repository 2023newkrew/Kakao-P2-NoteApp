import {
  AbstractMethodNotImplementedException,
  DirectlyConstructedAbstractException,
} from '../exception';

export default class Model {
  constructor() {
    if (new.target === Model) {
      throw new DirectlyConstructedAbstractException();
    }
  }

  getData() {
    throw new AbstractMethodNotImplementedException('getData');
  }

  setData() {
    throw new AbstractMethodNotImplementedException('setData');
  }
}
