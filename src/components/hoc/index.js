import { createNote } from "../../entities/note";
import { createMainComponent } from "../main";

const withDefaultProps = (createComponent, defaultProps) => (props) => createComponent({ ...defaultProps, ...props });

const DEFAULT_MAX_TEXT_LENGTH = 20;

const DEFAULT_INITIAL_NOTES = [
  createNote({ content: '안녕하세요~' }),
  createNote({ content: '하이루' }),
];

const createMainComponentWithDefaultProps = withDefaultProps(createMainComponent, { initialNotes: DEFAULT_INITIAL_NOTES, maxTextLength: DEFAULT_MAX_TEXT_LENGTH });

export { createMainComponentWithDefaultProps };
