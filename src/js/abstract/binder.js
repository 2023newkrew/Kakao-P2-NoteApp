import {
  AbstractMethodNotImplementedException,
  DirectlyConstructedAbstractException,
} from '../exception';

export default class Binder {
  constructor() {
    if (new.target === Binder) {
      throw new DirectlyConstructedAbstractException();
    }
  }

  _bindEvents() {
    throw new AbstractMethodNotImplementedException('_bindEvent');
  }
}
