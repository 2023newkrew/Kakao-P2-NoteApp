const createDocumentFragment = (html) => {
  const templateElement = document.createElement('template');
  templateElement.innerHTML = html;
  return templateElement.content;
};

const EMPTY_STRING = '';

export { createDocumentFragment, EMPTY_STRING };
