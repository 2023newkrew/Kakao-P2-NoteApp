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
    addNote(newNote);

    mainElement.dispatchEvent(new CustomEvent('snack-bar-request', {
      detail: {
        content: '노트가 생성됐습니다.',
      },
      bubbles: true,
    }));
  };

  const addNote = (note) => {
    if (state.notes.find(({ id }) => id === note.id)) return;
    state.notes.push(note);
    noteListComponent.addNote(note);
    selectNoteById(note.id);
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
    const targetNote = state.notes.find((({ id }) => id === noteId));
    state.selectedNoteId = null;
    state.notes = state.notes.filter(({ id }) => id !== noteId);
    noteListComponent.removeNoteById(noteId);
    updateEditorComponent();

    mainElement.dispatchEvent(new CustomEvent('snack-bar-request', {
      detail: {
        content: '노트가 삭제됐습니다.',
        buttonValue: '취소하기',
        handleButtonClick: () => {
          addNote(targetNote);
        },
      },
      bubbles: true,
    }));
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
