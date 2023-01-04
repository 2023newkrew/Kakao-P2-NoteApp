import './index.scss';

import { createElement } from '../../utils';
import { createNoteComponent } from '../note';

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
    const noteElement = event.target.closest('.note');
    if (noteElement) handleClickNote(event);
  });

  return { noteListElement, findNoteComponentById, updateNoteComponent, addNoteComponent };
};

export { createNoteListComponent };
