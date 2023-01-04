import "@/styles/app.scss";
import "@/styles/reset.scss";
import importImages from "@/image.js";

import Component from "@/component/Component";

import Header from "@/component/Header";
import Sidebar from "@/component/sidebar";
import NoteContainer from "@/component/NoteContainer";

class App extends Component {
  template() {
    return `<header class="header"></header>
    <main class="main__container">
      <aside class="sidebar__container"></aside>
      <section class="note__container"></section>
    </main>
    `;
  }
  mounted() {
    const headerEl = this.$target.querySelector(".header");
    const sidebarEl = this.$target.querySelector(".sidebar__container");
    const noteEl = this.$target.querySelector(".note__container");

    new Header(headerEl, { sidebarEl: sidebarEl });
    new Sidebar(sidebarEl);
    new NoteContainer(noteEl);

    importImages();
  }
}

const appEl = document.querySelector(".body");
new App(appEl);
