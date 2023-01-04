const pipe = (...functions) => (x) => functions.reduce((v, f) => f(v), x);

const createElement = (html) => {
  const templateElement = document.createElement('template');
  templateElement.innerHTML = html;
  return templateElement.content.children[0];
};

const EMPTY_STRING = '';

export { pipe, createElement, EMPTY_STRING };
