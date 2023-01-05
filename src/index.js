import "@scripts/staticLoader.js"
import ListController from "@scripts/button/listButton.js";
import MenuController from "@scripts/button/menuButton.js";
import SunEditor from "@/lib/sunEditor";

const listController = new ListController();
listController.listenClickEvent();

const menuController = new MenuController();
menuController.listenClickEvent();

const sunEditor = new SunEditor();
sunEditor.createSunEditor();
sunEditor.listenKeyPressEvent();