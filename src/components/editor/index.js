import './index.scss';

import { createElement, EMPTY_STRING, pipe } from '../../utils';

const Attribute = {
  DISABLED: 'disabled',
};

const createEditorHTML = ({ initialText, initialDisabled, maxTextLength }) => `<div class="editor">
  <textarea class="editor__textarea" maxlength="${maxTextLength}" ${initialDisabled ? Attribute.DISABLED : EMPTY_STRING}>${initialText}</textarea>
  <div class="editor__text-counter"></div>
</div>`;

const createEditorComponent = ({ handleInputEditor, initialText, initialDisabled, maxTextLength }) => {
  const element = pipe(createEditorHTML, createElement)({ initialText, initialDisabled, maxTextLength });

  const textareaElement = element.querySelector('.editor__textarea');
  const textCounterElement = element.querySelector('.editor__text-counter');

  const renderTextCount = (count) => {
    textCounterElement.style.color = count >= maxTextLength ? 'red' : 'inherit';
    textCounterElement.innerHTML = `${count} / ${maxTextLength}`;
  };

  textareaElement.addEventListener('input', (event) => {
    handleInputEditor(event);
    renderTextCount(event.target.value.length);
  });

  const setValue = (value) => {
    textareaElement.value = value;
    renderTextCount(value.length);
  };

  const setDisabled = (disabled) => {
    if (disabled) element.setAttribute(Attribute.DISABLED, EMPTY_STRING);
    else element.removeAttribute(Attribute.DISABLED);
  };

  renderTextCount(initialText.length);

  return { element, setValue, setDisabled };
};

export { createEditorComponent };
