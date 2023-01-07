import className from './index.scss';

import { createNote } from '../../entities/note';
import { createDocumentFragment } from '../../utils';
import { createEditorComponent } from '../editor';
import { createNoteListComponent } from '../noteList';

const KeyCode = {
  BACKSPACE: 'Backspace',
  KEY_K: 'KeyK',
};

const createMainComponent = ({ initialNotes, maxTextLength }) => {
  const state = {
    notes: initialNotes,
    selectedNoteId: null,
  };

  const addNewNote = () => {
    const newNote = createNote({ content: '새로운 노트' });
    state.notes.push(newNote);
    noteListComponent.addNote(newNote);
    selectNoteById(newNote.id);
  };

  const updateEditorComponent = () => {
    const { notes, selectedNoteId } = state;

    editorComponent.setDisabled(!selectedNoteId);
    if (!selectedNoteId) return;

    editorComponent.setValue(notes.find(({ id }) => id === selectedNoteId).content);
  };

  const selectNoteById = (noteId) => {
    state.selectedNoteId = noteId;
    noteListComponent.selectNoteById(noteId);
    updateEditorComponent();
    editorComponent.focus();
  };

  const removeNoteById = (noteId) => {
    state.selectedNoteId = null;
    state.notes = state.notes.filter(({ id }) => id !== noteId);
    noteListComponent.removeNoteById(noteId);
    updateEditorComponent();
  };

  const handleEditorInput = (event) => {
    const { value } = event.target;
    const { notes, selectedNoteId } = state;
    notes.find(({ id }) => id === selectedNoteId).content = value;
    noteListComponent.editNote({ id: selectedNoteId, content: value });
  };

  const documentFragment = createDocumentFragment(`<main class="${className.main}"><hr class=${className.breakLine}></main>`);

  documentFragment.addEventListener('note-view-set', ({ detail }) => { // 단순한 이벤트 중개...
    const noteViewSetEvent = new CustomEvent('note-view-set', { detail });

    noteListComponent.documentFragment.dispatchEvent(noteViewSetEvent);
  });

  const mainElement = documentFragment.querySelector(`.${className.main}`);

  const handleWindowKeydown = (event) => {
    if (!event.metaKey) return;

    switch (event.code) {
      case KeyCode.BACKSPACE:
        if (state.selectedNoteId) removeNoteById(state.selectedNoteId);
        break;

      case KeyCode.KEY_K:
        addNewNote();
        break;
    }
  };

  window.addEventListener('keydown', handleWindowKeydown);

  const editorComponent = createEditorComponent({ onInput: handleEditorInput, initialText: '', initialDisabled: true, maxTextLength });
  mainElement.prepend(editorComponent.documentFragment);

  const noteListComponent = createNoteListComponent({ initialNotes, initialSelectedNoteId: state.selectedNoteId, onNoteClick: selectNoteById, onNewNoteButtonClick: addNewNote });
  mainElement.appendChild(noteListComponent.documentFragment);

  return { documentFragment };
};

export { createMainComponent };
