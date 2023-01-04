const $inputTextArea = document.querySelector(".input-area__textarea");
const $inputLetterCount = document.querySelector(".input-area__letter-count");
const $posts = document.body.querySelector(".posts");
const $post = document.body.querySelector(".post");
const INPUT_TEXT_MAX_LENGTH = 200;

const handleInputTextArea = (event) => {
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
const handleKeyDownTextArea = (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        if (event.target.value === "") return;
        /* 노드 복제 및 설정 */
        const $clone = $post.cloneNode(true);
        const textarea = $clone.querySelector("textarea");
        textarea.innerText = event.target.value;
        $clone.style.display = "";

        /* input-area 초기화 */
        $inputTextArea.value = "";
        $inputLetterCount.innerHTML = `0 / ${INPUT_TEXT_MAX_LENGTH}`;

        $posts.appendChild($clone);
    }
};
const attachEventHandler = () => {
    $inputTextArea.addEventListener("input", handleInputTextArea);
    $inputTextArea.addEventListener("keydown", handleKeyDownTextArea);
};
export default function setInputArea() {
    $inputLetterCount.innerHTML = `0 / ${INPUT_TEXT_MAX_LENGTH}`;
    attachEventHandler();
}
