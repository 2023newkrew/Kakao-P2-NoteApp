import className from './index.scss';
import { createDocumentFragment, EMPTY_STRING } from '../../utils';

const createNoteHTML = ({ id, content, isSelected }) => `<li class="${className.note} ${isSelected ? className.selected : EMPTY_STRING}" data-id="${id}"><div class="${className.content}">${content}</div></li>`;

const createNoteComponent = ({ id, initialContent, initialIsSelected }) => {
  const noteHTML = createNoteHTML({ id, content: initialContent, isSelected: initialIsSelected });
  const documentFragment = createDocumentFragment(noteHTML);
  const noteElement = documentFragment.querySelector(`.${className.note}`);
  const noteContentElement = documentFragment.querySelector(`.${className.content}`);

  const setContent = (content) => {
    noteContentElement.textContent = content;
  };

  const setIsSelected = (isSelected) => {
    if (isSelected) noteElement.classList.add(className.selected);
    else noteElement.classList.remove(className.selected);
  };

  return { id, documentFragment, noteElement, setContent, setIsSelected };
};

const createNoteListComponent = ({ initialNotes, initialSelectedNoteId, handleClickNote, handleClickNewNoteButton }) => {
  const documentFragment = createDocumentFragment(`<ul class="${className.notes}"><button class="${className.newNoteButton}">+</button></ul>`);
  const noteListElment = documentFragment.querySelector(`.${className.notes}`);

  const newNoteButton = documentFragment.querySelector(`.${className.newNoteButton}`);
  newNoteButton.addEventListener('click', handleClickNewNoteButton);

  const state = {
    selectedNoteId: initialSelectedNoteId,
  };

  const noteComponents = initialNotes.map(({ id, content }) => createNoteComponent({ id, initialContent: content, initialIsSelected: id === initialSelectedNoteId }));
  noteComponents.forEach(({ documentFragment }) => noteListElment.appendChild(documentFragment));
  noteListElment.appendChild(newNoteButton);

  const findNoteComponentById = (targetId) => noteComponents.find(({ id }) => id === targetId );

  const setNoteContent = ({ id, content }) => {
    const noteComponent = findNoteComponentById(id);
    noteComponent.setContent(content);
  };

  const addNote = ({ id, content }) => {
    const noteComponent = createNoteComponent({ id, initialContent: content });
    noteComponents.push(noteComponent);
    noteListElment.appendChild(noteComponent.documentFragment);
    noteListElment.appendChild(newNoteButton);
  };

  const removeNote = (id) => {
    const noteComponent = findNoteComponentById(id);
    noteComponents.splice(noteComponents.indexOf(noteComponent), 1);
    noteListElment.removeChild(noteComponent.noteElement);
    if (state.selectedNoteId === id) state.selectedNoteId = null;
  };

  const setSelectedNoteId = (selectedNoteId) => {
    if (state.selectedNoteId) findNoteComponentById(state.selectedNoteId).setIsSelected(false);
    state.selectedNoteId = selectedNoteId;
    findNoteComponentById(selectedNoteId).setIsSelected(true);
  };

  noteListElment.addEventListener('click', (event) => {
    const noteElement = event.target.closest(`.${className.note}`);
    if (noteElement) handleClickNote(noteElement.dataset.id);
  });

  return { documentFragment, setNoteContent, addNote, removeNote, setSelectedNoteId };
};

export { createNoteListComponent };
