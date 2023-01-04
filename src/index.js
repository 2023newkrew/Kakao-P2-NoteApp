import "@scripts/staticLoader.js"
import ListController from "@scripts/button/listButton.js";
import MenuController from "@scripts/button/menuButton.js";
import SunEditor from "@scripts/sunEditor";

const listController = new ListController();

const menuController = new MenuController();

const sunEditor = new SunEditor();
sunEditor.createSunEditor();
