import className from './index.scss';
import { createElement, pipe } from '../../utils';

const createNoteHTML = ({ id, content }) => `<li class="${className.note}" data-id="${id}"><div class="${className.noteContent}">${content}</div></li>`;

const createNoteElement = (note) => pipe(createNoteHTML, createElement)(note);

const createNoteComponent = ({ note }) => {
  const noteElement = createNoteElement(note);
  const noteContentElement = noteElement.querySelector(`.${className.noteContent}`);

  const getNoteContent = () => noteContentElement.textContent;

  const setNoteContent = (content) => {
    noteContentElement.textContent = content;
  };

  return { id: note.id, noteElement, getNoteContent, setNoteContent };
};

const createNoteListComponent = ({ initialNotes, handleClickNote }) => {
  const noteListElement = createElement(`<ul class="notes"></ul>`);

  const noteComponents = initialNotes.map((note) => createNoteComponent({ note }));
  noteComponents.forEach(({ noteElement }) => noteListElement.appendChild(noteElement));

  const findNoteComponentById = (targetId) => noteComponents.find(({ id }) => id === targetId );

  const updateNoteComponent = ({ id, content }) => {
    const noteComponent = findNoteComponentById(id);
    noteComponent?.setNoteContent(content);
  };

  const addNoteComponent = (note) => {
    const noteComponent = createNoteComponent({ note });
    noteComponents.push(noteComponent);
    noteListElement.appendChild(noteComponent.noteElement);
  };

  noteListElement.addEventListener('click', (event) => {
    const noteElement = event.target.closest(`.${className.note}`);
    if (noteElement) handleClickNote(noteElement.dataset.id);
  });

  return { noteListElement, findNoteComponentById, updateNoteComponent, addNoteComponent };
};

export { createNoteListComponent };
