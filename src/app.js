import setHeader from "@Header/header.js";
import setMain from "@Main/main.js";
import setSnackbar from "./views/snackbar/snackbar";
import appScss from "./app.scss";

const handleClickWindow = (event) => {
    if (event.target.closest(".post")) return;

    const $snackBar = document.body.querySelector(".snackbar");
    $snackBar.classList.remove("show");
};
const attachEventHandler = () => {
    window.addEventListener("click", handleClickWindow);
};
function app() {
    attachEventHandler();
    setHeader();
    setMain();
    setSnackbar();
}
app();
