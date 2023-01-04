import './index.scss';

import { createNote } from '../../entities/note';
import { createElement, EMPTY_STRING } from '../../utils';
import { createEditorComponent } from '../editor';
import { createNoteListComponent } from '../noteList';

const createMainComponent = ({ initialNotes, maxTextLength }) => {
  const initialSelectedNote = initialNotes[0] ?? null;
  
  const state = {
    notes: initialNotes,
    selectedNoteId: initialSelectedNote?.id,
  };

  const handleClickNewNoteButton = () => {
    const newNote = createNote({ content: '새로운 노트' });

    state.notes.push(newNote);
    addNote(newNote);
  };

  const updateEditorComponent = () => {
    const { notes, selectedNoteId } = state;

    setDisabled(!selectedNoteId);
    if (!selectedNoteId) return;

    setValue(notes.find(({ id }) => id === selectedNoteId).content);
  };

  const handleClickNote = (noteId) => {
    state.selectedNoteId = noteId;
    updateEditorComponent();
  };

  const handleInputEditor = (event) => {
    const { value } = event.target;
    const { notes, selectedNoteId } = state;
    notes.find(({ id }) => id === selectedNoteId).content = value;
    setNoteContent({ id: selectedNoteId, content: value });
  };

  const mainElement = createElement(`<main class="main"><button class="main__new-note-button">new note</button></main>`);
  const newNoteButton = mainElement.querySelector('.main__new-note-button');
  newNoteButton.addEventListener('click', handleClickNewNoteButton);

  const { editorElement, setValue, setDisabled } = createEditorComponent({ handleInputEditor, initialText: initialSelectedNote?.content ?? EMPTY_STRING, initialDisabled: !initialSelectedNote, maxTextLength });
  mainElement.appendChild(editorElement);

  const { noteListElement, setNoteContent, addNote } = createNoteListComponent({ initialNotes, handleClickNote });
  mainElement.appendChild(noteListElement);

  return { mainElement };
};

export { createMainComponent };
