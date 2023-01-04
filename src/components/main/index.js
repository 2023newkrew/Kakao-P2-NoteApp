import './index.scss';

import { createNote } from '../../entities/note';
import { createElement, EMPTY_STRING } from '../../utils';
import { createEditorComponent } from '../editor';
import { createNoteListComponent } from '../noteList';

const createMainComponent = ({ initialNotes, maxTextLength }) => {
  const state = {
    notes: initialNotes,
    selectedNoteId: null,
  };

  const handleClickNewNoteButton = () => {
    const newNote = createNote({ content: '새로운 노트' });

    state.notes.push(newNote);
    noteListComponent.addNote(newNote);
    setSelectedNoteId(newNote.id);
  };

  const updateEditorComponent = () => {
    const { notes, selectedNoteId } = state;

    editorComponent.setDisabled(!selectedNoteId);
    if (!selectedNoteId) return;

    editorComponent.setValue(notes.find(({ id }) => id === selectedNoteId).content);
  };

  const setSelectedNoteId = (noteId) => {
    state.selectedNoteId = noteId;
    updateEditorComponent();
    editorComponent.focus();
  };

  const handleInputEditor = (event) => {
    const { value } = event.target;
    const { notes, selectedNoteId } = state;
    notes.find(({ id }) => id === selectedNoteId).content = value;
    noteListComponent.setNoteContent({ id: selectedNoteId, content: value });
  };

  const element = createElement(`<main class="main"><button class="main__new-note-button">new note</button></main>`);
  const newNoteButton = element.querySelector('.main__new-note-button');
  newNoteButton.addEventListener('click', handleClickNewNoteButton);

  const editorComponent = createEditorComponent({ handleInputEditor, initialText: EMPTY_STRING, initialDisabled: true, maxTextLength });
  element.appendChild(editorComponent.element);

  const noteListComponent = createNoteListComponent({ initialNotes, handleClickNote: setSelectedNoteId });
  element.appendChild(noteListComponent.element);

  return { element };
};

export { createMainComponent };
