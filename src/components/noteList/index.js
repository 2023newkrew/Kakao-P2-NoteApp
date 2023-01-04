import className from './index.scss';
import { createElement, pipe } from '../../utils';

const createNoteHTML = ({ id, content }) => `<li class="${className.note}" data-id="${id}"><div class="${className.noteContent}">${content}</div></li>`;

const createNoteComponent = ({ id, initialContent }) => {
  const element = pipe(createNoteHTML, createElement)({ id, content: initialContent });
  const noteContentElement = element.querySelector(`.${className.noteContent}`);

  const setContent = (content) => {
    noteContentElement.textContent = content;
  };

  return { id, element, setContent };
};

const createNoteListComponent = ({ initialNotes, handleClickNote }) => {
  const element = createElement(`<ul class="notes"></ul>`);

  const noteComponents = initialNotes.map(({ id, content }) => createNoteComponent({ id, initialContent: content }));
  noteComponents.forEach(({ element: noteElement }) => element.appendChild(noteElement));

  const findNoteComponentById = (targetId) => noteComponents.find(({ id }) => id === targetId );

  const setNoteContent = ({ id, content }) => {
    const noteComponent = findNoteComponentById(id);
    noteComponent.setContent(content);
  };

  const addNote = ({ id, content }) => {
    const noteComponent = createNoteComponent({ id, initialContent: content });
    noteComponents.push(noteComponent);
    element.appendChild(noteComponent.element);
  };

  element.addEventListener('click', (event) => {
    const noteElement = event.target.closest(`.${className.note}`);
    if (noteElement) handleClickNote(noteElement.dataset.id);
  });

  return { element, setNoteContent, addNote };
};

export { createNoteListComponent };
