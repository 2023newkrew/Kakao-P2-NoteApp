import Model from '../abstract/model';

export default class Memo extends Model {
  #createdAt;

  #title;

  #content;

  constructor({ title, content }) {
    super();
    this.#createdAt = new Date();
    this.#title = title;
    this.#content = content;
  }

  getData() {
    return {
      createdAt: this.#createdAt,
      title: this.#title,
      content: this.#content,
    };
  }

  setData({ title, content }) {
    if (title) this.#title = title;
    if (content) this.#content = content;
  }
}
