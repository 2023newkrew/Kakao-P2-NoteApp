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
    addNoteComponent(createNote({ content: '새로운 노트' }));
  };

  const handleClickNote = (noteId) => {
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

  const { editorElement, setValue, setDisabled } = createEditorComponent({ handleInputEditor, initialText: initialSelectedNote?.content ?? EMPTY_STRING, initialDisabled: !initialSelectedNote, maxTextLength });
  mainElement.appendChild(editorElement);

  const { noteListElement, findNoteComponentById, addNoteComponent } = createNoteListComponent({ initialNotes, handleClickNote });
  mainElement.appendChild(noteListElement);

  return { mainElement };
};

export { createMainComponent };
