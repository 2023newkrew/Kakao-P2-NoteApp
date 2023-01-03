const $inputTextArea = document.querySelector(".input-area__textarea");
const $inputLetterCount = document.querySelector(".input-area__letter-count");
const INPUT_TEXT_MAX_LENGTH = 200;

const onKeyDownTextArea = (event) => {
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
};
const attachEventHandler = () => {
    $inputTextArea.addEventListener("input", onKeyDownTextArea);
};
export default function setInputArea() {
    $inputLetterCount.innerHTML = `0 / ${INPUT_TEXT_MAX_LENGTH}`;
    attachEventHandler();
}
