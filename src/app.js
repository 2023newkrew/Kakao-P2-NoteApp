const $inputTextArea = document.querySelector(".input-area__textarea");
const $inputLetterCount = document.querySelector(".input-area__letter-count");
const $hamburgerButton = document.querySelector(".hamburger");
const $nav = document.querySelector("nav");

const INPUT_TEXT_MAX_LENGTH = 10;

const eventHandlers = {
    onKeyDownTextArea(event) {
        let contentText = event.target.value;
        let isOver = false;

        if (contentText.length > INPUT_TEXT_MAX_LENGTH) {
            contentText = contentText.slice(0, INPUT_TEXT_MAX_LENGTH);
            event.target.value = contentText;
            isOver = true;
        }
        $inputLetterCount.innerHTML = `${contentText.length} / ${INPUT_TEXT_MAX_LENGTH}`;
        if (isOver) {
            $inputLetterCount.innerHTML += `<br>${INPUT_TEXT_MAX_LENGTH}자를 초과하여 작성할 수 없습니다.`;
        }
    },
    onClickHamburgerButton(event) {
        $nav.classList.toggle("hidden");
    },
};
const attachEventHandler = () => {
    $hamburgerButton.addEventListener(
        "click",
        eventHandlers.onClickHamburgerButton
    );
    $inputTextArea.addEventListener("input", eventHandlers.onKeyDownTextArea);
};
function init() {
    $inputLetterCount.innerHTML = `0 / ${INPUT_TEXT_MAX_LENGTH}`;
    attachEventHandler();
}

function main() {
    init();
}
main();
