import className from './index.scss';

import { createNote } from '../../entities/note';
import { createDocumentFragment, EMPTY_STRING } from '../../utils';
import { createEditorComponent } from '../editor';
import { createNoteListComponent } from '../noteList';

const DELETE_KEY_CODE = 8;

const createMainComponent = ({ initialNotes, maxTextLength }) => {
  const state = {
    notes: initialNotes,
    selectedNoteId: null,
  };

  const handleNewNoteButtonClick = () => {
    const newNote = createNote({ content: '새로운 노트' });

    state.notes.push(newNote);
    noteListComponent.addNote(newNote);
    setSelectedNoteId(newNote.id);
  };

  const updateEditorComponent = () => {
    const { notes, selectedNoteId } = state;

    editorComponent.setDisability(!selectedNoteId);
    if (!selectedNoteId) return;

    editorComponent.setValue(notes.find(({ id }) => id === selectedNoteId).content);
  };

  const setSelectedNoteId = (noteId) => {
    state.selectedNoteId = noteId;
    noteListComponent.setSelectedNoteId(noteId);
    updateEditorComponent();
    editorComponent.focus();
  };

  const removeNote = (noteId) => {
    state.selectedNoteId = null;
    state.notes = state.notes.filter(({ id }) => id !== noteId);
    noteListComponent.removeNote(noteId);
    updateEditorComponent();
  };

  const handleEditorInput = (event) => {
    const { value } = event.target;
    const { notes, selectedNoteId } = state;
    notes.find(({ id }) => id === selectedNoteId).content = value;
    noteListComponent.setNoteContent({ id: selectedNoteId, content: value });
  };

  const documentFragment = createDocumentFragment(`<main class="${className.main}"></main>`);

  const mainElement = documentFragment.querySelector(`.${className.main}`);

  mainElement.addEventListener('keydown', (event) => {
    if (state.selectedNoteId && event.keyCode === DELETE_KEY_CODE && event.metaKey) {
      removeNote(state.selectedNoteId);
    }
  });

  const editorComponent = createEditorComponent({ onInput: handleEditorInput, initialText: EMPTY_STRING, initialDisabled: true, maxTextLength });
  mainElement.appendChild(editorComponent.documentFragment);

  const noteListComponent = createNoteListComponent({ initialNotes, initialSelectedNoteId: state.selectedNoteId, onNoteClick: setSelectedNoteId, onNewNoteButtonClick: handleNewNoteButtonClick });
  mainElement.appendChild(noteListComponent.documentFragment);

  return { documentFragment };
};

export { createMainComponent };
