const createDocumentFragment = (html) => {
  const templateElement = document.createElement('template');
  templateElement.innerHTML = html;
  return templateElement.content;
};

export { createDocumentFragment };
