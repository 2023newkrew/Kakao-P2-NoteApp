const pipe = (...functions) => (x) => functions.reduce((v, f) => f(v), x);

const createDocumentFragment = (html) => {
  const templateElement = document.createElement('template');
  templateElement.innerHTML = html;
  return templateElement.content;
};

const EMPTY_STRING = '';

export { pipe, createDocumentFragment, EMPTY_STRING };
