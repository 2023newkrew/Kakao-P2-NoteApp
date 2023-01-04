import {
  AbstractMethodNotImplementedException,
  DirectlyConstructedAbstractException,
} from '../exception';

export default class View {
  constructor() {
    if (new.target === View) {
      throw new DirectlyConstructedAbstractException(
        'Cannot construct Abstract instances directly',
      );
    }
  }

  render() {
    throw new AbstractMethodNotImplementedException('render');
  }
}
