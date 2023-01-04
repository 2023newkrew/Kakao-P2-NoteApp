import './index.scss';

import { createNote } from '../../entities/note';
import { createElement, EMPTY_STRING } from '../../utils';
import { createEditorComponent } from '../editor';
import { createNoteListComponent } from '../noteList';

const DEFAULT_MAX_TEXT_LENGTH = 20;

const createMainComponent = () => {
  const initialNotes = [
    createNote({ content: '안녕하세요~' }),
    createNote({ content: '하이루' }),
  ];

  const maxTextLength = DEFAULT_MAX_TEXT_LENGTH;

  const selectedNote = initialNotes[0];

  const state = {
    notes: initialNotes,
    selectedNoteId: selectedNote?.id,
    value: selectedNote?.content ?? EMPTY_STRING,
  };

  const handleClickNewNoteButton = () => {
    addNoteComponent(createNote({ content: '새로운 노트' }));
  };

  const handleClickNote = (event) => {
    const noteElement = event.target.closest('.note');
    const noteId = noteElement.dataset.id;
    const noteComponent = findNoteComponentById(noteId);
    
    state.selectedNoteId = noteId;
    setDisabled(false);
    setValue(noteComponent.getNoteContent());
  };

  const handleInputEditor = (event) => {
    const { value } = event.target;
    const noteId = state.selectedNoteId;
    const noteComponent = findNoteComponentById(noteId);

    noteComponent.setNoteContent(value);
  };

  const mainElement = createElement(`<main class="main"><button class="main__new-note-button">new note</button></main>`);
  const newNoteButton = mainElement.querySelector('.main__new-note-button');
  newNoteButton.addEventListener('click', handleClickNewNoteButton);

  const { editorElement, setValue, setDisabled } = createEditorComponent({ handleInputEditor, initialText: state.value, initialDisabled: !state.selectedNoteId, maxTextLength });
  mainElement.appendChild(editorElement);

  const { noteListElement, findNoteComponentById, addNoteComponent } = createNoteListComponent({ initialNotes, handleClickNote });
  mainElement.appendChild(noteListElement);

  return { mainElement };
};

export { createMainComponent };
