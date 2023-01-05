import { MAXIMUM_CONTENT_LENGTH } from '../constants/content';

export default class MemoContentViewModel {
  #content;

  constructor() {
    this.#content = '';
  }

  getContent() {
    return this.#content;
  }

  getContentLength() {
    return this.#content.length;
  }

  setContent(content) {
    if (content.length > MAXIMUM_CONTENT_LENGTH) return;

    this.#content = content;
  }
}
