import className from './index.scss';

import { createDocumentFragment } from '../../utils';

const Attribute = {
  DISABLED: 'disabled',
};

const createEditorHTML = ({ text, disabled, maxTextLength }) => `<div class="${className.editor} ${disabled ? className.disabled : ''}">
  <textarea class="${className.textarea}" maxlength="${maxTextLength}" rows="2" ${disabled ? Attribute.DISABLED : ''}>${text}</textarea>
  <div class="${className.textCounter}"></div>
</div>`;

const createEditorComponent = ({ onInput, onFocusout, initialText, initialDisabled, maxTextLength }) => {
  const editorHTML = createEditorHTML({ text: initialText, disabled: initialDisabled, maxTextLength });
  const documentFragment = createDocumentFragment(editorHTML);

  const editorElement = documentFragment.querySelector(`.${className.editor}`);
  const textareaElement = documentFragment.querySelector(`.${className.textarea}`);
  const textCounterElement = documentFragment.querySelector(`.${className.textCounter}`);

  const renderTextCount = (count) => {
    if (count >= maxTextLength) {
      textCounterElement.classList.add(className.warning);
    } else {
      textCounterElement.classList.remove(className.warning);
    }

    textCounterElement.innerHTML = `${count} / ${maxTextLength}`;
  };

  textareaElement.addEventListener('input', (event) => {
    onInput(event);
    renderTextCount(event.target.value.length);
  });

  textareaElement.addEventListener('focusout', () => {
    if (onFocusout) onFocusout();
  });

  const setValue = (value) => {
    textareaElement.value = value;
    renderTextCount(value.length);
  };

  const setDisabled = (disabled) => {
    if (disabled) {
      editorElement.classList.add(className.disabled);
      textareaElement.setAttribute(Attribute.DISABLED, '');
    } else {
      editorElement.classList.remove(className.disabled);
      textareaElement.removeAttribute(Attribute.DISABLED);
    }
  };

  const focus = () => {
    textareaElement.focus();
  };

  renderTextCount(initialText.length);

  return { documentFragment, setValue, setDisabled, focus };
};

export { createEditorComponent };
