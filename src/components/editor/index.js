import className from './index.scss';

import { createElement, EMPTY_STRING, pipe } from '../../utils';

const Attribute = {
  DISABLED: 'disabled',
};

const createEditorHTML = ({ text, disabled, maxTextLength }) => `<div class="${className.editor}">
  <textarea class="${className.textarea}" maxlength="${maxTextLength}" rows="2" ${disabled ? Attribute.DISABLED : EMPTY_STRING}>${text}</textarea>
  <div class="${className.textCounter}"></div>
</div>`;

const createEditorComponent = ({ handleInputEditor, handleFocusoutEditor, initialText, initialDisabled, maxTextLength }) => {
  const element = pipe(createEditorHTML, createElement)({ text: initialText, disabled: initialDisabled, maxTextLength });

  const textareaElement = element.querySelector(`.${className.textarea}`);
  const textCounterElement = element.querySelector(`.${className.textCounter}`);

  const renderTextCount = (count) => {
    textCounterElement.style.color = count >= maxTextLength ? 'red' : 'inherit';
    textCounterElement.innerHTML = `${count} / ${maxTextLength}`;
  };

  textareaElement.addEventListener('input', (event) => {
    handleInputEditor(event);
    renderTextCount(event.target.value.length);
  });

  textareaElement.addEventListener('focusout', () => {
    if (handleFocusoutEditor) handleFocusoutEditor();
  });

  const setValue = (value) => {
    textareaElement.value = value;
    renderTextCount(value.length);
  };

  const setDisabled = (disabled) => {
    if (disabled) textareaElement.setAttribute(Attribute.DISABLED, EMPTY_STRING);
    else textareaElement.removeAttribute(Attribute.DISABLED);
  };

  const focus = () => {
    textareaElement.focus();
  };

  renderTextCount(initialText.length);

  return { element, setValue, setDisabled, focus };
};

export { createEditorComponent };
