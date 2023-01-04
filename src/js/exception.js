// eslint-disable-next-line max-classes-per-file
import {
  CANNOT_USE_ABSTRACT_CONSTRUCTOR,
  CANNOT_USE_ABSTRACT_METHOD,
  INVALID_VIEW_MODEL,
} from './constants/message';

export class AbstractException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class DirectlyConstructedAbstractException extends AbstractException {
  constructor() {
    super(CANNOT_USE_ABSTRACT_CONSTRUCTOR);
  }
}

export class AbstractMethodNotImplementedException extends AbstractException {
  constructor(methodName) {
    super(`${CANNOT_USE_ABSTRACT_METHOD}: ${methodName}`);
  }
}

export class InvalidException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidViewModelException extends InvalidException {
  constructor(viewModelName) {
    super(`${INVALID_VIEW_MODEL}: ${viewModelName}`);
  }
}

export class InvalidTypeException extends InvalidException {
  constructor(target, type) {
    super(`invaild type ${target} : ${type}`);
  }
}
