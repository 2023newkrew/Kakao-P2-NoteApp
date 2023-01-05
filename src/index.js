import "@scripts/staticLoader.js";
import ListController from "@scripts/button/listButton.js";
import MenuController from "@scripts/button/menuButton.js";
import SunEditor from "@/lib/sunEditor";

new ListController();
new MenuController();

const sunEditor = new SunEditor();
sunEditor.createSunEditor();
