import className from './index.scss';

import { createDocumentFragment } from '../../utils';

const createHeaderHTML = () => `<header class="${className.header}">KEEP APPLICATION<div class="${className.buttonContainer}">
  <button class="${className.noteViewToggleButton}" data-note-view="grid"></button>
  <button class="${className.userButton}"></button>
</div></header>`;

const createHeaderComponent = () => {
  const headerHTML = createHeaderHTML();
  const documentFragment = createDocumentFragment(headerHTML);

  const noteViewToggleButton = documentFragment.querySelector(`.${className.noteViewToggleButton}`);

  const handleNoteViewToggleButtonClick = () => { // Observable에 변경을 요청
    const noteViewSetEvent = new CustomEvent('note-view-set', {
      detail: {
        noteView: noteViewToggleButton.dataset.noteView === 'list' ? 'grid' : 'list',
      },
      bubbles: true,
    });

    noteViewToggleButton.dispatchEvent(noteViewSetEvent);
  };

  noteViewToggleButton.addEventListener('click', handleNoteViewToggleButtonClick);

  documentFragment.addEventListener('note-view-set', ({ detail }) => { // Observable의 notify 핸들링
    noteViewToggleButton.dataset.noteView = detail.noteView;
  });

  return { documentFragment };
};

export { createHeaderComponent };
