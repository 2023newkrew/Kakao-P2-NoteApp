import className from './index.scss';
import { createElement, EMPTY_STRING, pipe } from '../../utils';

const createNoteHTML = ({ id, content, isSelected }) => `<li class="${className.note} ${isSelected ? className.selected : EMPTY_STRING}" data-id="${id}"><div class="${className.content}">${content}</div></li>`;

const createNoteComponent = ({ id, initialContent, initialIsSelected }) => {
  const element = pipe(createNoteHTML, createElement)({ id, content: initialContent, isSelected: initialIsSelected });
  const noteContentElement = element.querySelector(`.${className.content}`);

  const setContent = (content) => {
    noteContentElement.textContent = content;
  };

  const setIsSelected = (isSelected) => {
    if (isSelected) element.classList.add(className.selected);
    else element.classList.remove(className.selected);
  };

  return { id, element, setContent, setIsSelected };
};

const createNoteListComponent = ({ initialNotes, initialSelectedNoteId, handleClickNote, handleClickNewNoteButton }) => {
  const element = createElement(`<ul class="${className.notes}"><button class="${className.newNoteButton}">+</button></ul>`);

  const newNoteButton = element.querySelector(`.${className.newNoteButton}`);
  newNoteButton.addEventListener('click', handleClickNewNoteButton);

  const state = {
    selectedNoteId: initialSelectedNoteId,
  };

  const noteComponents = initialNotes.map(({ id, content }) => createNoteComponent({ id, initialContent: content, initialIsSelected: id === initialSelectedNoteId }));
  noteComponents.forEach(({ element: noteElement }) => element.appendChild(noteElement));
  element.appendChild(newNoteButton);

  const findNoteComponentById = (targetId) => noteComponents.find(({ id }) => id === targetId );

  const setNoteContent = ({ id, content }) => {
    const noteComponent = findNoteComponentById(id);
    noteComponent.setContent(content);
  };

  const addNote = ({ id, content }) => {
    const noteComponent = createNoteComponent({ id, initialContent: content });
    noteComponents.push(noteComponent);
    element.appendChild(noteComponent.element);
    element.appendChild(newNoteButton);
  };

  const removeNote = (id) => {
    const noteComponent = findNoteComponentById(id);
    noteComponents.splice(noteComponents.indexOf(noteComponent), 1);
    element.removeChild(noteComponent.element);
    if (state.selectedNoteId === id) state.selectedNoteId = null;
  };

  const setSelectedNoteId = (selectedNoteId) => {
    if (state.selectedNoteId) findNoteComponentById(state.selectedNoteId).setIsSelected(false);
    state.selectedNoteId = selectedNoteId;
    findNoteComponentById(selectedNoteId).setIsSelected(true);
  };

  element.addEventListener('click', (event) => {
    const noteElement = event.target.closest(`.${className.note}`);
    if (noteElement) handleClickNote(noteElement.dataset.id);
  });

  return { element, setNoteContent, addNote, removeNote, setSelectedNoteId };
};

export { createNoteListComponent };
