import './index.scss';

import { createElement, EMPTY_STRING, pipe } from '../../utils';

const Attribute = {
  DISABLED: 'disabled',
};

const createEditorHTML = ({ text, disabled, maxTextLength }) => `<div class="editor">
  <textarea class="editor__textarea" maxlength="${maxTextLength}" ${disabled ? Attribute.DISABLED : EMPTY_STRING}>${text}</textarea>
  <div class="editor__text-counter"></div>
</div>`;

const createEditorComponent = ({ handleInputEditor, initialText, initialDisabled, maxTextLength }) => {
  const element = pipe(createEditorHTML, createElement)({ text: initialText, disabled: initialDisabled, maxTextLength });

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

  textareaElement.addEventListener('focusout', () => {
    setValue(EMPTY_STRING);
    setDisabled(true);
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
