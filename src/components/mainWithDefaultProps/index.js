import { createNote } from '../../entities/note';
import { withDefaultProps } from '../../hoc';
import { createMainComponent } from '../main';

const DEFAULT_MAX_TEXT_LENGTH = 200;

const DEFAULT_INITIAL_NOTES = [
  createNote({ content: '안녕하세요~' }),
  createNote({ content: '하이루' }),
];

const createMainComponentWithDefaultProps = withDefaultProps(createMainComponent, { initialNotes: DEFAULT_INITIAL_NOTES, maxTextLength: DEFAULT_MAX_TEXT_LENGTH });

export { createMainComponentWithDefaultProps };
