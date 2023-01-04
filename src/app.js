import "@/styles/app.scss";
import "@/styles/reset.scss";
import "@/image.js";
import "@/sidebar.js";

import NoteContainer from "./component/NoteContainer";

const noteContainerEl = document.querySelector(".note__container");

new NoteContainer(noteContainerEl);
