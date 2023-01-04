/* eslint-disable class-methods-use-this */
import {
  AbstractMethodNotImplementedException,
  DirectlyConstructedAbstractException,
} from '../exception';

export default class Model {
  constructor() {
    if (new.target === Model) {
      throw new DirectlyConstructedAbstractException(
        'Cannot construct Abstract instances directly',
      );
    }
  }

  getData() {
    throw new AbstractMethodNotImplementedException('getData');
  }

  setData() {
    throw new AbstractMethodNotImplementedException('setData');
  }
}
