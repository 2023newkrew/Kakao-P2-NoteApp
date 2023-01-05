import {
  AbstractMethodNotImplementedException,
  DirectlyConstructedAbstractException,
} from '../exception';

export default class View {
  constructor() {
    if (new.target === View) {
      throw new DirectlyConstructedAbstractException();
    }
  }

  render() {
    throw new AbstractMethodNotImplementedException('render');
  }
}
