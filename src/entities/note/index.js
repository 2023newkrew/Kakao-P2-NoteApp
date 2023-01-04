import { nanoid } from 'nanoid';

const createNote = ({ content }) => {
  return {
    id: nanoid(),
    content,
  };
};

export { createNote };
