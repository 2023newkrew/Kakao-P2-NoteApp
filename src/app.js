import "@/styles/app.scss";
import "@/styles/common/reset.scss";

import { Component } from "@/components/common";
import { Header, Sidebar, NoteContainer, Snackbar } from "@/components";

class App extends Component {
  template() {
    return `<header id="header-container"></header>
    <main id="main__container">
      <aside id="sidebar__container"></aside>
      <section id="note__container"></section>
      <section id="snackbar__container"></section>
    </main>
    `;
  }
  mounted() {
    const headerEl = this.$target.querySelector("#header-container");
    const sidebarEl = this.$target.querySelector("#sidebar__container");
    const noteEl = this.$target.querySelector("#note__container");
    const snackbarEl = this.$target.querySelector("#snackbar__container");

    const snackbar = new Snackbar(snackbarEl);

    new Header(headerEl, { sidebarEl: sidebarEl, noteEl: noteEl });
    new Sidebar(sidebarEl);
    new NoteContainer(noteEl, { snackbar: snackbar });
  }
}

const appEl = document.querySelector("#app");
new App(appEl);
