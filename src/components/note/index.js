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

export { createNoteComponent };
