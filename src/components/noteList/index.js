import className from './index.scss';
import { createElement, pipe } from '../../utils';

const createNoteHTML = ({ id, content }) => `<li class="${className.note}" data-id="${id}"><div class="${className.noteContent}">${content}</div></li>`;

const createNoteElement = (note) => pipe(createNoteHTML, createElement)(note);

const createNoteComponent = ({ note }) => {
  const element = createNoteElement(note);
  const noteContentElement = element.querySelector(`.${className.noteContent}`);

  const getNoteContent = () => noteContentElement.textContent;

  const setNoteContent = (content) => {
    noteContentElement.textContent = content;
  };

  return { id: note.id, element, getNoteContent, setNoteContent };
};

const createNoteListComponent = ({ initialNotes, handleClickNote }) => {
  const element = createElement(`<ul class="notes"></ul>`);

  const noteComponents = initialNotes.map((note) => createNoteComponent({ note }));
  noteComponents.forEach(({ element: noteElement }) => element.appendChild(noteElement));

  const findNoteComponentById = (targetId) => noteComponents.find(({ id }) => id === targetId );

  const setNoteContent = ({ id, content }) => {
    const noteComponent = findNoteComponentById(id);
    noteComponent.setNoteContent(content);
  };

  const addNote = (note) => {
    const noteComponent = createNoteComponent({ note });
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
