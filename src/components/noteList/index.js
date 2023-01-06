import className from './index.scss';
import { createDocumentFragment, EMPTY_STRING } from '../../utils';

const createNoteHTML = ({ id, content, emphasisStatus }) => `<li class="${className.note} ${emphasisStatus ? className.empasis : EMPTY_STRING}" data-id="${id}"><div class="${className.content}">${content}</div></li>`;

const createNoteComponent = ({ id, initialContent, initialEmphasisStatus }) => {
  const noteHTML = createNoteHTML({ id, content: initialContent, emphasisStatus: initialEmphasisStatus });
  const documentFragment = createDocumentFragment(noteHTML);

  const noteElement = documentFragment.querySelector(`.${className.note}`);
  const noteContentElement = documentFragment.querySelector(`.${className.content}`);

  const setContent = (content) => {
    noteContentElement.textContent = content;
  };

  const setEmphasisStatus = (emphasisStatus) => {
    if (emphasisStatus) {
      noteElement.classList.add(className.empasis);
    } else {
      noteElement.classList.remove(className.empasis);
    }
  };

  return { id, documentFragment, noteElement, setContent, setEmphasisStatus };
};

const createNoteListComponent = ({ initialNotes, initialSelectedNoteId, onNoteClick, onNewNoteButtonClick }) => {
  const documentFragment = createDocumentFragment(`<ul class="${className.notes}"><button class="${className.newNoteButton}">+</button></ul>`);
  const noteListElment = documentFragment.querySelector(`.${className.notes}`);

  const newNoteButton = documentFragment.querySelector(`.${className.newNoteButton}`);
  newNoteButton.addEventListener('click', onNewNoteButtonClick);

  const state = {
    selectedNoteId: initialSelectedNoteId,
  };

  const noteComponents = initialNotes.map(({ id, content }) => createNoteComponent({ id, initialContent: content, initialEmphasisStatus: id === initialSelectedNoteId }));
  noteComponents.forEach(({ documentFragment }) => noteListElment.appendChild(documentFragment));
  noteListElment.appendChild(newNoteButton);

  const findNoteComponentById = (targetId) => noteComponents.find(({ id }) => id === targetId );

  const editNote = ({ id, content }) => {
    const noteComponent = findNoteComponentById(id);
    noteComponent.setContent(content);
  };

  const addNote = ({ id, content }) => {
    const noteComponent = createNoteComponent({ id, initialContent: content });
    noteComponents.push(noteComponent);
    noteListElment.appendChild(noteComponent.documentFragment);
    noteListElment.appendChild(newNoteButton);
  };

  const removeNoteById = (id) => {
    const noteComponent = findNoteComponentById(id);
    noteComponents.splice(noteComponents.indexOf(noteComponent), 1);
    noteListElment.removeChild(noteComponent.noteElement);
    if (state.selectedNoteId === id) state.selectedNoteId = null;
  };

  const selectNoteById = (id) => {
    if (state.selectedNoteId) findNoteComponentById(state.selectedNoteId).setEmphasisStatus(false);
    state.selectedNoteId = id;
    findNoteComponentById(id).setEmphasisStatus(true);
  };

  noteListElment.addEventListener('click', (event) => {
    const noteElement = event.target.closest(`.${className.note}`);
    if (noteElement) onNoteClick(noteElement.dataset.id);
  });

  return { documentFragment, editNote, addNote, removeNoteById, selectNoteById };
};

export { createNoteListComponent };
